// ======================================================
// APULA FIRE PREVENTION - ESP32-CAM VIDEO & WEB BRIDGE
// ======================================================
#include "esp_camera.h"
#include <WiFi.h>
#include <esp_http_server.h>
#include <WebSocketsServer.h>

// --- CAMERA MODEL: AI THINKER ---
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// --- WIFI CONFIGURATION ---
// These will be used to connect to your existing home/office WiFi
char ssid[32] = "YOUR_WIFI_NAME";
char password[32] = "YOUR_WIFI_PASSWORD";

httpd_handle_t stream_httpd = NULL;
WebSocketsServer webSocket = WebSocketsServer(82); 

// --- SERIAL COMMAND HANDLER ---
// This allows the App to send new credentials over Serial if needed
void handleSerialConfig() {
  if (Serial.available()) {
    String cmd = Serial.readStringUntil('\n');
    if (cmd.startsWith("SET_WIFI:")) {
      // Format: SET_WIFI:ssid,pass
      int commaIndex = cmd.indexOf(',');
      if (commaIndex != -1) {
        String newSsid = cmd.substring(9, commaIndex);
        String newPass = cmd.substring(commaIndex + 1);
        Serial.println("Updating WiFi Credentials...");
        WiFi.begin(newSsid.c_str(), newPass.c_str());
      }
    }
  }
}

// --- STREAM HANDLER ---
static esp_err_t stream_handler(httpd_req_t *req) {
  camera_fb_t *fb = NULL;
  esp_err_t res = ESP_OK;
  size_t _jpg_buf_len = 0;
  uint8_t *_jpg_buf = NULL;
  char *part_buf[64];

  res = httpd_resp_set_type(req, "multipart/x-mixed-replace;boundary=123456789000000000000987654321");
  while (true) {
    fb = esp_camera_fb_get();
    if (!fb) { res = ESP_FAIL; } 
    else {
      _jpg_buf_len = fb->len;
      _jpg_buf = fb->buf;
      size_t hlen = snprintf((char *)part_buf, 64, "Content-Type: image/jpeg\r\nContent-Length: %u\r\n\r\n", _jpg_buf_len);
      res = httpd_resp_send_chunk(req, (const char *)part_buf, hlen);
      if (res == ESP_OK) res = httpd_resp_send_chunk(req, (const char *)_jpg_buf, _jpg_buf_len);
      if (res == ESP_OK) res = httpd_resp_send_chunk(req, "\r\n--123456789000000000000987654321\r\n", 33);
      esp_camera_fb_return(fb);
    }
    if (res != ESP_OK) break;
  }
  return res;
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("");
  Serial.println("--- APULA SYSTEM BOOTING ---");
  Serial.println("Initializing Camera...");
  
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_VGA;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
  
  // --- CONNECT TO WORKING WIFI ---
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  int retry = 0;
  while (WiFi.status() != WL_CONNECTED && retry < 20) {
    delay(500);
    Serial.print(".");
    retry++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected!");
    Serial.print("Local IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nFailed to connect. Starting Hotspot as backup...");
    WiFi.softAP("APULA_RECOVERY", "FireSafe2026");
    Serial.print("Recovery IP: ");
    Serial.println(WiFi.softAPIP());
  }
  
  httpd_config_t server_config = HTTPD_DEFAULT_CONFIG();
  server_config.server_port = 81;
  httpd_uri_t stream_uri = { .uri = "/", .method = HTTP_GET, .handler = stream_handler, .user_ctx = NULL };
  if (httpd_start(&stream_httpd, &server_config) == ESP_OK) {
    httpd_register_uri_handler(stream_httpd, &stream_uri);
    Serial.println("Camera Stream Ready at port 81");
  }

  webSocket.begin();
  Serial.println("WebSocket Server Ready at port 82");
  Serial.println("--- SYSTEM READY ---");
}

void loop() {
  webSocket.loop();
  handleSerialConfig();
  
  // Bridge Arduino Serial to Web App via WebSocket
  if (Serial.available()) {
    String data = Serial.readStringUntil('\n');
    if (data.startsWith("SENSORS:")) {
      webSocket.broadcastTXT(data);
    }
  }
}

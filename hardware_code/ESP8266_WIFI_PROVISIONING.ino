// ======================================================
// APULA FIRE PREVENTION - WIFI NODE (ESP8266/ESP32)
// ======================================================
// This code handles interactive WiFi provisioning from the website.

#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>

// PIN CONFIGURATION
const int FLAME_ALPHA = A0; 
const int BUZZER_PIN  = D5;
const int STATUS_LED  = D4; // Internal LED on NodeMCU

// INITIAL SETTINGS
char ssid[32] = "YOUR_WIFI_NAME";
char password[32] = "YOUR_WIFI_PASSWORD";

WebSocketsServer webSocket = WebSocketsServer(81);

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);
  
  // Connect to the working WiFi
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected!");
  Serial.print("Local IP: ");
  Serial.println(WiFi.localIP());

  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();
  
  // Sensor logic
  int s1 = analogRead(FLAME_ALPHA);
  String payload = "SENSORS:" + String(s1) + ",0,0";
  webSocket.broadcastTXT(payload);

  delay(100);
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  if(type == WStype_TEXT) {
    String message = String((char*)(payload));
    
    // Check for WiFi Provisioning command: CONFIG:WIFI:SSID,PASS
    if(message.startsWith("CONFIG:WIFI:")) {
      String data = message.substring(12);
      int commaIndex = data.indexOf(',');
      if(commaIndex != -1) {
        String newSsid = data.substring(0, commaIndex);
        String newPass = data.substring(commaIndex + 1);
        
        Serial.println("PROVISIONING: New WiFi Credentials Received");
        Serial.println("SSID: " + newSsid);
        
        // Connect to the new WiFi
        WiFi.begin(newSsid.c_str(), newPass.c_str());
      }
    }
  }
}

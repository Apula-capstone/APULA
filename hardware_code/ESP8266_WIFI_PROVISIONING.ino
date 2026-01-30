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

// INITIAL SETTINGS (Will be overwritten by website)
char ssid[32] = "APULA_INITIAL_AP";
char password[32] = "FireSafe2026";

WebSocketsServer webSocket = WebSocketsServer(81);

void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);

  // Start in Access Point mode first so user can connect to provision
  WiFi.softAP(ssid, password);
  Serial.println("AP_STARTED: APULA_INITIAL_AP");
  Serial.print("IP_ADDRESS: ");
  Serial.println(WiFi.softAPIP());

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

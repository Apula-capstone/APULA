/*
  APULA - ESP32 COMMUNICATION TEST (NO CAMERA)
  This script verifies if the ESP32 can receive data from Arduino and broadcast to the App.
  It uses the onboard LED for visual feedback.
  
  Wiring:
  ESP32 RX (U0R / Pin 3) <- Arduino TX (Pin 1)
  ESP32 GND              <- Arduino GND
*/

#include <WiFi.h>
#include <WebSocketsServer.h>

char ssid[32] = "YOUR_WIFI_NAME";
char password[32] = "YOUR_WIFI_PASSWORD";

WebSocketsServer webSocket = WebSocketsServer(82);
const int LED_PIN = 33; // Built-in LED on many ESP32-CAM models (inverted logic)

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH); // LED OFF (inverted)
  
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
  Serial.println("WebSocket server started on port 82");
}

void loop() {
  webSocket.loop();

  // Check for data from Arduino
  if (Serial.available()) {
    String data = Serial.readStringUntil('\n');
    data.trim();

    if (data.startsWith("SENSORS:")) {
      // Visual feedback: Blink LED when data arrives
      digitalWrite(LED_PIN, LOW); // LED ON
      
      // Broadcast to all connected web clients
      webSocket.broadcastTXT(data);
      
      Serial.print("Forwarded to App: ");
      Serial.println(data);
      
      delay(50);
      digitalWrite(LED_PIN, HIGH); // LED OFF
    }
  }
}

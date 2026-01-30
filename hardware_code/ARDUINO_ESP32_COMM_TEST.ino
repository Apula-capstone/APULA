/*
  APULA - ARDUINO TO ESP32 COMMUNICATION TEST
  This script verifies if the Arduino can send data to the ESP32-CAM.
  
  Wiring:
  Arduino TX (Pin 1) -> ESP32-CAM RX (U0R / Pin 3)
  Arduino GND        -> ESP32-CAM GND
*/

void setup() {
  // We use 115200 to match the ESP32-CAM default baud rate
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  
  delay(2000);
  Serial.println("--- ARDUINO TEST STARTING ---");
}

void loop() {
  // Simulate a fire detection signal
  // Format: SENSORS:S1,S2,S3 (1023 = Fire, 0 = No Fire)
  
  // Test 1: Fire on Sensor 1
  Serial.println("SENSORS:1023,0,0");
  digitalWrite(LED_BUILTIN, HIGH);
  delay(2000);
  
  // Test 2: No Fire
  Serial.println("SENSORS:0,0,0");
  digitalWrite(LED_BUILTIN, LOW);
  delay(2000);
  
  // Test 3: Fire on all Sensors
  Serial.println("SENSORS:1023,1023,1023");
  digitalWrite(LED_BUILTIN, HIGH);
  delay(2000);
}

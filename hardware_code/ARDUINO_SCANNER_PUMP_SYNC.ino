// ======================================================
// APULA FIRE PREVENTION - ARDUINO SCANNER & PUMP SYNC
// ======================================================
// This code manages the flame sensors, servos, and pumps,
// while sending telemetry to the ESP32-CAM for the dashboard.

#include <Servo.h> 
 
// -------- FLAME SENSORS -------- 
const int flame1 = 2; 
const int flame2 = 3; 
const int flame3 = 4; 
 
// -------- OUTPUTS -------- 
const int buzzerPin = 6; 
const int greenLED  = 8; 
const int redLED    = 9; 
 
// -------- SERVOS -------- 
const int scanServoPin  = 10; // Rotating scanner 
const int pumpServo1Pin = 11; // Water pump servo 1 
const int pumpServo2Pin = 12; // Water pump servo 2 
 
Servo scanServo; 
Servo pumpServo1; 
Servo pumpServo2; 
 
// -------- SCAN SETTINGS -------- 
int scanAngle = 0; 
int scanStep = 1;   // Smaller = slower scan 

unsigned long lastTelemetryTime = 0;
const int telemetryInterval = 100; // Send data to ESP32 every 100ms
 
void setup() { 
  pinMode(flame1, INPUT); 
  pinMode(flame2, INPUT); 
  pinMode(flame3, INPUT); 
 
  pinMode(buzzerPin, OUTPUT); 
  pinMode(greenLED, OUTPUT); 
  pinMode(redLED, OUTPUT); 
 
  scanServo.attach(scanServoPin); 
  pumpServo1.attach(pumpServo1Pin); 
  pumpServo2.attach(pumpServo2Pin); 
 
  // Start positions 
  scanServo.write(0); 
 
  // STOP pump servos 
  pumpServo1.write(90); 
  pumpServo2.write(90); 
 
  // IMPORTANT: 115200 is required to talk to ESP32-CAM
  Serial.begin(115200); 
  Serial.println("ARDUINO_SCANNER_PUMP_READY");
} 
 
void loop() { 
  // Read sensors (Digital: HIGH = No Fire, LOW = Fire)
  int s1 = digitalRead(flame1); 
  int s2 = digitalRead(flame2); 
  int s3 = digitalRead(flame3); 
 
  // LOW = fire 
  bool fireDetected = (s1 == LOW || s2 == LOW || s3 == LOW); 
 
  // ================= NO FIRE ================= 
  if (!fireDetected) { 
    // Rotate scanner 
    scanServo.write(scanAngle); 
 
    // Pumps OFF 
    pumpServo1.write(90); 
    pumpServo2.write(90); 
 
    // Indicators 
    digitalWrite(greenLED, HIGH); 
    digitalWrite(redLED, LOW); 
    digitalWrite(buzzerPin, LOW); 
 
    // Move scanner 
    scanAngle += scanStep; 
    if (scanAngle >= 180 || scanAngle <= 0) { 
      scanStep = -scanStep; 
    } 
 
    delay(15); 
  } 
  // ================= FIRE DETECTED ================= 
  else { 
    // Stop scanner at fire position 
    scanServo.write(scanAngle); 
 
    // Turn ON pumps 
    pumpServo1.write(120);  // adjust if needed 
    pumpServo2.write(120); 
 
    // Alarm 
    digitalWrite(greenLED, LOW); 
    digitalWrite(redLED, HIGH); 
    digitalWrite(buzzerPin, HIGH); 
    delay(100); 
 
    digitalWrite(redLED, LOW); 
    digitalWrite(buzzerPin, LOW); 
    delay(100); 
  }

  // --- TELEMETRY FOR DASHBOARD ---
  // We send the inverted digital values so the app sees 0-100%
  if (millis() - lastTelemetryTime > telemetryInterval) {
    Serial.print("SENSORS:");
    Serial.print(s1 == LOW ? 1023 : 0); // Convert Digital to "Analog" for App
    Serial.print(",");
    Serial.print(s2 == LOW ? 1023 : 0);
    Serial.print(",");
    Serial.println(s3 == LOW ? 1023 : 0);
    lastTelemetryTime = millis();
  }
}

// ==========================================
// APULA FIRE PREVENTION - ARDUINO UNO NODE
// ==========================================

// PIN CONFIGURATION
const int FLAME_ALPHA = A0; // Use Analog Pin A0
const int FLAME_BETA  = A1; // Use Analog Pin A1
const int FLAME_GAMMA = A2; // Use Analog Pin A2
const int BUZZER_PIN  = 5;
const int STATUS_LED  = 13;

// Threshold for digital alarm (lower = fire detected)
const int FIRE_THRESHOLD = 500; 

void setup() {
  Serial.begin(115200);
  
  // Analog pins don't need pinMode for reading
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(STATUS_LED, OUTPUT);
  
  Serial.println("ARDUINO_ANALOG_NODE_READY");
}

void loop() {
  // Read Sensors (Analog) - 0 to 1023
  int s1 = analogRead(FLAME_ALPHA);
  int s2 = analogRead(FLAME_BETA);
  int s3 = analogRead(FLAME_GAMMA);

  // Local Alarm Logic
  if (s1 < FIRE_THRESHOLD || s2 < FIRE_THRESHOLD || s3 < FIRE_THRESHOLD) {
    digitalWrite(BUZZER_PIN, HIGH);
    digitalWrite(STATUS_LED, HIGH);
  } else {
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(STATUS_LED, LOW);
  }

  // Send to Serial for Real-time Graphing
  // Format: SENSORS:s1,s2,s3
  Serial.print("SENSORS:");
  Serial.print(s1);
  Serial.print(",");
  Serial.print(s2);
  Serial.print(",");
  Serial.println(s3);

  delay(100); // Faster updates for smoother graphing
}

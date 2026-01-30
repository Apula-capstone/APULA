
export enum SensorStatus {
  INITIALIZING = 'Initializing',
  READY = 'Ready',
  NOT_READY = 'Not Ready',
  FIRE_DETECTED = 'Fire Detected',
  SAFE = 'Safe Zone'
}

export enum CameraSource {
  SERIAL = 'Serial (ESP32/Arduino)'
}

export enum ConnectionState {
  DISCONNECTED = 'Disconnected',
  CONNECTING = 'Connecting',
  CONNECTED = 'Connected',
  ERROR = 'Error'
}

export interface SensorData {
  id: string;
  name: string;
  value: number;
  status: SensorStatus;
  lastUpdated: string;
}

export interface HistoryPoint {
  time: string;
  alpha: number;
  beta: number;
  gamma: number;
}

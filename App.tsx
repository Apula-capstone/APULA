
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import SensorStatusPanel from './components/SensorStatus';
import Statistics from './components/Statistics';
import ArduinoConnect from './components/ArduinoConnect';
import AlarmSystem from './components/AlarmSystem';
import LoadingScreen from './components/LoadingScreen';
import LiveCamera from './components/LiveCamera';
import DownloadPage from './components/DownloadPage';
import GuidesPage from './components/GuidesPage';
import { SensorData, SensorStatus, HistoryPoint, ConnectionState } from './types';

const INITIAL_SENSORS: SensorData[] = [
  { id: '1', name: 'Alpha Zone', value: 0, status: SensorStatus.NOT_READY, lastUpdated: 'Disconnected' },
  { id: '2', name: 'Beta Zone', value: 0, status: SensorStatus.NOT_READY, lastUpdated: 'Disconnected' },
  { id: '3', name: 'Gamma Zone', value: 0, status: SensorStatus.NOT_READY, lastUpdated: 'Disconnected' },
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isMobileAppMode, setIsMobileAppMode] = useState(false);
  const [isGuidesMode, setIsGuidesMode] = useState(false);
  const [sensors, setSensors] = useState<SensorData[]>(INITIAL_SENSORS);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [fireIncidentCount, setFireIncidentCount] = useState(0);
  const [connection, setConnection] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isTestActive, setIsTestActive] = useState(false);
  
  const sensorSocketRef = useRef<WebSocket | null>(null);
  const fireInCurrentTurn = useRef(false);

  const handleLoadingFinished = () => {
    setIsLoading(false);
    setShowDashboard(true);
  };

  useEffect(() => {
    const fireDetected = sensors.some(s => s.status === SensorStatus.FIRE_DETECTED);
    if (fireDetected && !isAlarmActive && !fireInCurrentTurn.current) {
      setIsAlarmActive(true);
      setFireIncidentCount(prev => prev + 1);
      fireInCurrentTurn.current = true;
    } else if (!fireDetected) {
      fireInCurrentTurn.current = false;
    }
  }, [sensors, isAlarmActive]);

  const processSensorData = useCallback((data: string) => {
    const raw = data.trim().toUpperCase();
    if (isTestActive) return;

    // Default values
    let sensorValues = [0, 0, 0];

    if (raw.includes("SENSORS:")) {
      const payload = raw.split("SENSORS:")[1];
      const values = payload.split(',').map(v => parseInt(v.trim(), 10));
      if (values.length >= 3) {
        // Dashboard expects intensity 0-100. Analog is 0-1023.
        // For flame sensors, LOW (0) is fire. In analog, lower values usually mean fire.
        // We'll normalize: (1023 - val) / 10.23 to get 0-100% intensity
        sensorValues = values.map(v => Math.max(0, Math.min(100, Math.round((1023 - v) / 10.23))));
      }
    }

    if (raw.includes("SENSORS:")) {
      setSensors(prev => prev.map((s, i) => {
        const intensity = sensorValues[i];
        const isFlame = intensity > 50; // Trigger threshold
        const newStatus = isFlame ? SensorStatus.FIRE_DETECTED : SensorStatus.SAFE;
        
        return {
          ...s,
          value: intensity,
          status: newStatus,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
      }));
    }
  }, [isTestActive]);

  const connectWirelessSensors = (ssid: string, pass: string) => {
    if (sensorSocketRef.current) sensorSocketRef.current.close();
    
    setConnection(ConnectionState.CONNECTING);
    try {
      // If the user provided an IP address (like 192.168.x.x), use it.
      // Otherwise, assume the default ESP32 AP IP (192.168.4.1)
      const isIp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ssid);
      const targetIp = isIp ? ssid : "192.168.4.1"; 
      
      const socket = new WebSocket(`ws://${targetIp}:82`);
      
      socket.onopen = () => {
        setConnection(ConnectionState.CONNECTED);
        setSensors(prev => prev.map(s => ({ ...s, status: SensorStatus.READY })));
        console.log(`Connected to ${ssid}`);
      };

      socket.onmessage = (event) => {
        processSensorData(event.data);
      };

      socket.onclose = () => {
        setConnection(ConnectionState.DISCONNECTED);
        setSensors(INITIAL_SENSORS);
      };

      socket.onerror = () => {
        setConnection(ConnectionState.ERROR);
      };

      sensorSocketRef.current = socket;
    } catch (err) {
      setConnection(ConnectionState.ERROR);
    }
  };

  const disconnectWirelessSensors = () => {
    if (sensorSocketRef.current) sensorSocketRef.current.close();
    setConnection(ConnectionState.DISCONNECTED);
    setSensors(INITIAL_SENSORS);
  };
  
  const triggerTestAlarm = () => {
    setIsTestActive(true);
    setSensors(prev => prev.map((s, i) => i === 0 ? { 
      ...s, 
      value: 100, 
      status: SensorStatus.FIRE_DETECTED,
      lastUpdated: 'TEST_MODE'
    } : s));
  };

  const acknowledgeAlarm = () => {
    setIsAlarmActive(false);
    if (isTestActive) {
      setIsTestActive(false);
      setSensors(prev => prev.map(s => ({ 
        ...s, 
        status: connection === ConnectionState.CONNECTED ? SensorStatus.READY : SensorStatus.NOT_READY 
      })));
    }
  };

  useEffect(() => {
    const point: HistoryPoint = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      alpha: sensors[0].value,
      beta: sensors[1].value,
      gamma: sensors[2].value
    };
    setHistory(prev => [...prev.slice(-19), point]);
  }, [sensors]);

  if (isLoading) return <LoadingScreen onFinished={handleLoadingFinished} />;

  if (isMobileAppMode) {
    return <DownloadPage onBack={() => setIsMobileAppMode(false)} />;
  }

  if (isGuidesMode) {
    return <GuidesPage onBack={() => setIsGuidesMode(false)} />;
  }

  return (
    <div className={`transition-all duration-700 ease-out ${showDashboard ? 'opacity-100 scale-100' : 'opacity-100 scale-100'}`}>
      <AlarmSystem isActive={isAlarmActive} onAcknowledge={acknowledgeAlarm} />
      <div className="max-w-[1700px] mx-auto px-4 pb-12 overflow-x-hidden">
        <Header />
        
        {/* Navigation Controls */}
        <div className="mt-6 flex justify-end gap-3 md:gap-4">
          <button 
            onClick={() => setIsGuidesMode(true)}
            className="bg-stone-900 hover:bg-emerald-600 text-emerald-500 hover:text-white px-5 md:px-8 py-3 md:py-4 rounded-2xl border-2 border-emerald-600/30 hover:border-emerald-500 transition-all font-black uppercase tracking-widest text-[9px] md:text-xs flex items-center gap-3 shadow-lg group"
          >
            <i className="fa-solid fa-book-open group-hover:scale-110 transition-transform"></i>
            System Guides
          </button>
          
          <button 
            onClick={() => setIsMobileAppMode(true)}
            className="bg-stone-900 hover:bg-orange-600 text-orange-500 hover:text-white px-5 md:px-8 py-3 md:py-4 rounded-2xl border-2 border-orange-600/30 hover:border-orange-500 transition-all font-black uppercase tracking-widest text-[9px] md:text-xs flex items-center gap-3 shadow-lg group"
          >
            <i className="fa-brands fa-android group-hover:scale-110 transition-transform"></i>
            Mobile App
          </button>
        </div>
        
        <main className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 md:gap-10">
            <LiveCamera />
            <Statistics data={history} fireCount={fireIncidentCount} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
              <ArduinoConnect 
                state={connection} 
                onConnect={connectWirelessSensors} 
                onDisconnect={disconnectWirelessSensors}
                label="ESP32-CAM Hub"
                defaultSsid="APULA_FIRE_SYSTEM"
                defaultPass="FireSafe2026"
              />
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 md:gap-8 lg:sticky lg:top-8">
            <div className={`rounded-[35px] md:rounded-[45px] p-8 md:p-12 border-b-[10px] md:border-b-[15px] transition-all flex items-center justify-between shadow-2xl relative overflow-hidden ${
              sensors.some(s => s.status === SensorStatus.FIRE_DETECTED) 
              ? 'bg-red-700 border-red-900 animate-pulse' 
              : connection === ConnectionState.CONNECTED ? 'bg-emerald-600 border-emerald-800' : 'bg-stone-800 border-stone-900'
            }`}>
               <div className="text-white relative z-10">
                  <h3 className="text-[11px] md:text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-70">Detection Grid</h3>
                  <p className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                    {sensors.some(s => s.status === SensorStatus.FIRE_DETECTED) ? 'PANIC ACTIVE' : connection === ConnectionState.CONNECTED ? 'ARMED' : 'STANDBY'}
                  </p>
               </div>
               <i className={`fa-solid ${sensors.some(s => s.status === SensorStatus.FIRE_DETECTED) ? 'fa-fire-alt' : 'fa-shield-halved'} text-4xl md:text-7xl text-white opacity-80 z-10`}></i>
               <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 blur-3xl rounded-full"></div>
            </div>

            <SensorStatusPanel sensors={sensors} />
            
            <div className="bg-stone-900 rounded-[35px] md:rounded-[45px] p-8 md:p-12 border-b-[10px] md:border-b-[15px] border-stone-950 flex flex-col gap-6 md:gap-8 shadow-2xl">
              <h4 className="text-[11px] md:text-xs font-black text-stone-500 uppercase tracking-widest border-l-4 border-orange-600 pl-4">Directive Control Console</h4>
              
              <button 
                className="w-full bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black py-5 md:py-8 rounded-2xl md:rounded-[35px] border-b-8 md:border-b-[12px] border-red-800 transition-all uppercase flex items-center justify-center gap-4 text-sm md:text-2xl shadow-xl"
                onClick={triggerTestAlarm}
              >
                <i className="fa-solid fa-radiation animate-spin-slow text-2xl md:text-4xl"></i>
                Simulate Panic
              </button>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <button 
                  onClick={() => setFireIncidentCount(0)}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-400 font-black py-4 md:py-6 rounded-xl md:rounded-[25px] border-b-4 border-stone-950 transition-all uppercase text-[10px] md:text-xs tracking-widest"
                >
                  Clear Logs
                </button>
                <button 
                  onClick={() => setSensors(INITIAL_SENSORS)}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-400 font-black py-4 md:py-6 rounded-xl md:rounded-[25px] border-b-4 border-stone-950 transition-all uppercase text-[10px] md:text-xs tracking-widest"
                >
                  Hard Reset
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-white/5 text-center text-stone-600">
          <p className="text-[10px] md:text-[13px] font-black uppercase tracking-[0.5em] mb-4 text-stone-500/50">APULA SYSTEM ARCHITECTURE // HARDWARE SYNC V2.6.0</p>
        </footer>
      </div>
      
      <style>{`
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default App;

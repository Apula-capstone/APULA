
import React from 'react';
import { SensorData, SensorStatus } from '../types';

interface Props {
  sensors: SensorData[];
}

const SensorStatusPanel: React.FC<Props> = ({ sensors }) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:gap-4">
      {sensors.map((sensor) => {
        const isFire = sensor.status === SensorStatus.FIRE_DETECTED;
        const isReady = sensor.status === SensorStatus.READY || sensor.status === SensorStatus.INITIALIZING;
        
        return (
          <div 
            key={sensor.id} 
            className={`kahoot-card rounded-[20px] md:rounded-[25px] p-6 md:p-10 border-b-4 md:border-b-8 transition-all relative overflow-hidden ${
              isFire 
                ? 'bg-red-600 border-red-800 animate-pulse' 
                : 'bg-orange-500 border-orange-700'
            }`}
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="flex justify-between items-center mb-4 relative z-10">
              <div className="flex flex-col">
                <h3 className="text-[9px] md:text-xs font-black text-orange-100 uppercase tracking-widest mb-1 opacity-70 italic">Security Node</h3>
                <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase">{sensor.name}</h2>
              </div>
              <div className={`p-3 md:p-5 rounded-2xl shadow-2xl transition-all ${isFire ? 'bg-white scale-110' : 'bg-orange-600'}`}>
                <i className={`fa-solid ${isFire ? 'fa-fire-alt text-red-600' : 'fa-microchip text-white'} text-2xl md:text-4xl`}></i>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              <div className={`w-full py-5 md:py-8 rounded-2xl font-black uppercase text-center text-xl md:text-3xl shadow-inner flex items-center justify-center gap-4 transition-all ${
                isFire ? 'bg-white text-red-600 ring-8 ring-red-400/30' : 'bg-orange-800/40 text-orange-100'
              }`}>
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${isFire ? 'bg-red-600 animate-ping' : isReady ? 'bg-green-400' : 'bg-stone-500'}`}></div>
                {sensor.status}
              </div>
              
              <div className="flex justify-between items-center px-2">
                <span className="text-[10px] md:text-xs font-bold text-orange-100 uppercase opacity-60 flex items-center gap-2">
                  <i className="fa-regular fa-clock"></i>
                  {sensor.lastUpdated}
                </span>
                <span className="text-[10px] md:text-xs font-black text-orange-100 uppercase tracking-widest opacity-30">
                  REF: S_NODE_{sensor.id}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SensorStatusPanel;

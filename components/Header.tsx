
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="bg-orange-600 shadow-2xl p-4 md:p-6 rounded-b-[30px] md:rounded-b-[40px] flex flex-col md:flex-row items-center justify-between border-b-4 md:border-b-8 border-orange-800">
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-0">
        <div className="bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-inner">
          <i className="fa-solid fa-fire-extinguisher text-2xl md:text-4xl text-orange-600"></i>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white leading-none">APULA</h1>
          <p className="text-[8px] md:text-[10px] font-bold text-orange-200 uppercase tracking-widest mt-1 opacity-80">Prevention Unit // ESP32 Sync</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center md:items-end">
        <div className="text-2xl md:text-4xl font-black text-white tabular-nums drop-shadow-md leading-none">
          {formattedTime}
        </div>
        <div className="text-[10px] md:text-sm font-bold text-orange-100 uppercase mt-1 opacity-80 flex gap-2">
          <span className="md:hidden">|</span>
          {formattedDate}
        </div>
      </div>
    </header>
  );
};

export default Header;

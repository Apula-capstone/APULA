
import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-[200] bg-stone-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Futuristic Scanline */}
      <div className="absolute inset-0 pointer-events-none animate-scanline bg-gradient-to-b from-transparent via-orange-500/10 to-transparent h-1/4 w-full opacity-50"></div>

      <div className="relative group">
        {/* Glow behind text */}
        <div className="absolute -inset-4 bg-orange-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
        
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white relative flex flex-col items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-orange-500 animate-pulse">APULA</span>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 bg-orange-500 animate-bounce" 
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </h1>
      </div>

      <div className="mt-12 w-64 md:w-96 flex flex-col items-center gap-4">
        <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-orange-500 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(249,115,22,1)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between w-full text-[10px] font-black uppercase tracking-[0.4em] text-orange-500/50">
          <span>Initializing Hardware</span>
          <span>{progress}%</span>
        </div>
      </div>

      <div className="absolute bottom-8 text-[10px] font-bold text-stone-600 uppercase tracking-widest">
        Automated Prevention Unit for Lethal Ablaze // System v2.0
      </div>

      <style>{`
        @keyframes scanline {
          from { transform: translateY(-100%); }
          to { transform: translateY(400%); }
        }
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;

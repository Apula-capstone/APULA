
import React, { useEffect, useRef } from 'react';

interface Props {
  isActive: boolean;
  onAcknowledge: () => void;
}

const AlarmSystem: React.FC<Props> = ({ isActive, onAcknowledge }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    if (isActive) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const createSiren = (freq: number, modFreq: number, modGainVal: number) => {
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        lfo.type = 'square';
        lfo.frequency.setValueAtTime(modFreq, ctx.currentTime);
        lfoGain.gain.setValueAtTime(modGainVal, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        osc.connect(masterGain);
        lfo.start();
        osc.start();
        return osc;
      };

      oscillatorsRef.current = [
        createSiren(440, 4, 200),
        createSiren(466.16, 5, 250),
        createSiren(311.13, 6, 150)
      ];
    } else {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      oscillatorsRef.current = [];
    }
    return () => {
      oscillatorsRef.current.forEach(osc => { try { osc.stop(); } catch (e) {} });
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-8 bg-red-700/90 backdrop-blur-xl border-[10px] sm:border-[20px] md:border-[32px] border-red-600 animate-emergency-flash overflow-hidden">
      {/* White Alert Box: Using max-h-full and flex-shrink to ensure it fits in landscape mobile */}
      <div className="bg-white p-6 sm:p-10 md:p-14 rounded-[30px] sm:rounded-[50px] shadow-[0_0_100px_rgba(0,0,0,0.8)] border-4 sm:border-8 border-black flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full max-w-lg md:max-w-2xl text-center relative overflow-hidden flex-shrink max-h-full">
        
        {/* Decorative caution stripes - Header */}
        <div className="absolute top-0 left-0 right-0 h-4 md:h-6 bg-yellow-400 flex overflow-hidden shrink-0">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="min-w-[40px] h-full bg-black -skew-x-45 mr-4"></div>
          ))}
        </div>

        {/* Scalable Icon container */}
        <div className="bg-red-600 p-4 sm:p-6 md:p-10 rounded-full shadow-lg ring-4 md:ring-12 ring-red-100 animate-bounce mt-6 sm:mt-8 shrink-0">
          <i className="fa-solid fa-skull-crossbones text-4xl sm:text-6xl md:text-9xl text-white"></i>
        </div>
        
        {/* Text Section: Adjusting sizes for different viewports */}
        <div className="space-y-1 md:space-y-4 overflow-y-auto min-h-0">
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-black text-red-600 tracking-tighter leading-none uppercase italic">
            Lethal Fire
          </h2>
          <p className="text-xs sm:text-lg md:text-3xl font-black text-stone-900 uppercase tracking-tight">
            Immediate Evacuation Required
          </p>
          <div className="bg-red-50 border-2 border-red-200 p-2 md:p-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 animate-pulse mt-4">
            <i className="fa-solid fa-message text-red-600 text-sm md:text-xl"></i>
            <span className="text-[10px] md:text-sm font-black text-red-600 uppercase tracking-widest">SMS Alerts Dispatched to Emergency Contacts</span>
          </div>
        </div>

        {/* Button: Smaller on mobile, massive on desktop */}
        <button
          onClick={onAcknowledge}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-lg sm:text-2xl md:text-5xl font-black py-4 sm:py-6 md:py-10 rounded-xl sm:rounded-2xl md:rounded-[40px] border-b-[6px] md:border-b-[16px] border-red-900 transition-all hover:translate-y-1 active:border-b-0 active:translate-y-3 uppercase shadow-2xl mt-auto mb-6 sm:mb-8 shrink-0"
        >
          Acknowledge
        </button>

        {/* Decorative stripes - Footer */}
        <div className="absolute bottom-0 left-0 right-0 h-4 md:h-6 bg-yellow-400 flex overflow-hidden shrink-0">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="min-w-[40px] h-full bg-black -skew-x-45 mr-4"></div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes extreme-flash {
          0%, 100% { background-color: rgba(153, 27, 27, 0.95); }
          50% { background-color: rgba(239, 68, 68, 0.95); }
        }
        .animate-emergency-flash {
          animation: extreme-flash 0.15s infinite;
        }
      `}</style>
    </div>
  );
};

export default AlarmSystem;

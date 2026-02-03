import React, { useState } from 'react';

interface LiveCameraProps {
  streamUrl?: string;
}

const LiveCamera: React.FC<LiveCameraProps> = ({ streamUrl = "http://192.168.4.1:81/" }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMixedContent = window.location.protocol === 'https:' && streamUrl.startsWith('http:');

  return (
    <div className="bg-stone-900 rounded-[30px] p-6 border border-white/5 overflow-hidden relative group">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-black uppercase tracking-tight text-white flex items-center gap-2">
          <i className="fa-solid fa-camera text-orange-500"></i>
          Live Stream
        </h2>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isError || isMixedContent ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
          <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">
            {isError || isMixedContent ? 'Offline' : 'Live'}
          </span>
        </div>
      </div>

      <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/5 relative flex items-center justify-center">
        {isMixedContent ? (
           <div className="flex flex-col items-center gap-3 text-stone-600 p-6 text-center">
             <i className="fa-solid fa-lock text-4xl text-orange-500"></i>
             <p className="text-[10px] font-black uppercase tracking-widest">
               Security Restriction<br/>
               <span className="text-stone-400">Cannot connect to Local Device (HTTP) from Secure Web (HTTPS)</span>
             </p>
             <p className="text-[9px] text-stone-500 mt-2 max-w-[200px]">
               Please use the Desktop App or run locally to view the stream.
             </p>
           </div>
        ) : isLoading && !isError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-black">
            <i className="fa-solid fa-circle-notch fa-spin text-orange-500 text-2xl"></i>
            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Connecting to Cam...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center gap-3 text-stone-600">
            <i className="fa-solid fa-video-slash text-4xl"></i>
            <p className="text-[10px] font-black uppercase tracking-widest text-center px-4">
              Camera Not Detected<br/>
              <span className="text-stone-800">Check WiFi Connection</span>
            </p>
            <button 
              onClick={() => { setIsError(false); setIsLoading(true); }}
              className="mt-2 text-[9px] font-black bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full transition-all uppercase tracking-widest"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <img 
            src={streamUrl} 
            alt="ESP32-CAM Stream" 
            className="w-full h-full object-cover"
            onLoad={() => setIsLoading(false)}
            onError={() => { setIsError(true); setIsLoading(false); }}
          />
        )}
        
        {/* Overlay Info */}
        {!isError && !isLoading && (
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
              <i className="fa-solid fa-wifi text-[10px] text-orange-500"></i>
              <span className="text-[9px] font-black text-white uppercase tracking-tight">APULA_CAM</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveCamera;

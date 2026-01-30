import React from 'react';

interface Props {
  onBack: () => void;
}

const DownloadPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-stone-950 text-white p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-widest hover:text-orange-400 transition-colors mb-8 group"
        >
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to Dashboard
        </button>

        <header className="mb-12 border-l-8 border-orange-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">System Downloads</h1>
          <p className="text-stone-500 font-bold uppercase tracking-widest text-sm md:text-base">Get APULA for your Laptop or Mobile device</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Windows EXE Section */}
          <section className="bg-stone-900 rounded-[30px] p-8 md:p-10 text-white relative overflow-hidden group shadow-2xl border-b-8 border-stone-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-black text-3xl shadow-xl">
                  <i className="fa-brands fa-windows"></i>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Windows App</h2>
              </div>
              <p className="text-stone-400 mb-8 text-sm font-bold leading-relaxed">
                Download the standalone version for your laptop. <br/>
                Includes full dashboard and offline monitoring.
              </p>
              <a 
                href="./APULA_Windows.zip" 
                download
                className="w-full inline-flex items-center justify-center gap-4 bg-white text-stone-950 font-black px-6 py-4 rounded-2xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl text-sm"
              >
                <i className="fa-solid fa-download"></i>
                Download for Windows
              </a>
              <p className="mt-4 text-[9px] font-black uppercase tracking-widest opacity-40 italic">Standalone EXE inside ZIP</p>
            </div>
          </section>

          {/* Android Section */}
          <section className="bg-orange-600 rounded-[30px] p-8 md:p-10 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white text-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-3xl shadow-xl">
                  <i className="fa-brands fa-android"></i>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Android App</h2>
              </div>
              <p className="text-orange-100 mb-8 text-sm font-bold leading-relaxed">
                Install the official APULA app on your smartphone. <br/>
                Get real-time fire alerts and live video stream.
              </p>
              <div className="flex flex-col gap-3">
                <a 
                  href="./APULA.apk" 
                  download
                  className="w-full inline-flex items-center justify-center gap-4 bg-stone-950 text-white font-black px-6 py-4 rounded-2xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl text-sm"
                >
                  <i className="fa-solid fa-mobile-screen-button"></i>
                  Download APK (Direct)
                </a>
                <a 
                  href="./APULA.zip" 
                  download
                  className="w-full inline-flex items-center justify-center gap-4 bg-white/20 hover:bg-white/30 text-white font-black px-6 py-2 rounded-xl uppercase tracking-widest transition-all text-[10px]"
                >
                  <i className="fa-solid fa-file-zipper"></i>
                  Download Source Assets (ZIP)
                </a>
              </div>
              <p className="mt-4 text-[9px] font-black uppercase tracking-widest opacity-60 italic">v2.6.0 // Android 8.0+</p>
            </div>
          </section>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8">

          {/* Step 2: Simple Install */}
          <section className="bg-stone-900 rounded-[30px] p-8 border-b-8 border-stone-800 relative overflow-hidden group">
            <div className="flex items-start gap-6 relative z-10">
              <div className="bg-stone-800 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 border border-white/5">2</div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">How to Install</h2>
                <ul className="space-y-4 text-stone-400 font-bold">
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-check text-orange-500"></i>
                    <span>Set Package Name: <code className="bg-stone-800 px-2 py-1 rounded text-orange-400">com.apula.fireprevention</code></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-check text-orange-500"></i>
                    Open the ZIP and copy assets to your project.
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-image text-orange-500"></i>
                    <span>Custom Icon: Right-click <code className="bg-stone-800 px-2 py-1 rounded text-orange-400">res</code> → <code className="bg-stone-800 px-2 py-1 rounded text-orange-400">New</code> → <code className="bg-stone-800 px-2 py-1 rounded text-orange-400">Image Asset</code></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-check text-orange-500"></i>
                    If prompted, allow **"Install from Unknown Sources"** in settings.
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-solid fa-check text-orange-500"></i>
                    Follow the on-screen prompts to complete the installation.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step 3: Run the System */}
          <section className="bg-stone-900 rounded-[30px] p-8 border-b-8 border-stone-800 relative overflow-hidden group">
            <div className="flex items-start gap-6 relative z-10">
              <div className="bg-stone-800 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-2xl shrink-0 border border-white/5">3</div>
              <div className="w-full">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">Start Monitoring</h2>
                <p className="text-stone-400 mb-6 font-bold">Open the **APULA** app from your app drawer.</p>
                
                <div className="bg-stone-950 rounded-2xl p-6 border border-white/5 flex items-center gap-4 shadow-inner mb-6">
                  <div className="bg-emerald-500/10 p-4 rounded-xl">
                    <i className="fa-solid fa-mobile-screen-button text-emerald-500 text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-emerald-500 font-black uppercase text-xs tracking-widest">Mobile Dashboard Active</p>
                    <p className="text-stone-500 text-[10px] font-bold">The app will sync with your Arduino Node automatically.</p>
                  </div>
                </div>

                {/* SMS & SIM800L Setup */}
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 mb-4">
                  <p className="text-orange-500 text-xs font-black uppercase mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-signal"></i>
                    SIM800L Hardware SMS
                  </p>
                  <p className="text-stone-500 text-xs font-bold leading-relaxed mb-4">
                    The mobile app works with the **SIM800L module** to send SMS alerts directly to your phone.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-stone-600">
                      <i className="fa-solid fa-check text-emerald-500"></i>
                      <span>Connect SIM800L to Arduino Pins 2 & 3</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-stone-600">
                      <i className="fa-solid fa-check text-emerald-500"></i>
                      <span>Use external 4V Power for SIM800L</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-stone-600">
                      <i className="fa-solid fa-check text-emerald-500"></i>
                      <span>App automatically registers your phone number</span>
                    </div>
                  </div>
                </div>

                {/* Permissions Reminder */}
                <div className="bg-stone-100 rounded-2xl p-4">
                  <p className="text-stone-500 text-[10px] font-black uppercase mb-1">
                    <i className="fa-solid fa-circle-info mr-2"></i>
                    SMS Permissions
                  </p>
                  <p className="text-stone-400 text-[10px] font-bold leading-tight">
                    Ensure the app has **SMS Permissions** enabled in your phone's settings to receive emergency alerts.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-16 pb-12 text-center text-stone-600 font-bold uppercase tracking-[0.4em] text-[10px]">
          APULA // Offline Distribution // v2.6.0
        </footer>
      </div>
    </div>
  );
};

export default DownloadPage;

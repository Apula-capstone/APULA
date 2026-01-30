import React from 'react';

interface Props {
  onBack: () => void;
}

const GuidesPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-stone-950 text-white p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-500 font-black uppercase tracking-widest hover:text-emerald-400 transition-colors mb-8 group"
        >
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          Back to Dashboard
        </button>

        <header className="mb-12 border-l-8 border-emerald-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">System Guides</h1>
          <p className="text-stone-500 font-bold uppercase tracking-widest text-sm md:text-base">Hardware & Software Integration</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {/* Troubleshooting Section */}
          <section className="bg-red-950/20 rounded-[30px] p-8 border border-red-500/30">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-white flex items-center gap-3">
              <i className="fa-solid fa-bug text-red-500"></i>
              Fix: "No serial data received"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-red-500 font-black text-[10px] uppercase tracking-widest">Check these 4 things immediately:</p>
                <div className="bg-black/40 p-4 rounded-xl border border-red-500/10">
                  <p className="text-stone-300 text-[11px] font-bold leading-relaxed">
                    1. <span className="text-white">Uno RESET to GND:</span> Is there a wire connecting RESET and GND on the Arduino Uno? (Mandatory for bridge mode).<br/><br/>
                    2. <span className="text-white">GPIO 0 to GND:</span> Is the ESP32 GPIO 0 pin connected to GND? (Mandatory for flash mode).<br/><br/>
                    3. <span className="text-white">No Crossing:</span> In Bridge Mode, connect <span className="text-white">Uno RX to ESP32 RX</span> and <span className="text-white">Uno TX to ESP32 TX</span>.<br/><br/>
                    4. <span className="text-white">The "RST" Trick:</span> When you see <span className="italic text-orange-500">"Connecting..."</span> in Arduino IDE, press and release the <span className="text-white">RST button</span> on the back of the ESP32-CAM.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-red-500 font-black text-[10px] uppercase tracking-widest">Arduino IDE Settings:</p>
                <div className="bg-black/40 p-4 rounded-xl border border-red-500/10">
                  <p className="text-stone-300 text-[11px] font-bold leading-relaxed">
                    • <span className="text-white">Board:</span> "AI Thinker ESP32-CAM"<br/>
                    • <span className="text-white">Baud Rate:</span> 115200<br/>
                    • <span className="text-white">Flash Mode:</span> DIO<br/>
                    • <span className="text-white">Partition Scheme:</span> Huge APP (3MB No OTA)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Arduino Uno Node Guide */}
          <section className="bg-orange-600 rounded-[40px] p-8 md:p-12 text-white shadow-2xl shadow-orange-600/20">
            <header className="mb-10">
              <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
                <i className="fa-solid fa-microchip text-3xl"></i>
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Arduino UNO Node</h2>
              <p className="text-orange-100 font-bold uppercase tracking-widest text-sm">Analog Sensors + Local Dashboard Monitoring</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-[30px] p-6 border border-white/10">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-3">
                  <i className="fa-solid fa-download"></i>
                  1. Setup
                </h3>
                <ul className="space-y-3 text-orange-100 font-bold text-sm">
                  <li className="bg-orange-700/50 rounded-xl p-3 flex items-center gap-3 border border-white/5">
                    Flash your Arduino with the **Analog Sensor Firmware**.
                  </li>
                  <li className="bg-orange-700/50 rounded-xl p-3 flex items-center gap-3 border border-white/5">
                    Connect 3 Analog Sensors to Pins **A0, A1, A2**.
                  </li>
                  <li className="bg-orange-700/50 rounded-xl p-3 flex items-center gap-3 border border-white/5">
                    Connect the USB/Serial cable to your computer.
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-[30px] p-6 border border-white/10">
                <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-3">
                  <i className="fa-solid fa-signal"></i>
                  2. Connectivity
                </h3>
                <ul className="space-y-3 text-orange-100 font-bold text-sm">
                  <li className="bg-orange-700/50 rounded-xl p-3 flex items-center gap-3 border border-white/5">
                    Open the **Arduino Hub** panel on the dashboard.
                  </li>
                  <li className="bg-orange-700/50 rounded-xl p-3 flex items-center gap-3 border border-white/5">
                    Select your Serial Port and Baud Rate (9600).
                  </li>
                  <li className="bg-orange-700/50 rounded-xl p-3 flex items-center gap-3 border border-white/5">
                    The Dashboard will start graphing real-time data.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Wiring Guide */}
          <section className="bg-stone-900 rounded-[30px] p-8 border border-white/5 relative overflow-hidden group">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6 text-white flex items-center gap-3">
              <i className="fa-solid fa-plug text-orange-500"></i>
              Hardware Wiring & Logic
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <p className="text-orange-500 font-black mb-2 uppercase text-xs tracking-widest">Flame Sensors</p>
                <p className="text-stone-400 text-xs font-bold leading-relaxed">
                  <span className="text-white">Pins:</span> A0, A1, A2 (Analog)<br/>
                  <span className="text-white">Voltage:</span> 5V VCC / GND
                </p>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <p className="text-orange-500 font-black mb-2 uppercase text-xs tracking-widest">Alerts (Buzzer)</p>
                <p className="text-stone-400 text-xs font-bold leading-relaxed">
                  <span className="text-white">Arduino UNO:</span> Digital Pin 5<br/>
                  <span className="text-white">Status LED:</span> Pin 13
                </p>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <p className="text-orange-500 font-black mb-2 uppercase text-xs tracking-widest">Dashboard Sync</p>
                <p className="text-stone-400 text-xs font-bold leading-relaxed">
                  Analog values are normalized to <span className="text-white">0-100%</span> for the real-time graph.
                </p>
              </div>
            </div>
          </section>

          {/* Wireless Configuration */}
          <section className="bg-stone-900 rounded-[30px] p-8 border border-white/5">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-white flex items-center gap-3">
              <i className="fa-solid fa-wifi text-orange-500"></i>
              Interactive WiFi Setup
            </h2>
            <p className="text-stone-400 text-sm font-bold mb-6">
              You can now configure your Arduino's WiFi connection directly from the dashboard:
            </p>
            <div className="space-y-4">
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-black shrink-0">1</div>
                  <div>
                    <p className="text-white font-black text-sm uppercase">Connect to Hub</p>
                    <p className="text-stone-500 text-[11px] font-bold">First, link your phone to the Arduino's current IP address via the "Arduino Hub" panel.</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-black shrink-0">2</div>
                  <div>
                    <p className="text-white font-black text-sm uppercase">Enter Credentials</p>
                    <p className="text-stone-500 text-[11px] font-bold">Type your home/office WiFi name and password into the "Provision WiFi" fields.</p>
                  </div>
                </div>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-black shrink-0">3</div>
                  <div>
                    <p className="text-white font-black text-sm uppercase">Sync Hardware</p>
                    <p className="text-stone-500 text-[11px] font-bold">Click "Update Arduino WiFi". The system will send the new credentials and restart the Arduino's wireless chip.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ESP32-CAM Configuration */}
          <section className="bg-stone-900 rounded-[30px] p-8 border border-white/5">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-white flex items-center gap-3">
              <i className="fa-solid fa-camera text-orange-500"></i>
              ESP32-CAM Video Link
            </h2>
            <p className="text-stone-400 text-sm font-bold mb-6">
              The ESP32-CAM acts as a wireless video bridge and system hotspot.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <p className="text-orange-500 font-black text-[10px] tracking-widest uppercase mb-4">Wiring Diagram</p>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-stone-400">Arduino 5V</span>
                    <i className="fa-solid fa-arrow-right text-stone-700"></i>
                    <span className="text-white">ESP32-CAM 5V</span>
                  </li>
                  <li className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-stone-400">Arduino GND</span>
                    <i className="fa-solid fa-arrow-right text-stone-700"></i>
                    <span className="text-white">ESP32-CAM GND</span>
                  </li>
                  <li className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-stone-400">Arduino TX (1)</span>
                    <i className="fa-solid fa-arrow-right text-stone-700"></i>
                    <span className="text-white">ESP32-CAM RX</span>
                  </li>
                </ul>
              </div>
              <div className="bg-red-950/40 p-6 rounded-2xl border border-red-500/20 mb-4">
                <p className="text-red-500 font-black text-[10px] tracking-widest uppercase mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  Thermal Safety Warning
                </p>
                <p className="text-stone-400 text-[11px] font-bold leading-relaxed">
                  Unplug if board is hot! Never put 5V into the 3.3V pin. Ensure camera ribbon is locked straight.
                </p>
              </div>
              
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                 <p className="text-orange-500 font-black text-[10px] tracking-widest uppercase mb-4">Arduino Bridge Mode (Upload Only)</p>
                 
                 <div className="space-y-6">
                   {/* Power Section */}
                   <div>
                     <p className="text-white font-black text-[10px] uppercase mb-3 border-b border-white/10 pb-1">Power Section</p>
                     <div className="space-y-2">
                       <p className="text-stone-500 text-[11px] font-bold leading-relaxed flex items-center gap-3">
                         <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0"></span>
                         <span>Uno <span className="text-white">RESET</span> to Uno <span className="text-white">GND (Any)</span> (Blue)</span>
                       </p>
                       <p className="text-stone-500 text-[11px] font-bold leading-relaxed flex items-center gap-3">
                         <span className="w-3 h-3 rounded-full bg-red-500 shrink-0"></span>
                         <span>Uno <span className="text-white">5V</span> to ESP32 <span className="text-white">5V</span> (Red)</span>
                       </p>
                       <p className="text-stone-500 text-[11px] font-bold leading-relaxed flex items-center gap-3">
                         <span className="w-3 h-3 rounded-full bg-black shrink-0 border border-white/20"></span>
                         <span>Uno <span className="text-white">GND (Any)</span> to ESP32 <span className="text-white">GND</span> (Black)</span>
                       </p>
                     </div>
                   </div>

                   {/* Digital Pins Section */}
                   <div>
                     <p className="text-white font-black text-[10px] uppercase mb-3 border-b border-white/10 pb-1">Digital Pins Section</p>
                     <div className="space-y-2">
                       <p className="text-stone-500 text-[11px] font-bold leading-relaxed flex items-center gap-3">
                         <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
                         <span>Uno <span className="text-white">RX (0)</span> to ESP32 <span className="text-white">RX (3)</span> (Green)</span>
                       </p>
                       <p className="text-stone-500 text-[11px] font-bold leading-relaxed flex items-center gap-3">
                         <span className="w-3 h-3 rounded-full bg-yellow-500 shrink-0"></span>
                         <span>Uno <span className="text-white">TX (1)</span> to ESP32 <span className="text-white">TX (1)</span> (Yellow)</span>
                       </p>
                     </div>
                   </div>

                   {/* Analog In Section */}
                   <div>
                     <p className="text-white font-black text-[10px] uppercase mb-3 border-b border-white/10 pb-1">Analog In Section</p>
                     <p className="text-stone-500 text-[11px] font-bold leading-relaxed">
                       * Keep <span className="text-white">A0, A1, A2</span> empty during ESP32 flash.
                     </p>
                   </div>

                   {/* ESP32 Specific */}
                    <div className="bg-white/5 p-4 rounded-xl space-y-3">
                      <p className="text-white font-black text-[10px] uppercase mb-1 border-b border-white/10 pb-1">ESP32-CAM Pin Locations</p>
                      <p className="text-stone-500 text-[11px] font-bold leading-relaxed flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-red-500 shrink-0"></span>
                        <span><span className="text-white">5V Pin:</span> Top Left Corner</span>
                      </p>
                      <p className="text-stone-500 text-[11px] font-bold leading-relaxed flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-black shrink-0 border border-white/20"></span>
                        <span><span className="text-white">GND Pin:</span> 2nd pin on the Left (below 5V)</span>
                      </p>
                      <p className="text-stone-500 text-[11px] font-bold leading-relaxed flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0"></span>
                        <span><span className="text-white">U0R (RX):</span> 3rd pin on the Right side</span>
                      </p>
                      <p className="text-stone-500 text-[11px] font-bold leading-relaxed flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0"></span>
                        <span><span className="text-white">U0T (TX):</span> 4th pin on the Right side</span>
                      </p>
                      <p className="text-stone-500 text-[11px] font-bold leading-relaxed flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-white shrink-0"></span>
                        <span><span className="text-white">GPIO 0:</span> 6th pin on the Right side</span>
                      </p>
                    </div>
                 </div>
               </div>
            </div>
          </section>

          {/* Integration Testing */}
          <section className="bg-emerald-900/20 rounded-[30px] p-8 border border-emerald-500/20">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-white flex items-center gap-3">
              <i className="fa-solid fa-vial text-emerald-500"></i>
              System Integration Test
            </h2>
            <p className="text-stone-400 text-sm font-bold mb-6">
              Follow these steps to verify communication between Arduino, ESP32, and the Dashboard:
            </p>
            <div className="space-y-4">
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <p className="text-emerald-500 font-black text-[10px] tracking-widest uppercase mb-2">1. Transition to Run Mode</p>
                <p className="text-stone-300 text-[11px] font-bold leading-relaxed">
                  • Disconnect <span className="text-white">GPIO 0 from GND</span> (Remove Jumper)<br/>
                  • Disconnect Uno <span className="text-white">RESET from GND</span><br/>
                  • <span className="text-orange-500 italic">Cross the wires:</span> Uno Pin 0 (RX) to ESP32 TX, Uno Pin 1 (TX) to ESP32 RX.
                </p>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <p className="text-emerald-500 font-black text-[10px] tracking-widest uppercase mb-2">2. Power & Reset</p>
                <p className="text-stone-300 text-[11px] font-bold leading-relaxed">
                  Press the <span className="text-white">RST button</span> on the back of the ESP32-CAM. The small built-in LED should flash briefly.
                </p>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <p className="text-emerald-500 font-black text-[10px] tracking-widest uppercase mb-2">3. Dashboard Check</p>
                <p className="text-stone-300 text-[11px] font-bold leading-relaxed">
                  Connect to <span className="text-white">APULA_FIRE_SYSTEM</span> WiFi, click "Connect" in the dashboard. You should see the sensor values jump between 0% and 100% automatically.
                </p>
              </div>
            </div>
          </section>

          {/* SMS Notification System */}
          <section className="bg-stone-900 rounded-[30px] p-8 border border-white/5">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-white flex items-center gap-3">
              <i className="fa-solid fa-message text-orange-500"></i>
              SMS Alert System
            </h2>
            <p className="text-stone-400 text-sm font-bold mb-6">
              The system automatically simulates SMS alerts to your mobile/tablet when a fire incident is confirmed:
            </p>
            <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-2xl flex flex-col md:row gap-6">
              <div className="flex-1">
                <p className="text-orange-500 font-black uppercase text-[10px] tracking-widest mb-2">System Response</p>
                <ul className="text-xs font-bold text-stone-300 space-y-2">
                  <li>Trigger: <span className="text-white">Intensity &gt; 50%</span></li>
                  <li>Dispatch: <span className="text-white">Instant SMS to saved contact</span></li>
                  <li>Dashboard: <span className="text-white">Full-screen fire alarm overlay</span></li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-16 pb-12 text-center text-stone-600 font-bold uppercase tracking-[0.4em] text-[10px]">
          APULA // System Documentation // v2.6.0
        </footer>
      </div>
    </div>
  );
};

export default GuidesPage;

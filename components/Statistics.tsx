
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { HistoryPoint } from '../types';

interface Props {
  data: HistoryPoint[];
  fireCount: number;
}

const Statistics: React.FC<Props> = ({ data, fireCount }) => {
  const latestIntensity = data.length > 0 ? Math.max(data[data.length-1].alpha, data[data.length-1].beta, data[data.length-1].gamma) : 0;

  return (
    <div className="bg-stone-900 rounded-[25px] md:rounded-[30px] p-4 md:p-8 border-4 md:border-8 border-orange-600 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-10 gap-2">
        <div className="flex flex-col">
          <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <i className="fa-solid fa-chart-area text-orange-500 animate-pulse"></i>
            Real-time Sensor Graph
          </h2>
          <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">Live Analog Telemetry (0-100%)</p>
        </div>
        <div className="bg-orange-600 px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase text-white shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          Direct Link
        </div>
      </div>

      <div className="h-[250px] md:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAlpha" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBeta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorGamma" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#666" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              hide={true}
            />
            <YAxis 
              stroke="#666" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              unit="%"
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1c1917', border: 'none', borderRadius: '15px', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
              itemStyle={{ padding: '2px 0' }}
            />
            <Legend 
              verticalAlign="top" 
              align="right"
              height={36} 
              iconType="diamond" 
              wrapperStyle={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }} 
            />
            <Area 
              type="monotone" 
              dataKey="alpha" 
              stroke="#f97316" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorAlpha)" 
              name="Alpha"
              isAnimationActive={false}
            />
            <Area 
              type="monotone" 
              dataKey="beta" 
              stroke="#ef4444" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorBeta)" 
              name="Beta"
              isAnimationActive={false}
            />
            <Area 
              type="monotone" 
              dataKey="gamma" 
              stroke="#fbbf24" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorGamma)" 
              name="Gamma"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-8">
        <div className="bg-red-600 p-4 md:p-6 rounded-2xl md:rounded-3xl border-b-8 border-red-800 text-center relative overflow-hidden group">
          <p className="text-[9px] md:text-[11px] font-black uppercase text-white/70 mb-1 tracking-widest">Fire Events</p>
          <p className="text-2xl md:text-5xl font-black text-white">{fireCount}</p>
          <i className="fa-solid fa-fire absolute -right-2 -bottom-2 text-white/10 text-6xl group-hover:scale-110 transition-transform"></i>
        </div>
        <div className="bg-stone-800 p-4 md:p-6 rounded-2xl md:rounded-3xl border-b-8 border-orange-500 text-center">
          <p className="text-[9px] md:text-[11px] font-black uppercase text-stone-500 mb-1 tracking-widest">Avg Intensity</p>
          <p className="text-xl md:text-4xl font-black text-white">{latestIntensity}%</p>
        </div>
        <div className="bg-stone-800 p-4 md:p-6 rounded-2xl md:rounded-3xl border-b-8 border-emerald-500 text-center col-span-2 lg:col-span-1">
          <p className="text-[9px] md:text-[11px] font-black uppercase text-stone-500 mb-1 tracking-widest">System Load</p>
          <p className="text-xl md:text-4xl font-black text-white">LOW</p>
        </div>
        <div className="bg-stone-800 p-4 md:p-6 rounded-2xl md:rounded-3xl border-b-8 border-blue-500 text-center col-span-2 lg:col-span-1">
          <p className="text-[9px] md:text-[11px] font-black uppercase text-stone-500 mb-1 tracking-widest">SMS Gateway</p>
          <p className="text-xl md:text-4xl font-black text-white">READY</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

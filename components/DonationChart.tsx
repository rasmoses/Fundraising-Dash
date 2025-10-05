
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface DonationChartProps {
  data: ChartDataPoint[];
}

const DonationChart: React.FC<DonationChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="name" stroke="#A0AEC0" tick={{ fontSize: 12 }} />
          <YAxis stroke="#A0AEC0" tick={{ fontSize: 12 }} tickFormatter={(value) => `$${Number(value).toLocaleString()}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568', borderRadius: '0.5rem' }} 
            labelStyle={{ color: '#E2E8F0' }}
            itemStyle={{ color: '#8884d8' }}
          />
          <Area type="monotone" dataKey="donations" stroke="#8884d8" fillOpacity={1} fill="url(#colorDonations)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationChart;


import React, { useState, useEffect, useMemo } from 'react';
import { Donation, ChartDataPoint } from '../types';
import Header from './Header';
import StatCard from './StatCard';
import DonationChart from './DonationChart';
import DonorList from './DonorList';
import GoalTracker from './GoalTracker';
import { DollarIcon, UsersIcon, GiftIcon, TargetIcon } from './IconComponents';

// Mock data generation
const generateMockDonations = (): Donation[] => {
  const donations: Donation[] = [];
  const today = new Date();
  for (let i = 0; i < 50; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    donations.push({
      id: i + 1,
      donorName: `Donor ${i + 1}`,
      donorAvatar: `https://picsum.photos/seed/${i + 1}/40/40`,
      amount: Math.floor(Math.random() * 200) + 10,
      date: date.toISOString(),
    });
  }
  return donations;
};


const Dashboard: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  
  useEffect(() => {
    setDonations(generateMockDonations());
  }, []);

  const { totalRaised, totalDonors, averageDonation, chartData } = useMemo(() => {
    if (donations.length === 0) {
      return { totalRaised: 0, totalDonors: 0, averageDonation: 0, chartData: [] };
    }

    const total = donations.reduce((sum, d) => sum + d.amount, 0);
    const donors = new Set(donations.map(d => d.donorName)).size;
    const avg = total / donations.length;

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const donationsLast30Days = donations.filter(d => new Date(d.date) > last30Days);

    const data: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        const dayStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return { name: dayStr, donations: 0 };
    });

    donationsLast30Days.forEach(donation => {
        const donationDate = new Date(donation.date);
        const dayStr = donationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const dayData = data.find(d => d.name === dayStr);
        if (dayData) {
            dayData.donations += donation.amount;
        }
    });


    return {
      totalRaised: total,
      totalDonors: donors,
      averageDonation: avg,
      chartData: data,
    };
  }, [donations]);

  const campaignGoal = 50000;
  const recentDonations = donations.slice(0, 5);

  return (
    <div className="space-y-6">
      <Header title="Fundraising Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Raised" 
          value={`$${totalRaised.toLocaleString()}`} 
          icon={<DollarIcon />} 
          change="+12% this month"
        />
        <StatCard 
          title="Total Donors" 
          value={totalDonors.toLocaleString()} 
          icon={<UsersIcon />} 
          change="+5 new donors"
        />
        <StatCard 
          title="Average Donation" 
          value={`$${averageDonation.toFixed(2)}`} 
          icon={<GiftIcon />} 
          change="-2.5% this month"
        />
        <StatCard 
          title="Campaign Goal" 
          value={`$${campaignGoal.toLocaleString()}`} 
          icon={<TargetIcon />} 
          change="Ends in 15 days"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">Donations Over Time (Last 30 Days)</h3>
          <DonationChart data={chartData} />
        </div>
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">Campaign Progress</h3>
            <GoalTracker currentAmount={totalRaised} goalAmount={campaignGoal} />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-100">Recent Donations</h3>
            <DonorList donors={recentDonations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

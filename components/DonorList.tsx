
import React from 'react';
import { Donation } from '../types';

interface DonorListProps {
  donors: Donation[];
}

const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}


const DonorList: React.FC<DonorListProps> = ({ donors }) => {
  return (
    <div className="space-y-4">
      {donors.map((donor) => (
        <div key={donor.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={donor.donorAvatar} alt={donor.donorName} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-gray-200">{donor.donorName}</p>
              <p className="text-xs text-gray-400">{timeAgo(donor.date)}</p>
            </div>
          </div>
          <p className="font-bold text-green-400">${donor.amount.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default DonorList;

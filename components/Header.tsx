
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300">
        Add Donation
      </button>
    </header>
  );
};

export default Header;

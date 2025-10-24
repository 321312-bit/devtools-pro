
import React from 'react';

interface HeaderProps {
  title: string;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <div className="flex items-center mb-8">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Tools
      </button>
      <div className="flex-grow text-center">
        <h1 className="text-3xl font-bold text-slate-100">{title}</h1>
      </div>
       <div className="w-32"></div> {/* Spacer to balance the layout */}
    </div>
  );
};

export default Header;

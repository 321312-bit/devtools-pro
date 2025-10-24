
import React from 'react';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-500 cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <div className="flex items-start space-x-4">
        <div>{icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">{title}</h3>
          <p className="text-slate-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;

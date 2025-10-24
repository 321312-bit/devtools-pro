
import React from 'react';
import { Tool } from '../types';
import ToolCard from './ToolCard';
import { JsonIcon, TimestampIcon, Base64Icon, UrlIcon, ColorIcon, RegexIcon, CodeIcon } from './icons';

interface DashboardProps {
  onSelectTool: (tool: Tool) => void;
}

const tools = [
  {
    id: Tool.JSON_FORMATTER,
    icon: <JsonIcon />,
    title: 'JSON Formatter',
    description: 'Beautify, validate, and format your JSON data.',
  },
  {
    id: Tool.TIMESTAMP_CONVERTER,
    icon: <TimestampIcon />,
    title: 'Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates.',
  },
  {
    id: Tool.BASE64_CODER,
    icon: <Base64Icon />,
    title: 'Base64 Encoder/Decoder',
    description: 'Encode and decode strings using Base64.',
  },
  {
    id: Tool.URL_CODER,
    icon: <UrlIcon />,
    title: 'URL Encoder/Decoder',
    description: 'Encode and decode URL-safe strings.',
  },
  {
    id: Tool.COLOR_CONVERTER,
    icon: <ColorIcon />,
    title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, and HSL formats.',
  },
  {
    id: Tool.REGEX_GENERATOR,
    icon: <RegexIcon />,
    title: 'AI Regex Generator',
    description: 'Generate regular expressions from natural language.',
  },
  {
    id: Tool.CODE_CONVERTER,
    icon: <CodeIcon />,
    title: 'AI Code Converter',
    description: 'Translate code between different programming languages.',
  },
];

const Dashboard: React.FC<DashboardProps> = ({ onSelectTool }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-slate-100 mb-4">DevTools Pro</h1>
      <p className="text-lg text-slate-400 mb-12">Your one-stop shop for development utilities.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            onClick={() => onSelectTool(tool.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

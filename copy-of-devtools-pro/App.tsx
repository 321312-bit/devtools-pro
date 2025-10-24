
import React, { useState } from 'react';
import { Tool } from './types';
import Dashboard from './components/Dashboard';
import JsonFormatter from './components/JsonFormatter';
import TimestampConverter from './components/TimestampConverter';
import Base64Coder from './components/Base64Coder';
import UrlCoder from './components/UrlCoder';
import ColorConverter from './components/ColorConverter';
import RegexGenerator from './components/RegexGenerator';
import CodeConverter from './components/CodeConverter';

const App: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const handleSelectTool = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleGoHome = () => {
    setSelectedTool(null);
  };

  const renderTool = () => {
    switch (selectedTool) {
      case Tool.JSON_FORMATTER:
        return <JsonFormatter onBack={handleGoHome} />;
      case Tool.TIMESTAMP_CONVERTER:
        return <TimestampConverter onBack={handleGoHome} />;
      case Tool.BASE64_CODER:
        return <Base64Coder onBack={handleGoHome} />;
      case Tool.URL_CODER:
        return <UrlCoder onBack={handleGoHome} />;
      case Tool.COLOR_CONVERTER:
        return <ColorConverter onBack={handleGoHome} />;
      case Tool.REGEX_GENERATOR:
        return <RegexGenerator onBack={handleGoHome} />;
      case Tool.CODE_CONVERTER:
        return <CodeConverter onBack={handleGoHome} />;
      default:
        return <Dashboard onSelectTool={handleSelectTool} />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-slate-200 font-sans">
      <div className="container mx-auto px-4 py-8">
        {renderTool()}
      </div>
    </main>
  );
};

export default App;

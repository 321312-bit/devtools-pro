
import React, { useState } from 'react';
import Header from './Header';

interface Base64CoderProps {
  onBack: () => void;
}

const Base64Coder: React.FC<Base64CoderProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      setOutput(btoa(input));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Encoding failed');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(atob(input));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid Base64 string');
      setOutput('');
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div>
      <Header title="Base64 Encoder/Decoder" onBack={onBack} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-300">Input</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or decode..."
            className="w-full h-80 p-4 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors font-mono text-sm"
          />
          <div className="flex space-x-4 mt-4">
            <button onClick={handleEncode} className="flex-1 py-2 px-4 bg-cyan-600 hover:bg-cyan-500 rounded-md transition-colors">Encode</button>
            <button onClick={handleDecode} className="flex-1 py-2 px-4 bg-sky-600 hover:bg-sky-500 rounded-md transition-colors">Decode</button>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-slate-300">Output</h2>
              <button
                  onClick={handleCopy}
                  disabled={!output}
                  className="px-3 py-1 text-sm bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 rounded-md transition-colors"
              >
                  Copy
              </button>
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Result will appear here..."
            className="w-full h-80 p-4 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors font-mono text-sm"
          />
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Base64Coder;

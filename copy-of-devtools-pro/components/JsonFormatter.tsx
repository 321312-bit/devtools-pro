
import React, { useState, useEffect } from 'react';
import Header from './Header';

interface JsonFormatterProps {
  onBack: () => void;
}

const JsonFormatter: React.FC<JsonFormatterProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (input.trim() === '') {
      setOutput('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setOutput('');
    }
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div>
      <Header title="JSON Formatter & Validator" onBack={onBack} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-slate-300">Input</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className={`w-full h-96 p-4 rounded-md bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-700'} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors font-mono text-sm`}
          />
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
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
          <pre className="w-full h-96 p-4 rounded-md bg-gray-800 border border-gray-700 overflow-auto">
            <code className="font-mono text-sm whitespace-pre-wrap">{output}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;

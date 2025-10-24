
import React, { useState } from 'react';
import Header from './Header';
import { generateRegex } from '../services/geminiService';

interface RegexGeneratorProps {
  onBack: () => void;
}

const RegexGenerator: React.FC<RegexGeneratorProps> = ({ onBack }) => {
  const [description, setDescription] = useState('');
  const [regex, setRegex] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) return;
    setIsLoading(true);
    setError('');
    setRegex('');
    try {
      const result = await generateRegex(`Generate a regex for: ${description}`);
      setRegex(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    if (!regex) return;
    navigator.clipboard.writeText(regex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <Header title="AI Regex Generator" onBack={onBack} />
      <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg border border-gray-700">
        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-slate-300 mb-2">Describe the pattern you need</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., a valid email address, a phone number with country code, or a URL with http/https"
              rows={4}
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 rounded-md transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : 'Generate Regex'}
          </button>
          {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
          {regex && (
            <div className="mt-6">
               <label className="block text-lg font-medium text-slate-300 mb-2">Generated Regex</label>
                <div className="relative">
                    <input
                        type="text"
                        readOnly
                        value={regex}
                        className="w-full p-3 pr-20 rounded-md bg-gray-700 border border-gray-600 font-mono"
                    />
                    <button 
                        onClick={handleCopy}
                        className="absolute inset-y-0 right-0 px-4 text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegexGenerator;

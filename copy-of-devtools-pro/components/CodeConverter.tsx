
import React, { useState } from 'react';
import Header from './Header';
import { convertCode } from '../services/geminiService';

interface CodeConverterProps {
  onBack: () => void;
}

const LANGUAGES = [
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'PHP', 'Swift', 'Go', 'Kotlin', 'Rust', 'Ruby', 'Dart', 'SQL'
];

const CodeConverter: React.FC<CodeConverterProps> = ({ onBack }) => {
  const [sourceCode, setSourceCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [sourceLang, setSourceLang] = useState('JavaScript');
  const [targetLang, setTargetLang] = useState('Python');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = async () => {
    if (!sourceCode.trim() || sourceLang === targetLang) {
        if (sourceLang === targetLang) {
            setError("Source and target languages must be different.");
        }
        return;
    }
    setIsLoading(true);
    setError('');
    setConvertedCode('');
    try {
      const result = await convertCode(sourceCode, sourceLang, targetLang);
      setConvertedCode(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    if (!convertedCode) return;
    navigator.clipboard.writeText(convertedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <Header title="AI Code Converter" onBack={onBack} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Column */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-slate-300">Source Code</h2>
            <select
                value={sourceLang}
                onChange={e => setSourceLang(e.target.value)}
                className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors text-sm"
            >
                {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder={`Enter ${sourceLang} code here...`}
            className="w-full h-96 p-4 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors font-mono text-sm resize-none"
          />
        </div>
        {/* Output Column */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-slate-300">Converted Code</h2>
            <select
                value={targetLang}
                onChange={e => setTargetLang(e.target.value)}
                className="p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors text-sm"
            >
                {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
          <div className="relative w-full h-96">
            <pre className="w-full h-full p-4 rounded-md bg-gray-800 border border-gray-700 overflow-auto">
              <code className="font-mono text-sm whitespace-pre-wrap">{convertedCode}</code>
            </pre>
             <button 
                onClick={handleCopy}
                disabled={!convertedCode}
                className="absolute top-2 right-2 px-3 py-1 text-sm bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 rounded-md transition-colors"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center">
        <button
            onClick={handleConvert}
            disabled={isLoading || !sourceCode.trim()}
            className="w-full max-w-xs py-3 px-4 bg-cyan-600 hover:bg-cyan-500 rounded-md transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center text-lg font-semibold"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Converting...
              </>
            ) : 'Convert Code'}
          </button>
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default CodeConverter;

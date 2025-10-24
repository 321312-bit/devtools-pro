
import React, { useState, useEffect } from 'react';
import Header from './Header';

interface TimestampConverterProps {
  onBack: () => void;
}

const TimestampConverter: React.FC<TimestampConverterProps> = ({ onBack }) => {
  const [timestamp, setTimestamp] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [date, setDate] = useState<string>(new Date().toISOString());
  
  useEffect(() => {
    try {
      const tsNumber = parseInt(timestamp, 10);
      if (!isNaN(tsNumber)) {
        const d = new Date(tsNumber * 1000);
        setDate(d.toISOString());
      }
    } catch (e) {
      // ignore
    }
  }, [timestamp]);
  
  useEffect(() => {
    try {
      const d = new Date(date);
      if (!isNaN(d.getTime())) {
          setTimestamp(Math.floor(d.getTime() / 1000).toString());
      }
    } catch(e) {
      // ignore
    }
  }, [date]);

  return (
    <div>
      <Header title="Timestamp Converter" onBack={onBack} />
      <div className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg border border-gray-700">
        <div className="space-y-6">
          <div>
            <label htmlFor="timestamp" className="block text-sm font-medium text-slate-300 mb-1">Unix Timestamp (seconds)</label>
            <input
              id="timestamp"
              type="number"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-1">ISO 8601 Date</label>
            <input
              id="date"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampConverter;

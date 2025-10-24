
import React, { useState, useEffect } from 'react';
import Header from './Header';

interface ColorConverterProps {
  onBack: () => void;
}

const ColorConverter: React.FC<ColorConverterProps> = ({ onBack }) => {
  const [color, setColor] = useState('#0891b2'); // a nice cyan
  const [hex, setHex] = useState('#0891b2');
  const [rgb, setRgb] = useState('rgb(8, 145, 178)');
  const [hsl, setHsl] = useState('hsl(192, 91%, 36%)');

  const hexToRgb = (h: string) => {
    let r = '0', g = '0', b = '0';
    if (h.length === 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
    } else if (h.length === 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return `rgb(${+r}, ${+g}, ${+b})`;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    setHex(newColor);
    const rgbVal = hexToRgb(newColor);
    setRgb(rgbVal);
    const [r, g, b] = rgbVal.match(/\d+/g)?.map(Number) || [0,0,0];
    setHsl(rgbToHsl(r,g,b));
  };
  
  return (
    <div>
      <Header title="Color Converter" onBack={onBack} />
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="relative">
          <div className="w-64 h-64 rounded-full border-8 border-gray-700" style={{ backgroundColor: color }}></div>
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="w-full max-w-sm space-y-4">
          <ColorInput label="HEX" value={hex} />
          <ColorInput label="RGB" value={rgb} />
          <ColorInput label="HSL" value={hsl} />
        </div>
      </div>
    </div>
  );
};

const ColorInput: React.FC<{label: string, value: string}> = ({label, value}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
    return (
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={value}
                    className="w-full p-2 pr-12 rounded-md bg-gray-700 border border-gray-600 font-mono"
                />
                <button 
                    onClick={handleCopy}
                    className="absolute inset-y-0 right-0 px-3 text-sm text-slate-400 hover:text-cyan-400"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </div>
    )
}

export default ColorConverter;

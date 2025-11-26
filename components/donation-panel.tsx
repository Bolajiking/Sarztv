'use client';

import React, { useState } from 'react';

const PRESET_AMOUNTS = [10, 25, 50, 100];

export function DonationPanel() {
  const [amount, setAmount] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePresetClick = (val: number) => {
    setAmount(val.toString());
    setSelectedPreset(val);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setSelectedPreset(null);
  };

  const handleDonate = () => {
    if (!amount || isProcessing) return;
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setAmount('');
      setSelectedPreset(null);
      alert('Thank you for your generosity! (Demo)');
    }, 1500);
  };

  return (
    <div className="mt-4 rounded-xl bg-gradient-to-br from-[#111111] to-black border border-[#c5a059]/20 p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="text-xl">🤲</span> Make an Offering
        </h3>
        <span className="text-xs text-[#c5a059] font-medium px-2 py-1 bg-[#c5a059]/10 rounded-full">
          Secure
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            onClick={() => handlePresetClick(preset)}
            className={`py-2 px-1 rounded-lg text-sm font-bold transition-all duration-200 ${
              selectedPreset === preset
                ? 'bg-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20 scale-105'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            ${preset}
          </button>
        ))}
      </div>

      {/* Custom Amount & Donate Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c5a059] text-sm font-bold">$</span>
          <input
            type="number"
            value={amount}
            onChange={handleInputChange}
            placeholder="Custom"
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-7 pr-3 text-sm text-white font-bold placeholder-slate-600 focus:outline-none focus:border-[#c5a059]/50 focus:ring-1 focus:ring-[#c5a059]/50 transition-all"
          />
        </div>
        <button
          onClick={handleDonate}
          disabled={!amount || isProcessing}
          className="px-6 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#e5c07b] hover:from-[#d4b06a] hover:to-[#f0cf8c] text-black font-bold text-sm rounded-lg shadow-lg shadow-[#c5a059]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
        >
          {isProcessing ? (
            <span className="animate-pulse">Processing...</span>
          ) : (
            <>
              Give Now <span className="text-lg">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

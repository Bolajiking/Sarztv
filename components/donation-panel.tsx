'use client';

import React, { useState } from 'react';

const PRESET_AMOUNTS = [5, 10, 25, 50];

export function DonationPanel() {
  const [amount, setAmount] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'input' | 'confirm' | 'success'>('input');

  const handlePresetClick = (val: number) => {
    setAmount(val.toString());
    setSelectedPreset(val);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setSelectedPreset(null);
  };

  const handleInitialSubmit = () => {
    if (!amount) return;
    setStep('confirm');
  };

  const handleConfirmDonate = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      
      // Reset after showing success
      setTimeout(() => {
        setAmount('');
        setSelectedPreset(null);
        setStep('input');
      }, 3000);
    }, 1500);
  };

  const handleCancel = () => {
    setStep('input');
  };

  if (step === 'success') {
    return (
      <div className="mt-4 rounded-xl bg-[#111111] border border-green-500/30 p-6 shadow-lg flex flex-col items-center justify-center text-center min-h-[180px] animate-in fade-in zoom-in duration-300">
        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-white font-bold text-lg mb-1">Support Sent!</h3>
        <p className="text-slate-400 text-sm">Thank you for supporting the craft!</p>
        <p className="text-[#c5a059] text-xs mt-2 font-medium">Payment processed via Mobile Purse</p>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="mt-4 rounded-xl bg-[#111111] border border-[#c5a059]/30 p-6 shadow-lg flex flex-col items-center justify-center text-center min-h-[180px] animate-in fade-in slide-in-from-bottom-2 duration-300">
        <h3 className="text-white font-bold text-lg mb-2">Confirm Tip</h3>
        <p className="text-slate-300 text-sm mb-4">
          Send <span className="text-[#c5a059] font-bold text-lg">${amount}</span> to support Sarz?
        </p>
        
        <div className="flex gap-3 w-full">
          <button
            onClick={handleCancel}
            disabled={isProcessing}
            className="flex-1 py-2 px-4 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold rounded-lg transition-colors border border-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDonate}
            disabled={isProcessing}
            className="flex-1 py-2 px-4 bg-[#c5a059] hover:bg-[#e5c07b] text-black text-sm font-bold rounded-lg transition-colors shadow-lg shadow-[#c5a059]/20 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Processing
              </>
            ) : (
              'Confirm'
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl bg-gradient-to-br from-[#111111] to-black border border-[#c5a059]/20 p-4 shadow-lg animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span className="text-xl">💸</span> Support the Artist
        </h3>
        <span className="text-xs text-[#c5a059] font-medium px-2 py-1 bg-[#c5a059]/10 rounded-full flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
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
          onClick={handleInitialSubmit}
          disabled={!amount}
          className="px-6 py-2.5 bg-gradient-to-r from-[#c5a059] to-[#e5c07b] hover:from-[#d4b06a] hover:to-[#f0cf8c] text-black font-bold text-sm rounded-lg shadow-lg shadow-[#c5a059]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
        >
          Tip Now <span className="text-lg">💰</span>
        </button>
      </div>
      
      <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-500">
        <span>Powered by Mobile Purse</span>
      </div>
    </div>
  );
}

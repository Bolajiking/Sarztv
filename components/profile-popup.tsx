'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth/use-auth';
import { useUserProfile } from '@/lib/auth/use-user-profile';
import Link from 'next/link';
import Image from 'next/image';

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfilePopup({ isOpen, onClose }: ProfilePopupProps) {
  const { user, logout } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const [activeTab, setActiveTab] = useState<'profile' | 'purse'>('profile');
  const [balance, setBalance] = useState(124.50); // Mock balance
  const [isAddingFunds, setIsProcessing] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Get display name/email
  // Prioritize profile display name, then email part, then default
  const displayName = profile?.display_name || user?.email?.address?.split('@')[0] || 'Member';
  const email = profile?.email || user?.email?.address || 'No email connected';
  
  // Use profile avatar if available, otherwise default
  const pfpUrl = profile?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop';

  const handleTopUp = () => {
    if (!topUpAmount) return;
    setIsProcessing(true);
    setTimeout(() => {
      setBalance(prev => prev + parseFloat(topUpAmount));
      setTopUpAmount('');
      setIsProcessing(false);
      alert('Funds added successfully!');
    }, 1500);
  };

  return (
    <div 
      ref={popupRef}
      className="absolute right-0 top-20 w-[90vw] sm:w-96 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden z-[100] animate-fade-in-up origin-top-right"
    >
      {/* Header / Tabs */}
      <div className="flex border-b border-white/5 bg-[#111111]/50 backdrop-blur-sm">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-4 text-sm font-bold transition-colors relative ${
            activeTab === 'profile' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Profile
          {activeTab === 'profile' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a059] shadow-[0_0_10px_rgba(197,160,89,0.5)]"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('purse')}
          className={`flex-1 py-4 text-sm font-bold transition-colors relative ${
            activeTab === 'purse' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Mobile Purse
          {activeTab === 'purse' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
          )}
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'profile' ? (
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#c5a059] transition-colors relative">
                  {profileLoading ? (
                     <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                  ) : (
                    <Image 
                      src={pfpUrl} 
                      alt="Profile" 
                      width={80} 
                      height={80} 
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <button className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white truncate">
                  {profileLoading ? 'Loading...' : displayName}
                </h3>
                <p className="text-sm text-slate-400 truncate">{email}</p>
                <div className="mt-2 flex gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20">
                    Member
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              <Link href="/profile" onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account Settings
              </Link>
              <Link href="/products" onClick={onClose} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Order History
              </Link>
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Mobile Purse / Wallet */}
            <div className="bg-gradient-to-br from-[#c5a059]/20 to-[#998045]/20 rounded-xl p-6 border border-[#c5a059]/20 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
              <p className="text-slate-300 text-sm font-medium mb-1">Available Balance</p>
              <h2 className="text-4xl font-black text-white tracking-tight">
                ${balance.toFixed(2)}
              </h2>
              <div className="mt-6 flex gap-3">
                <button 
                  className="flex-1 bg-[#c5a059] text-black py-2.5 rounded-lg font-bold text-sm hover:bg-[#e5c07b] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/10"
                  onClick={() => document.getElementById('top-up-input')?.focus()}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Funds
                </button>
                <button className="flex-1 bg-black/40 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-black/60 transition-colors border border-white/10 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Send
                </button>
              </div>
            </div>

            {/* Add Funds Form */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Quick Top Up
              </label>
              <div className="relative mb-3">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c5a059] font-bold">$</span>
                <input
                  id="top-up-input"
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#111111] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white font-bold placeholder-slate-600 focus:outline-none focus:border-[#c5a059]/50 focus:ring-1 focus:ring-[#c5a059]/50"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[10, 20, 50].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setTopUpAmount(amt.toString())}
                    className="py-2 rounded-lg bg-[#111111] hover:bg-[#1a1a1a] border border-white/5 text-xs font-bold text-slate-300 hover:text-[#c5a059] transition-colors"
                  >
                    +${amt}
                  </button>
                ))}
              </div>
              <button
                onClick={handleTopUp}
                disabled={!topUpAmount || isAddingFunds}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#e5c07b] font-bold text-black shadow-lg shadow-[#c5a059]/20 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isAddingFunds ? 'Processing...' : 'Pay'}
              </button>
              <p className="text-center text-[10px] text-slate-500 mt-3">
                Secured by Stripe & Circle. Funds available instantly.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

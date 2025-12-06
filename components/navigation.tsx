'use client';

import { useAuth } from '@/lib/auth/use-auth';
import { useAdmin } from '@/lib/auth/use-admin';
import { useUserProfile } from '@/lib/auth/use-user-profile';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProfilePopup } from './profile-popup';

export function Navigation() {
  const { isReady, isAuthenticated, user, login, logout, userId } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { profile, loading: profileLoading } = useUserProfile();
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug logging
  useEffect(() => {
    if (mounted && isReady && isAuthenticated) {
      console.log('[Navigation] Auth state:', {
        userId,
        isAdmin,
        adminLoading,
        userEmail: user?.email?.address,
        displayName: profile?.display_name,
      });
    }
  }, [mounted, isReady, isAuthenticated, userId, isAdmin, adminLoading, user, profile]);

  // Prioritize profile display name, then email part, then default
  const displayName = profile?.display_name || user?.email?.address?.split('@')[0] || 'Member';
  // Use profile avatar if available, otherwise default
  const pfpUrl = profile?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop';

  return (
    <nav className="border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-black text-white hover:scale-105 transform transition-transform duration-300 flex items-center gap-2"
            >
              <span className="text-3xl">🎹</span>
              <span className="gradient-text">SARZ TV</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <Link
              href="/videos"
              className="relative px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/5 rounded-md"
            >
              Videos
            </Link>
            <Link
              href="/streams"
              className="relative px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/5 rounded-md flex items-center gap-2"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Live Sessions
            </Link>
            <Link
              href="/products"
              className="relative px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-all duration-300 hover:bg-white/5 rounded-md"
            >
              Store
            </Link>
            {mounted && isAuthenticated && !adminLoading && (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="relative px-4 py-2 text-sm font-semibold text-[#c5a059] hover:text-[#e5c07b] transition-all duration-300 hover:bg-[#c5a059]/10 rounded-md flex items-center gap-1.5"
                  >
                    <span>⚡</span> Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Auth Section & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Auth Section */}
            <div className="flex items-center space-x-4 relative">
            {!mounted || !isReady ? (
              <div className="h-10 w-24 animate-pulse rounded-lg bg-white/5" />
            ) : isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 relative group-hover:border-[#c5a059] transition-colors">
                    <Image 
                      src={pfpUrl}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-white hidden sm:block max-w-[100px] truncate group-hover:text-[#c5a059] transition-colors">
                    {profileLoading ? '...' : displayName}
                  </span>
                  <svg 
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''} group-hover:text-white`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Popup */}
                <ProfilePopup isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
              </div>
            ) : (
              <button
                onClick={login}
                className="relative px-6 py-3 rounded-lg font-bold text-black bg-gradient-to-r from-[#c5a059] to-[#e5c07b] hover:scale-105 transform transition-all duration-300 shadow-xl shadow-[#c5a059]/20"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col p-4 space-y-2">
              <Link
                href="/videos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-semibold flex items-center gap-3"
              >
                <span>🎬</span> Videos
              </Link>
              <Link
                href="/streams"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-semibold flex items-center gap-3"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Live Sessions
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-semibold flex items-center gap-3"
              >
                <span>🛍️</span> Store
              </Link>
              
              {mounted && isAuthenticated && isAdmin && !adminLoading && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-[#c5a059] hover:bg-[#c5a059]/10 transition-colors font-semibold flex items-center gap-3 mt-2 border-t border-white/5"
                >
                  <span>⚡</span> Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      </div>
    </nav>
  );
}

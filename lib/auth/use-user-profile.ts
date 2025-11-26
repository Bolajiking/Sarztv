'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/use-auth';

export interface UserProfile {
  id: string;
  privy_user_id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const PROFILE_UPDATED_EVENT = 'user-profile-updated';

export function useUserProfile() {
  const { isReady, isAuthenticated, userId } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async (isMounted: boolean) => {
    if (!isReady || !isAuthenticated || !userId) {
      if (isMounted) {
        setProfile(null);
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      // Use API route to fetch profile (bypasses RLS with service role key)
      const response = await fetch(`/api/profile?user_id=${encodeURIComponent(userId)}`);
      
      if (!response.ok) {
        // Profile doesn't exist yet
        if (isMounted) {
          setProfile(null);
        }
        return;
      }

      const { profile: data } = await response.json();

      if (isMounted) {
        setProfile(data);
      }
    } catch (err) {
      console.error('Error loading user profile:', err);
      if (isMounted) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Initial fetch
    fetchProfile(isMounted);

    // Listen for profile updates from other components
    const handleProfileUpdate = () => {
      console.log('[useUserProfile] Profile update event received, refreshing...');
      fetchProfile(isMounted);
    };

    window.addEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
    };
  }, [isReady, isAuthenticated, userId]);

  // Function to manually refresh the profile (e.g. after update)
  const refreshProfile = async () => {
    await fetchProfile(true);
  };

  return {
    profile,
    loading,
    error,
    refreshProfile
  };
}

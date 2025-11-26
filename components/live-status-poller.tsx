'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface LiveStatusPollerProps {
  intervalMs?: number;
  currentIsLive?: boolean;
}

export function LiveStatusPoller({ intervalMs = 5000, currentIsLive }: LiveStatusPollerProps) {
  const router = useRouter();
  const lastLiveState = useRef(currentIsLive);

  useEffect(() => {
    // Update ref if prop changes (e.g. after revalidation)
    lastLiveState.current = currentIsLive;
  }, [currentIsLive]);

  useEffect(() => {
    const poll = async () => {
      try {
        // We check our internal API which calls Livepeer with fresh data
        // This avoids full page reload overhead just to check status
        const res = await fetch('/api/streams/check-livepeer', { 
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache' } 
        });
        
        if (res.ok) {
          const data = await res.json();
          const isNowLive = data.isActive;
          
          // If status changed, refresh the page data
          if (isNowLive !== lastLiveState.current) {
            console.log(`[LiveStatusPoller] Stream status changed: ${lastLiveState.current} -> ${isNowLive}. Refreshing...`);
            lastLiveState.current = isNowLive;
            router.refresh();
          }
        }
      } catch (err) {
        console.error('[LiveStatusPoller] Polling error:', err);
      }
    };

    // Initial check
    poll();

    // Set up interval
    const intervalId = setInterval(poll, intervalMs);

    return () => clearInterval(intervalId);
  }, [intervalMs, router]);

  return null;
}


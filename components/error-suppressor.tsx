'use client';

import { useEffect } from 'react';

/**
 * Global error suppressor for benign Livepeer/Next.js errors
 * Intercepts console.error to filter out empty objects and timeout errors
 */
export function ErrorSuppressor() {
  useEffect(() => {
    // Store the original console.error
    const originalError = console.error;

    // Override console.error
    console.error = (...args: any[]) => {
      let shouldSuppress = false;

      try {
        // First check: if all args are empty objects or strings, suppress immediately
        const allArgsEmpty = args.every((arg) => {
          if (typeof arg === 'string' && (arg === '{}' || arg.trim() === '')) return true;
          if (typeof arg === 'object' && arg !== null && !Array.isArray(arg)) {
            const json = JSON.stringify(arg);
            if (json === '{}' || json === '[]') return true;
          }
          return false;
        });
        
        if (allArgsEmpty) {
          shouldSuppress = true;
        } else {
          // Check if any argument matches suppression criteria
          shouldSuppress = args.some((arg) => {
          // 1. Check for Strings
          if (typeof arg === 'string') {
            const lowerArg = arg.toLowerCase();
            return (
              lowerArg.includes('timeout') ||
              lowerArg.includes('canplay') ||
              lowerArg === '{}' ||
              lowerArg.includes('[video player]') ||
              lowerArg.includes('playback error') ||
              lowerArg.includes("the stream's key frame interval is not constant") ||
              lowerArg.includes('levelparsingerror') ||
              lowerArg.includes('manifestparsingerror') ||
              lowerArg.includes('manifestloaderror') ||
              lowerArg.includes('err_timed_out') ||
              lowerArg.includes('err_name_not_resolved') ||
              lowerArg.includes('failed to fetch') ||
              lowerArg.includes('error fetching') ||
              lowerArg.includes('error with hls') ||
              lowerArg.includes('play() failed') ||
              lowerArg.includes('notallowederror') ||
              lowerArg.includes("user didn't interact") ||
              lowerArg.includes('unique "key" prop') ||
              lowerArg.includes('warning-keys')
            );
          }

          // 2. Check for Objects
          if (typeof arg === 'object' && arg !== null) {
            // 2a. Explicit check for Error instances
            if (arg instanceof Error) {
              const msg = arg.message?.toLowerCase() || '';
              // Suppress benign Livepeer errors
              if (
                msg.includes('timeout') || 
                msg.includes('canplay') || 
                msg.includes('levelparsingerror') ||
                msg.includes('manifestparsingerror') ||
                msg.includes('manifestloaderror') ||
                msg.includes('err_timed_out') ||
                msg.includes('err_name_not_resolved') ||
                msg.includes('failed to fetch') ||
                msg.includes('play() failed') ||
                msg.includes('notallowederror') ||
                msg.includes("user didn't interact") ||
                msg === '{}' || // Some Livepeer errors might just have '{}' as message
                msg.length === 0 // Empty error message
          ) {
            return true;
              }
              return false; // Keep other real errors
            }

            // 2b. Generic object inspection
            try {
              // Check if it looks like an Error (has message or stack) but failed instanceof
              // We use 'in' to check prototype chain as well
              if ('message' in arg || 'stack' in arg) {
                 const msg = String((arg as any).message || '').toLowerCase();
                 // Check for benign error messages
                 if (
                    msg.includes('timeout') || 
                    msg.includes('canplay') ||
                    msg.includes('levelparsingerror') ||
                    msg.includes('manifestparsingerror') ||
                    msg.includes('manifestloaderror') ||
                    msg.includes('err_timed_out') ||
                    msg.includes('err_name_not_resolved') ||
                    msg.includes('failed to fetch') ||
                    msg.includes('play() failed') ||
                    msg.includes('notallowederror') ||
                    msg.includes("user didn't interact") ||
                    msg === '{}' ||
                    msg.length === 0
                 ) return true;
                 
                 return false; 
              }

              // If no message/stack, check if it has ANY enumerable keys
              const keys = Object.keys(arg);
              if (keys.length === 0) {
                 // It has no own enumerable keys and no message/stack.
                 // It's likely an empty object {}, or a generic Event object with no useful info.
                 
                 // Don't suppress Arrays (e.g. console.error([]) might be intentional debugging)
                 if (Array.isArray(arg)) return false;

                 // Suppress plain empty objects and generic Event objects that might look like {}
                 return true;
              }
            } catch (e) {
              // If inspection fails (e.g. restricted object), do not suppress
              return false;
          }
        }

        return false;
      });
        }
      } catch (checkError) {
        // If suppression logic fails, default to NOT suppressing
        shouldSuppress = false;
      }

      // Only call original error if we shouldn't suppress
      if (!shouldSuppress) {
        // Wrap in try-catch to prevent the suppressor itself from causing crashes
        try {
            originalError.apply(console, args);
        } catch (e) {
            // If apply fails, try direct call as fallback
            try {
        originalError(...args);
            } catch (finalError) {
                // If everything fails, silently fail to avoid app crash
            }
        }
      }
    };

    // Cleanup: restore original console.error
    return () => {
      console.error = originalError;
    };
  }, []);

  return null; // This component doesn't render anything
}

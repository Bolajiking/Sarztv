'use client';

import { PrivyProvider as PrivyProviderBase } from '@privy-io/react-auth';
import { env } from '@/lib/env';
import { useMemo } from 'react';

interface PrivyProviderProps {
  children: React.ReactNode;
}

/**
 * Privy Authentication Provider
 * Wraps the app with Privy authentication context
 * 
 * Configuration Priority:
 * 1. Privy Dashboard settings (via appId) - OAuth providers, branding, etc.
 * 2. Environment variables (for local overrides)
 * 
 * The Privy Dashboard is the primary source of truth for:
 * - OAuth provider configurations (Google, Twitter, etc.)
 * - Branding and appearance settings
 * - Security and authorization settings
 * 
 * Environment variables are used to specify:
 * - Which login methods to enable
 * - Theme preferences (light/dark)
 * - Custom branding (logo, accent color)
 * - Embedded wallet settings
 */
export function PrivyProvider({ children }: PrivyProviderProps) {
  const privyConfig = useMemo(() => {
    if (!env.privyAppId) {
      return null;
    }

    // Configure login methods: email, wallet, google, twitter, sms (for WhatsApp)
    // These must be enabled in your Privy Dashboard for OAuth providers to work
    // Note: WhatsApp login uses SMS method - users enter their phone number and receive verification via WhatsApp
    const loginMethods: Array<'wallet' | 'email' | 'sms' | 'google' | 'apple' | 'twitter' | 'discord' | 'github' | 'linkedin' | 'tiktok' | 'farcaster'> = [
      'email',
      'wallet',
      'google',
      'twitter',
      'sms',  // Enables phone/WhatsApp authentication
    ];

    // Debug: Log configuration in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔐 Privy Configuration:', {
        appId: env.privyAppId ? `${env.privyAppId.substring(0, 10)}...` : 'Not set',
        loginMethods,
        theme: env.privyTheme,
        accentColor: env.privyAccentColor,
        embeddedWallets: env.privyEmbeddedWallets,
        note: 'OAuth providers must be configured in Privy Dashboard',
      });
    }

    // Build appearance config
    // Uses Privy Dashboard settings by default, can be overridden with environment variables
    const appearance: {
      theme: 'light' | 'dark';
      accentColor: `#${string}`;
      logo?: string;
    } = {
      theme: env.privyTheme,
      accentColor: env.privyAccentColor.startsWith('#') 
        ? env.privyAccentColor as `#${string}`
        : `#${env.privyAccentColor}` as `#${string}`,
    };

    // Add custom logo if provided, otherwise Privy Dashboard logo will be used
    if (env.privyLogo && env.privyLogo !== '/next.svg') {
      appearance.logo = env.privyLogo;
    }

    // Build chain configuration for Web3 wallets
    const defaultChain = {
      id: env.chainId,
      name: env.chainName,
      network: env.chainName,
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: {
        default: {
          http: [env.rpcUrl],
        },
      },
    };

    // Build base config
    const config: any = {
      loginMethods,
      appearance,
      defaultChain,
    };

    // Add embedded wallets configuration if enabled
    if (env.privyEmbeddedWallets) {
      config.embeddedWallets = {
        createOnLogin: 'users-without-wallets',
        requireUserPasswordOnCreate: false,
      };
    }

    return config;
  }, []);

  if (!env.privyAppId || !privyConfig) {
    console.warn('⚠️ Privy App ID not configured. Authentication will not work.');
    console.warn('Please set NEXT_PUBLIC_PRIVY_APP_ID in your .env.local file.');
    return <>{children}</>;
  }

  return (
    <PrivyProviderBase
      appId={env.privyAppId}
      config={privyConfig}
    >
      {children}
    </PrivyProviderBase>
  );
}


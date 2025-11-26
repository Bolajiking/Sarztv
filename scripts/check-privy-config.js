#!/usr/bin/env node
/**
 * Script to verify Privy configuration
 * Run: node scripts/check-privy-config.js
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

console.log('🔐 Checking Privy Configuration...\n');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

console.log('📋 Current Privy Configuration:\n');

// Required
const appId = envVars['NEXT_PUBLIC_PRIVY_APP_ID'];
const appSecret = envVars['PRIVY_APP_SECRET'];

console.log('Required:');
console.log(`  NEXT_PUBLIC_PRIVY_APP_ID: ${appId ? '✅ Set' : '❌ Missing'}`);
console.log(`  PRIVY_APP_SECRET: ${appSecret ? '✅ Set' : '❌ Missing'}\n`);

// Optional
console.log('Optional Configuration:');
console.log(`  NEXT_PUBLIC_PRIVY_LOGIN_METHODS: ${envVars['NEXT_PUBLIC_PRIVY_LOGIN_METHODS'] || '⚠️  Not set (default: wallet,email,sms)'}`);
console.log(`  NEXT_PUBLIC_PRIVY_THEME: ${envVars['NEXT_PUBLIC_PRIVY_THEME'] || '⚠️  Not set (default: dark)'}`);
console.log(`  NEXT_PUBLIC_PRIVY_ACCENT_COLOR: ${envVars['NEXT_PUBLIC_PRIVY_ACCENT_COLOR'] || '⚠️  Not set (default: #c5a059)'}`);
console.log(`  NEXT_PUBLIC_PRIVY_LOGO: ${envVars['NEXT_PUBLIC_PRIVY_LOGO'] || '⚠️  Not set (default: /next.svg)'}`);
console.log(`  NEXT_PUBLIC_PRIVY_EMBEDDED_WALLETS: ${envVars['NEXT_PUBLIC_PRIVY_EMBEDDED_WALLETS'] || '⚠️  Not set (default: false)'}\n`);

if (!appId) {
  console.error('❌ NEXT_PUBLIC_PRIVY_APP_ID is required!');
  process.exit(1);
}

console.log('💡 To customize Privy, add these to your .env.local:\n');
console.log('# Login Methods (comma-separated)');
console.log('NEXT_PUBLIC_PRIVY_LOGIN_METHODS=wallet,email,sms,google,apple\n');
console.log('# Appearance');
console.log('NEXT_PUBLIC_PRIVY_THEME=dark');
console.log('NEXT_PUBLIC_PRIVY_ACCENT_COLOR=#c5a059');
console.log('NEXT_PUBLIC_PRIVY_LOGO=/logo.svg\n');
console.log('# Embedded Wallets');
console.log('NEXT_PUBLIC_PRIVY_EMBEDDED_WALLETS=true\n');
console.log('⚠️  Remember to restart your dev server after adding/changing variables!');


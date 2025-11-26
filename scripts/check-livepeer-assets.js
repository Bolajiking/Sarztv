#!/usr/bin/env node

/**
 * Check Livepeer Assets Status
 * 
 * This script checks all your Livepeer assets and identifies which ones are broken
 * 
 * Usage:
 *   LIVEPEER_API_KEY=your_key node scripts/check-livepeer-assets.js
 */

const LIVEPEER_API_KEY = process.env.LIVEPEER_API_KEY;

if (!LIVEPEER_API_KEY) {
  console.error('❌ Error: LIVEPEER_API_KEY environment variable is required');
  console.error('');
  console.error('Usage:');
  console.error('  LIVEPEER_API_KEY=your_key node scripts/check-livepeer-assets.js');
  process.exit(1);
}

async function checkAssets() {
  try {
    console.log('🔍 Fetching assets from Livepeer...\n');
    
    const response = await fetch('https://livepeer.studio/api/asset', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LIVEPEER_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Livepeer API error: ${response.status} ${response.statusText}`);
    }

    const assets = await response.json();
    
    if (!Array.isArray(assets) || assets.length === 0) {
      console.log('ℹ️  No assets found in your Livepeer account');
      return;
    }

    console.log(`📊 Total assets: ${assets.length}\n`);
    console.log('=' .repeat(80));
    
    const healthyAssets = [];
    const brokenAssets = [];
    const processingAssets = [];

    for (const asset of assets) {
      const status = asset.status?.phase || asset.status || 'unknown';
      const duration = asset.videoSpec?.duration || 0;
      const size = asset.size || 0;
      const playbackId = asset.playbackId || (Array.isArray(asset.playbackIds) && asset.playbackIds[0]?.id) || null;
      
      const assetInfo = {
        id: asset.id,
        name: asset.name,
        status,
        duration,
        size,
        playbackId,
        createdAt: asset.createdAt ? new Date(asset.createdAt * 1000).toLocaleString() : 'Unknown',
      };

      // Categorize
      if (status === 'processing' || status === 'waiting') {
        processingAssets.push(assetInfo);
      } else if (status === 'ready' && duration > 0 && playbackId) {
        healthyAssets.push(assetInfo);
      } else {
        brokenAssets.push(assetInfo);
      }
    }

    // Print results
    console.log('\n✅ HEALTHY ASSETS (Should Play)');
    console.log('=' .repeat(80));
    if (healthyAssets.length === 0) {
      console.log('  None');
    } else {
      healthyAssets.forEach(asset => {
        const durationStr = asset.duration > 0 
          ? `${Math.floor(asset.duration)}s` 
          : '0s';
        const sizeStr = asset.size > 0 
          ? `${(asset.size / 1024 / 1024).toFixed(2)} MB` 
          : '0 MB';
        
        console.log(`\n  📹 ${asset.name}`);
        console.log(`     ID: ${asset.id}`);
        console.log(`     Playback ID: ${asset.playbackId}`);
        console.log(`     Duration: ${durationStr}`);
        console.log(`     Size: ${sizeStr}`);
        console.log(`     Created: ${asset.createdAt}`);
        console.log(`     View: https://livepeer.studio/dashboard/assets/${asset.id}`);
      });
    }

    console.log('\n\n⏳ PROCESSING ASSETS (Wait for Processing)');
    console.log('=' .repeat(80));
    if (processingAssets.length === 0) {
      console.log('  None');
    } else {
      processingAssets.forEach(asset => {
        console.log(`\n  ⚙️  ${asset.name}`);
        console.log(`     ID: ${asset.id}`);
        console.log(`     Status: ${asset.status}`);
        console.log(`     Created: ${asset.createdAt}`);
        console.log(`     Note: Wait 2-10 minutes for processing to complete`);
      });
    }

    console.log('\n\n❌ BROKEN ASSETS (Won\'t Play - Need Re-Upload)');
    console.log('=' .repeat(80));
    if (brokenAssets.length === 0) {
      console.log('  None - All assets are healthy! 🎉');
    } else {
      brokenAssets.forEach(asset => {
        const durationStr = asset.duration > 0 
          ? `${Math.floor(asset.duration)}s` 
          : '⚠️  0s (NO VIDEO DATA)';
        const sizeStr = asset.size > 0 
          ? `${(asset.size / 1024 / 1024).toFixed(2)} MB` 
          : '⚠️  0 MB (NO FILE)';
        
        console.log(`\n  🔴 ${asset.name}`);
        console.log(`     ID: ${asset.id}`);
        console.log(`     Status: ${asset.status}`);
        console.log(`     Duration: ${durationStr}`);
        console.log(`     Size: ${sizeStr}`);
        console.log(`     Playback ID: ${asset.playbackId || '⚠️  MISSING'}`);
        console.log(`     Created: ${asset.createdAt}`);
        console.log(`     ⚠️  ISSUE: This asset has no video data. Delete and re-upload.`);
        console.log(`     Delete: https://livepeer.studio/dashboard/assets/${asset.id}`);
      });
    }

    // Summary
    console.log('\n\n📈 SUMMARY');
    console.log('=' .repeat(80));
    console.log(`  Total Assets: ${assets.length}`);
    console.log(`  ✅ Healthy: ${healthyAssets.length}`);
    console.log(`  ⏳ Processing: ${processingAssets.length}`);
    console.log(`  ❌ Broken: ${brokenAssets.length}`);
    
    if (brokenAssets.length > 0) {
      console.log('\n  ⚠️  ACTION REQUIRED:');
      console.log(`     ${brokenAssets.length} broken asset(s) need to be deleted and re-uploaded.`);
      console.log('     These assets were created but the video file was never uploaded successfully.');
    }

    console.log('\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAssets();


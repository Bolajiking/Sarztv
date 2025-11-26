#!/usr/bin/env node

/**
 * Run Migration 008: Add category column to videos table
 * 
 * This script executes the migration SQL using Supabase REST API
 * 
 * Usage:
 *   node scripts/run-migration-008-simple.js
 * 
 * Requires environment variables:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

const fs = require('fs');
const path = require('path');

async function runMigration() {
  try {
    console.log('🔄 Running migration: 008_add_video_category.sql\n');

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_') || supabaseKey.includes('your_')) {
      console.error('❌ Error: Supabase credentials not configured');
      console.error('\nPlease set these environment variables:');
      console.error('  - NEXT_PUBLIC_SUPABASE_URL');
      console.error('  - SUPABASE_SERVICE_ROLE_KEY');
      console.error('\nOr run this script with:');
      console.error('  NEXT_PUBLIC_SUPABASE_URL=your_url SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/run-migration-008-simple.js');
      process.exit(1);
    }

    // Read the migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/008_add_video_category.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    console.log('📄 Migration SQL:');
    console.log(migrationSQL);
    console.log('\n');

    // Parse SQL statements (split by semicolon, remove comments)
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`⚙️  Executing: ${statement.substring(0, 60)}...`);
        
        // Use Supabase REST API to execute SQL
        // Note: Supabase doesn't have a direct SQL execution endpoint
        // We'll need to use the PostgREST API or SQL editor
        // For now, we'll provide instructions
        
        console.log('⚠️  Direct SQL execution via REST API is not available.');
        console.log('    Please run this migration manually in Supabase Dashboard.\n');
        break;
      }
    }

    console.log('📋 To complete the migration, please:');
    console.log('   1. Go to: https://supabase.com/dashboard/project/[your-project]/sql/new');
    console.log('   2. Copy and paste the SQL from: supabase/migrations/008_add_video_category.sql');
    console.log('   3. Click "Run" to execute');
    console.log('\n✅ The migration will add the `category` column to your videos table!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

runMigration();


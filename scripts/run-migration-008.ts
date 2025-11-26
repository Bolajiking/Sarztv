#!/usr/bin/env tsx

/**
 * Run Migration 008: Add category column to videos table
 * 
 * This script executes the migration SQL directly using Supabase admin client
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { getSupabaseAdmin } from '../lib/supabase/server';

async function runMigration() {
  try {
    console.log('🔄 Running migration: 008_add_video_category.sql\n');

    // Read the migration file
    const migrationPath = join(__dirname, '../supabase/migrations/008_add_video_category.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    console.log('📄 Migration SQL:');
    console.log(migrationSQL);
    console.log('\n');

    // Get Supabase admin client
    const supabase = getSupabaseAdmin();

    // Execute each SQL statement
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`⚙️  Executing: ${statement.substring(0, 60)}...`);
        
        let result;
        try {
          result = await supabase.rpc('exec_sql', { 
            sql: statement 
          });
        } catch (rpcError) {
          // If RPC doesn't exist, try direct query execution
          // Note: Supabase JS client doesn't support raw SQL directly
          // We'll need to use the REST API or SQL editor
          throw new Error('Direct SQL execution not available via JS client');
        }

        const { error } = result;

        if (error) {
          // Try alternative: Execute via REST API
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
          const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

          if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase credentials not found in environment');
          }

          // Use REST API to execute SQL
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({ sql: statement }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`SQL execution failed: ${response.status} ${errorText}`);
          }
        }

        console.log('✅ Success\n');
      }
    }

    console.log('🎉 Migration completed successfully!');
    console.log('\n📋 Summary:');
    console.log('  - Added `category` column to `videos` table');
    console.log('  - Created index on `category` column');
    console.log('\n✅ The videos table now supports categorization!');

  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message);
    
    if (error.message.includes('Direct SQL execution not available')) {
      console.error('\n💡 Alternative: Run this migration manually in Supabase Dashboard');
      console.error('   1. Go to: https://supabase.com/dashboard/project/[your-project]/sql');
      console.error('   2. Copy the SQL from: supabase/migrations/008_add_video_category.sql');
      console.error('   3. Paste and execute in the SQL editor');
    }
    
    process.exit(1);
  }
}

runMigration();


import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/auth/admin-utils';

/**
 * POST /api/migrations/run-008
 * 
 * One-time endpoint to run migration 008: Add category column to videos table
 * 
 * This is a temporary endpoint that should be removed after running the migration
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin access
    const userId = request.headers.get('x-user-id');
    if (!userId || !isAdmin(userId)) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' },
        { status: 403 }
      );
    }

    console.log('[Migration] Running migration 008: Add category column');

    // Read the migration file
    const migrationPath = join(process.cwd(), 'supabase/migrations/008_add_video_category.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    // Get Supabase admin client
    const supabase = getSupabaseAdmin();

    // Parse SQL statements
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    const results = [];

    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`[Migration] Executing: ${statement.substring(0, 60)}...`);
        
        // Use Supabase client to execute SQL via RPC
        // Note: We need to use the REST API directly since JS client doesn't support raw SQL
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Supabase credentials not configured');
        }

        // Execute via PostgREST (Supabase's REST API)
        // We'll use the SQL editor endpoint if available, otherwise provide instructions
        try {
          // Try to execute via Supabase's SQL execution endpoint
          // Note: This may not be available in all Supabase projects
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({ sql: statement }),
          });

          if (response.ok) {
            results.push({ statement, status: 'success' });
            console.log(`[Migration] ✅ Success`);
          } else {
            // If RPC doesn't exist, we'll need to use the dashboard
            throw new Error('SQL execution RPC not available');
          }
        } catch (error: any) {
          // Fallback: Provide instructions for manual execution
          return NextResponse.json({
            success: false,
            message: 'Direct SQL execution not available via API',
            instructions: {
              step1: 'Go to Supabase Dashboard',
              step2: 'Navigate to SQL Editor',
              step3: 'Copy and paste the SQL from: supabase/migrations/008_add_video_category.sql',
              step4: 'Click "Run" to execute',
            },
            sql: migrationSQL,
            note: 'This is a one-time migration. After running it manually, you can delete this API route.',
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      results,
    });

  } catch (error: any) {
    console.error('[Migration] Error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Migration failed',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}


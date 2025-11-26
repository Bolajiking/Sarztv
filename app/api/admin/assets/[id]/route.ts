import { NextRequest, NextResponse } from 'next/server';
import { deleteLivepeerAsset } from '@/lib/video/livepeer-utils';
import { isAdmin } from '@/lib/auth/admin-utils';
import { revalidatePath } from 'next/cache';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = request.headers.get('x-user-id');

    console.log(`[Admin API] Delete Asset Request for ID: ${id}, User: ${userId}`);

    if (!userId || !isAdmin(userId)) {
      console.warn(`[Admin API] Unauthorized delete attempt by user: ${userId}`);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await deleteLivepeerAsset(id);
    } catch (lpError: any) {
      // Check if error is "not found" (already deleted)
      // Livepeer SDK might throw different error structures, so we check message and status
      const isNotFound = 
        lpError?.status === 404 || 
        lpError?.message?.toLowerCase().includes('not found') ||
        lpError?.body?.errors?.[0] === 'not found';

      if (isNotFound) {
        console.warn(`[Admin API] Asset ${id} not found in Livepeer, assuming already deleted.`);
      } else {
        console.error(`[Admin API] Error deleting asset ${id} from Livepeer:`, lpError);
        // We might still want to return success if we just want to remove it from our UI cache
        // But for now, let's return the error so the user knows something went wrong
        throw lpError;
      }
    }
    
    // Revalidate caches to remove from UI immediately
    console.log('[Admin API] Revalidating caches...');
    revalidatePath('/streams', 'page');
    revalidatePath('/admin', 'page');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Admin API] Error in DELETE /api/admin/assets/[id]:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete asset' },
      { status: 500 }
    );
  }
}

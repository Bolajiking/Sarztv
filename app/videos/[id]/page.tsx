import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { VideoPlayer } from '@/components/video-player';
import { VideoCard } from '@/components/video-card'; // Import VideoCard
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLivepeerVideoBySlug, getLivepeerVideos } from '@/lib/video/livepeer-data'; // Import getLivepeerVideos
import { getPlaybackSrc } from '@/lib/video/livepeer-utils';

// Force dynamic rendering for video data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface VideoPageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const video = await getLivepeerVideoBySlug(id);

  if (!video || video.status !== 'ready') {
    notFound();
  }

  // Get playback sources if video has a playback ID
  let playbackSrc = null;
  if (video.playbackId) {
    try {
      playbackSrc = await getPlaybackSrc(video.playbackId);
      if (!playbackSrc || playbackSrc.length === 0) {
        console.warn('[Video Page] No playback sources available for:', video.playbackId);
      }
    } catch (error) {
      console.error('[Video Page] Error fetching playback sources:', error);
    }
  }

  // Fetch related videos
  const allVideos = await getLivepeerVideos(10);
  // Filter out the current video and limit to 5 related videos
  const relatedVideos = allVideos.filter((v) => v.slug !== video.slug).slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white font-sans">
      <Navigation />
      
      <main className="flex-1 pb-20">
        {/* HERO / PLAYER SECTION */}
        <div className="w-full bg-gradient-to-b from-[#111111] to-[#050505] border-b border-white/5">
          <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-400">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/videos" className="hover:text-white transition-colors">Video Library</Link>
                <span>/</span>
                <span className="text-[#c5a059] truncate max-w-[200px]">{video.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* MAIN CONTENT (Left) - 8 Columns */}
                <div className="lg:col-span-9 flex flex-col gap-6">
                    {/* Video Player Container */}
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 bg-black aspect-video group">
                        <div className="absolute inset-0 bg-[#c5a059]/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                        {video.playbackId ? (
                            <VideoPlayer
                            playbackId={video.playbackId}
                            title={video.title}
                            poster={video.thumbnailUrl || undefined}
                            showControls={true}
                            initialSrc={playbackSrc}
                            autoPlay={false}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#111111]">
                            <div className="text-center">
                                <p className="text-slate-400">Video is processing...</p>
                            </div>
                            </div>
                        )}
                    </div>

                    {/* Video Info */}
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                                    {video.title}
                                </h1>
                                <div className="flex items-center gap-4 text-sm text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        {new Date(video.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                    {video.metadata?.category && (
                                        <span className="px-3 py-1 rounded-full bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20 text-xs font-bold uppercase tracking-wider">
                                            {video.metadata.category}
                                        </span>
                                    )}
                                    {!video.isFree && (
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-wider">
                                            Premium
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors border border-white/10">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                    Share
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors border border-white/10">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    Save
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#111111] rounded-xl p-6 border border-white/5">
                            <h3 className="text-lg font-bold text-white mb-3">About this Video</h3>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                {video.description || "No description available."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR (Right) - 4 Columns */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                     <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                        <span className="w-1 h-6 bg-[#c5a059] rounded-full block"></span>
                        Up Next
                    </h3>
                    
                    <div className="space-y-4">
                        {relatedVideos.length > 0 ? (
                            relatedVideos.map((related) => (
                                <div key={related.slug} className="group relative">
                                    <VideoCard
                                        id={related.slug}
                                        href={`/videos/${related.slug}`}
                                        title={related.title}
                                        description={related.description}
                                        thumbnailUrl={related.thumbnailUrl}
                                        priceUsd={related.priceUsd}
                                        isFree={related.isFree}
                                        status={related.status}
                                        compact={true} // You might want to add a 'compact' prop to VideoCard or just rely on the small container
                                    />
                                </div>
                            ))
                        ) : (
                             <p className="text-slate-500 text-sm italic">No related videos found.</p>
                        )}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

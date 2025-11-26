import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { VideoPlayer } from '@/components/video-player';
import { VideoCard } from '@/components/video-card';
import Link from 'next/link';
import { getLivepeerVideos, getLivepeerStreams } from '@/lib/video/livepeer-data';
import { getPlaybackSrc } from '@/lib/video/livepeer-utils';
import { LiveStatusPoller } from '@/components/live-status-poller';
import { VideoCarousel } from '@/components/video-carousel';

// Force dynamic rendering for live stream data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [videos, streams] = await Promise.all([
    getLivepeerVideos(20), 
    getLivepeerStreams(),
  ]);

  const latestStream = streams.find((stream) => stream.isActive) ?? null;

  const latestStreamSrc =
    latestStream?.playbackId
      ? await getPlaybackSrc(latestStream.playbackId)
      : null;
  const isLive = Boolean(latestStream?.isActive && latestStream?.playbackId);

  // 1. Real Uploaded Videos (All categories, sorted by date)
  const recentVideos = videos;

  // Filter videos by category (category is a top-level property, not nested in metadata)
  const worshipVideos = videos.filter(v => v.category === 'worship');
  const sermonVideos = videos.filter(v => v.category === 'sermon');
  const conferenceVideos = videos.filter(v => v.category === 'conference');

  // Placeholder Data for "Worship Experiences" (Fallback if no real data)
  const worshipPlaceholders = [
    {
      id: 'worship-1',
      title: 'Endless Celebration Night',
      description: 'A night of powerful worship and praise.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
    {
      id: 'worship-2',
      title: 'Easter at Celebration',
      description: 'He is Risen! Join us for this special service.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544427920-24e832256172?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
  ];

  // Placeholder Data for "Sermon Series" (Fallback)
  const sermonPlaceholders = [
    {
      id: 'series-1',
      title: 'The Book of Romans',
      description: 'Understanding grace and righteousness.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
    {
      id: 'series-2',
      title: 'Kingdom Culture',
      description: 'Living out the values of the Kingdom.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
  ];

  // Placeholder Data for "Conferences & Events" (Fallback)
  const conferencePlaceholders = [
    {
      id: 'conf-1',
      title: 'Leadership Summit 2024',
      description: 'Equipping leaders for the next season.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1475721027767-305246394162?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 19.99,
      isFree: false,
      status: 'ready'
    },
    {
      id: 'conf-2',
      title: 'Women\'s Conference',
      description: 'Empowering women to walk in their calling.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 14.99,
      isFree: false,
      status: 'ready'
    },
  ];

  // Combine real data with placeholders if real data is sparse (optional, or just show real data)
  // For now, let's prefer real data, but fallback to placeholders if empty to keep the UI populated
  const displayWorship = worshipVideos.length > 0 ? worshipVideos : worshipPlaceholders;
  const displaySermons = sermonVideos.length > 0 ? sermonVideos : sermonPlaceholders;
  const displayConferences = conferenceVideos.length > 0 ? conferenceVideos : conferencePlaceholders;

  // Mock Schedule Data
  const schedule = [
    { time: '10:00 AM', title: 'Sunday Celebration', status: 'Live' },
    { time: '6:00 PM', title: 'Evening Worship', status: 'Upcoming' },
    { time: 'Wed 7:00 PM', title: 'Midweek Bible Study', status: 'Upcoming' },
    { time: 'Fri 8:00 PM', title: 'Youth Encounter', status: 'Upcoming' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-white relative overflow-x-hidden font-sans">
      <LiveStatusPoller currentIsLive={isLive} />
      
      <Navigation />
      
      <main className="flex-1 relative z-10 pb-20">
        
        {/* HERO SECTION: Livestream + Schedule */}
        <div className="relative w-full bg-gradient-to-b from-[#111111] to-[#050505]">
           {/* Background Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#c5a059]/10 blur-[120px] pointer-events-none" />

           <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 pt-6 pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Main Hero Card (Livestream/Featured) - Spans 9 columns */}
                <div className="lg:col-span-9">
                   <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 bg-black aspect-video">
                      {latestStream && isLive ? (
                        <div className="h-full w-full flex flex-col">
                    <VideoPlayer
                      playbackId={latestStream.playbackId ?? latestStream.livepeerStreamId}
                      title={latestStream.title}
                      type="live"
                      showControls={true}
                              autoPlay={true}
                      initialSrc={latestStreamSrc}
                    />
                </div>
              ) : (
                         // Placeholder / Featured Content when NOT live
                         <div className="relative h-full w-full bg-[#111111] flex items-center justify-center overflow-hidden group">
                            {/* Featured Background Image (Placeholder) */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60"></div>
                            
                            <div className="relative z-10 text-center px-4 max-w-3xl">
                               <span className="inline-block py-1 px-3 rounded-full bg-[#c5a059]/20 backdrop-blur-sm text-xs font-bold tracking-wider uppercase mb-4 text-[#c5a059] border border-[#c5a059]/30">
                                  Featured Message
                               </span>
                               <h1 className="text-3xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl tracking-tight">
                                  Endless Celebration
                               </h1>
                               <p className="text-lg md:text-xl text-slate-200 mb-8 font-medium max-w-2xl mx-auto drop-shadow-md">
                                  Leading people to a life of endless celebration in Christ. Watch our latest service now.
                               </p>
                               <div className="flex items-center justify-center gap-4">
                                  <button className="px-8 py-3 bg-[#c5a059] text-black font-bold rounded-md hover:bg-[#e5c07b] transition-colors flex items-center gap-2">
                                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                     Watch Now
                                  </button>
                                  <button className="px-8 py-3 bg-white/5 backdrop-blur-md text-white font-bold rounded-md hover:bg-white/10 transition-colors flex items-center gap-2 border border-white/10">
                                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                     Learn More
                                  </button>
                    </div>
                  </div>
                </div>
              )}

                      {/* Live Indicator overlay if live */}
                      {isLive && (
                         <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600/90 backdrop-blur-md px-3 py-1 rounded-md z-20">
                            <span className="animate-pulse block w-2 h-2 rounded-full bg-white"></span>
                            <span className="text-xs font-bold uppercase tracking-wider text-white">Live Now</span>
                         </div>
                      )}
                   </div>

                   {/* Stream Info Bar */}
                   {latestStream && isLive && (
                      <div className="mt-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10">
                         <h2 className="text-2xl font-bold text-white mb-1">{latestStream.title}</h2>
                         <p className="text-slate-400">{latestStream.description || "Join us for our live broadcast."}</p>
                  </div>
                  )}
                </div>

                {/* Right Side: Schedule / Up Next - Spans 3 columns */}
                <div className="lg:col-span-3 flex flex-col h-[400px] lg:h-full">
                   <div className="bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex-1 flex flex-col overflow-hidden shadow-xl">
                      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                         <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="text-xl">📅</span> Schedule
                         </h3>
                         <Link href="/schedule" className="text-xs text-[#c5a059] hover:text-[#e5c07b] font-medium uppercase tracking-wider">
                            View All
                         </Link>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                         {/* Active Now Item */}
                         {isLive && (
                            <div className="p-3 rounded-lg bg-gradient-to-r from-red-900/40 to-transparent border-l-4 border-red-600 mb-4">
                               <div className="flex justify-between items-start mb-1">
                                  <span className="text-red-400 text-xs font-bold uppercase tracking-wider">On Air</span>
                                  <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Live</span>
                               </div>
                               <h4 className="font-bold text-white text-sm leading-tight">{latestStream?.title}</h4>
                               <p className="text-xs text-slate-400 mt-1 line-clamp-1">{latestStream?.description}</p>
                            </div>
                         )}

                         {/* Schedule Items */}
                         {schedule.map((item, idx) => (
                            <div key={idx} className="group p-3 rounded-lg hover:bg-white/5 transition-colors border-l-4 border-transparent hover:border-[#c5a059]">
                               <div className="flex justify-between items-center mb-1">
                                  <span className="text-slate-400 text-xs font-mono">{item.time}</span>
                                  {item.status === 'Live' && !isLive && ( // Fallback if main player isn't showing live
                                     <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Live</span>
                                  )}
                               </div>
                               <h4 className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">{item.title}</h4>
                            </div>
                         ))}

                         {/* Promo / Giving Card Small */}
                         <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#c5a059]/20 to-[#998045]/20 border border-[#c5a059]/20 text-center">
                            <h4 className="text-[#c5a059] font-bold text-sm mb-2">Support the Ministry</h4>
                            <Link href="/products" className="block w-full py-2 rounded bg-[#c5a059] hover:bg-[#e5c07b] text-xs font-bold text-black transition-colors">
                               Give Now
                            </Link>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
           </div>
                  </div>

        {/* CAROUSEL SECTIONS */}
        <div className="space-y-4 pb-12 -mt-8 relative z-20">
           
           {/* 1. Uploaded Videos */}
           {recentVideos.length > 0 && (
             <VideoCarousel title="Recent Uploads" viewAllLink="/videos">
                {recentVideos.map((video) => (
                   <div key={video.slug} className="min-w-[280px] sm:min-w-[320px] snap-start">
                        <VideoCard
                          id={video.slug}
                          href={`/videos/${video.slug}`}
                          title={video.title}
                          description={video.description}
                          thumbnailUrl={video.thumbnailUrl}
                          priceUsd={video.priceUsd}
                          isFree={video.isFree}
                          status={video.status}
                        />
                      </div>
                    ))}
             </VideoCarousel>
                )}
                
           {/* 2. Worship Experiences */}
           <VideoCarousel title="Worship Experiences">
              {displayWorship.map((video: any) => (
                 <div key={video.slug || video.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
                    <VideoCard
                       id={video.slug || video.id}
                       href={video.slug ? `/videos/${video.slug}` : '#'} 
                       title={video.title}
                       description={video.description}
                       thumbnailUrl={video.thumbnailUrl}
                       priceUsd={video.priceUsd}
                       isFree={video.isFree}
                       status={video.status}
                    />
                  </div>
              ))}
           </VideoCarousel>

           {/* 3. Sermon Series */}
           <VideoCarousel title="Sermon Series">
              {displaySermons.map((video: any) => (
                 <div key={video.slug || video.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
                    <VideoCard
                       id={video.slug || video.id}
                       href={video.slug ? `/videos/${video.slug}` : '#'}
                       title={video.title}
                       description={video.description}
                       thumbnailUrl={video.thumbnailUrl}
                       priceUsd={video.priceUsd}
                       isFree={video.isFree}
                       status={video.status}
                    />
                   </div>
              ))}
           </VideoCarousel>

            {/* 4. Conferences & Events */}
           <VideoCarousel title="Conferences & Events">
              {displayConferences.map((video: any) => (
                 <div key={video.slug || video.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
                    <VideoCard
                       id={video.slug || video.id}
                       href={video.slug ? `/videos/${video.slug}` : '#'}
                       title={video.title}
                       description={video.description}
                       thumbnailUrl={video.thumbnailUrl}
                       priceUsd={video.priceUsd}
                       isFree={video.isFree}
                       status={video.status}
                    />
                      </div>
              ))}
           </VideoCarousel>
           
        </div>
      </main>

      <Footer />
    </div>
  );
}

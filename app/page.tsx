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
  const studioVideos = videos.filter(v => v.category === 'worship'); // Mapped to Studio Sessions
  const musicVideos = videos.filter(v => v.category === 'sermon'); // Mapped to Music Videos
  const liveShowVideos = videos.filter(v => v.category === 'conference'); // Mapped to Live Shows

  // Placeholder Data for "Studio Sessions" (Fallback if no real data)
  const studioPlaceholders = [
    {
      id: 'studio-1',
      title: 'Making of "Trobul"',
      description: 'Behind the scenes of the hit track production.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
    {
      id: 'studio-2',
      title: 'Beat Breakdown: Mona Lisa',
      description: 'Step by step production process.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
    {
      id: 'studio-3',
      title: 'Late Night Vibes',
      description: 'Uncut studio session with the team.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
    {
      id: 'studio-4',
      title: 'Masterclass: Afrobeat Drums',
      description: 'Learn the secrets of the Sarz drum bounce.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519892300165-cb5542fb4747?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 4.99,
      isFree: false,
      status: 'ready'
    },
  ];

  // Placeholder Data for "Music Videos" (Fallback)
  const videoPlaceholders = [
    {
      id: 'mv-1',
      title: 'Sarz x WurlD - Mad',
      description: 'Official Music Video.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
    {
      id: 'mv-2',
      title: 'Sarz x Lojay - Monalisa',
      description: 'Official Music Video.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
    {
      id: 'mv-3',
      title: 'Happiness',
      description: 'Visualizer.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
    {
      id: 'mv-4',
      title: 'Goody Goody',
      description: 'Official Lyric Video.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e3728?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true, 
      status: 'ready'
    },
    {
      id: 'mv-5',
      title: 'Get Up',
      description: 'Flashback Friday.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 9.99,
      isFree: false,
      status: 'ready'
    },
    {
      id: 'mv-6',
      title: 'Celetronic Riddim',
      description: 'Dance video submission.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1547355253-ff0740f6e8c1?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
  ];

  // Placeholder Data for "Live Shows" (Fallback)
  const liveShowPlaceholders = [
    {
      id: 'show-1',
      title: 'Sarz Live in Lagos',
      description: 'The annual headline concert.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 19.99,
      isFree: false,
      status: 'ready'
    },
    {
      id: 'show-2',
      title: 'London Tour Diary',
      description: 'Highlights from the UK tour.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 14.99,
      isFree: false,
      status: 'ready'
    },
    {
      id: 'show-3',
      title: 'NoJusEnemies Concert',
      description: 'Live at the O2 Indigo.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 0,
      isFree: true,
      status: 'ready'
    },
    {
      id: 'show-4',
      title: 'Soundcheck Sessions',
      description: 'Raw audio from the soundcheck.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 29.99,
      isFree: false,
      status: 'ready'
    },
    {
      id: 'show-5',
      title: 'Sarz & Friends',
      description: 'Exclusive jam session.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop',
      priceUsd: 49.99,
      isFree: false,
      status: 'ready'
    },
  ];

  // Combine real data with placeholders if real data is sparse (optional, or just show real data)
  // For now, let's prefer real data, but fallback to placeholders if empty to keep the UI populated
  const displayStudio = studioVideos.length > 0 ? studioVideos : studioPlaceholders;
  const displayMusicVideos = musicVideos.length > 0 ? musicVideos : videoPlaceholders;
  const displayLiveShows = liveShowVideos.length > 0 ? liveShowVideos : liveShowPlaceholders;

  // Mock Schedule Data
  const schedule = [
    { time: '10:00 AM', title: 'Beat Making Masterclass', status: 'Live' },
    { time: '6:00 PM', title: 'Studio Session', status: 'Upcoming' },
    { time: 'Wed 7:00 PM', title: 'Live Q&A with Sarz', status: 'Upcoming' },
    { time: 'Fri 8:00 PM', title: 'Exclusive Mix Release', status: 'Upcoming' },
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
                   <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 bg-black aspect-video group cursor-pointer">
                      {latestStream && isLive ? (
                        <Link href={`/streams/${latestStream.slug}`} className="block h-full w-full relative">
                          <div className="h-full w-full flex flex-col pointer-events-none">
                    <VideoPlayer
                      playbackId={latestStream.playbackId ?? latestStream.livepeerStreamId}
                      title={latestStream.title}
                      type="live"
                              showControls={false}
                              autoPlay={true}
                      initialSrc={latestStreamSrc}
                    />
                          </div>
                          
                          {/* Interactive Overlay */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                             <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 animate-pulse">
                                   <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                                <span className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white font-bold text-sm border border-white/10">
                                   Click to Join Live Experience
                                </span>
                             </div>
                          </div>

                          {/* Mobile-friendly visible overlay (always visible on small screens if needed, but hover works on touch usually as tap) */}
                          <div className="absolute inset-0 flex items-center justify-center md:hidden">
                             <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
                        </Link>
              ) : (
                         // Placeholder / Featured Content when NOT live
                         <div className="relative h-full w-full bg-[#111111] flex items-center justify-center overflow-hidden group min-h-[300px]">
                            {/* Featured Background Image (Placeholder) */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60"></div>
                            
                            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
                               <span className="inline-block py-1.5 px-3 sm:px-4 rounded-full bg-[#c5a059]/20 backdrop-blur-sm text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 sm:mb-6 text-[#c5a059] border border-[#c5a059]/30">
                                  New Release
                               </span>
                               <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 drop-shadow-2xl tracking-tight px-2">
                                  Sarz: The Producer
                               </h1>
                               <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 mb-6 sm:mb-8 font-medium max-w-2xl mx-auto drop-shadow-md px-2">
                                  Experience the creative process behind the hits. Watch the exclusive documentary now.
                               </p>
                               <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4">
                                  <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#c5a059] text-black font-bold rounded-md hover:bg-[#e5c07b] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                                     <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                     Watch Now
                                  </button>
                                  <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-white/5 backdrop-blur-md text-white font-bold rounded-md hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/10 text-sm sm:text-base">
                                     <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
                            <h4 className="text-[#c5a059] font-bold text-sm mb-2">Exclusive Beats & Merch</h4>
                            <Link href="/products" className="block w-full py-2 rounded bg-[#c5a059] hover:bg-[#e5c07b] text-xs font-bold text-black transition-colors">
                               Visit Store
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
                
           {/* 2. Worship Experiences -> Studio Sessions */}
           <VideoCarousel title="Studio Sessions">
              {displayStudio.map((video: any) => (
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

           {/* 3. Sermon Series -> Music Videos */}
           <VideoCarousel title="Music Videos">
              {displayMusicVideos.map((video: any) => (
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

            {/* 4. Conferences & Events -> Live Shows */}
           <VideoCarousel title="Live Shows">
              {displayLiveShows.map((video: any) => (
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

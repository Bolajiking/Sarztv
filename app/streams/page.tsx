import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getLivepeerStreams, getRecordedSessions } from '@/lib/video/livepeer-data';
import Link from 'next/link';
import { VideoPlayer } from '@/components/video-player';
import { getPlaybackSrc } from '@/lib/video/livepeer-utils';
import { LiveStatusPoller } from '@/components/live-status-poller';

// Force dynamic rendering since we fetch live stream data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function StreamsPage() {
  const streams = await getLivepeerStreams();
  const activeStream = streams.find((stream) => stream.isActive && stream.playbackId);
  const isLive = Boolean(activeStream);
  
  // Fetch recorded sessions that are NOT managed in the videos table
  // These are the raw recordings from past livestreams
  const recordedSessions = await getRecordedSessions(12);
  
  const activeStreamSrc =
    activeStream?.playbackId ? await getPlaybackSrc(activeStream.playbackId) : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] relative overflow-hidden">
       <LiveStatusPoller currentIsLive={isLive} />
       {/* Subtle background elements */}
       <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#c5a059] rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-red-500 rounded-full filter blur-[128px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <Navigation />
      
      <main className="flex-1 relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-black text-white flex items-center justify-center gap-4 drop-shadow-lg">
              <span className="text-6xl">📡</span>
              Live Services
            </h1>
            <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">
              Join us for worship, teaching, and community in real-time.
            </p>
          </div>

          {!activeStream ? (
            <div className="rounded-2xl border border-white/10 bg-[#111111]/50 backdrop-blur-sm p-12 text-center shadow-2xl max-w-4xl mx-auto">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-[#c5a059] to-red-500 opacity-20 blur-xl rounded-full"></div>
              <svg
                  className="relative mx-auto h-16 w-16 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                    strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-white">
                No live services at the moment
              </h3>
              <p className="mt-3 text-lg text-slate-400">
                Join us for our next scheduled service.
              </p>
            </div>
          ) : (
            <div className="mb-12 rounded-2xl border border-[#c5a059]/30 bg-[#111111]/60 backdrop-blur-md p-6 shadow-2xl shadow-[#c5a059]/10">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                    <span className="text-sm font-bold text-red-400 uppercase tracking-wider">
                      Live Service Now
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-white">{activeStream.title}</h2>
                  {activeStream.description && (
                    <p className="mt-2 text-slate-300 font-medium">{activeStream.description}</p>
                  )}
                </div>
                <Link
                  href={`/streams/${activeStream.slug}`}
                  className="px-8 py-3 rounded-full font-bold text-black bg-gradient-to-r from-[#c5a059] to-[#e5c07b] hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-[#c5a059]/20 uppercase tracking-wide border-2 border-white/10"
                >
                  Join Service →
                </Link>
              </div>
              <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <VideoPlayer
                  playbackId={activeStream.playbackId ?? activeStream.livepeerStreamId}
                  title={activeStream.title}
                  type="live"
                  showControls
                  initialSrc={activeStreamSrc}
                />
              </div>
            </div>
          )}

          <div className="mt-16">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <span className="text-4xl">⏪</span>
                  Past Services
                </h2>
                <p className="mt-2 text-slate-400">
                  Watch replays of our previous gatherings
                </p>
              </div>
            </div>

            {recordedSessions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 bg-white/5 p-12 text-center">
                <p className="text-slate-400 font-medium">
                  No recorded sessions available yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {recordedSessions.map((session) => (
                  <Link
                    key={session.slug}
                    href={`/streams/${session.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-[#111111] border border-white/10 shadow-lg hover:shadow-[#c5a059]/20 transition-all duration-500 hover:scale-[1.03] hover:border-[#c5a059]/40">
                      <div className="relative aspect-video w-full bg-black overflow-hidden">
                      {!session.isFree && (
                          <div className="absolute right-3 top-3 rounded-lg bg-[#c5a059] px-3 py-1.5 text-xs font-bold text-black shadow-lg z-20">
                          ${session.priceUsd.toFixed(2)}
                        </div>
                      )}
                      {session.thumbnailUrl ? (
                         <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url(${session.thumbnailUrl})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                        </div>
                      ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#1a1a1a] relative">
                             <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/5 to-white/5"></div>
                             <svg
                                className="h-12 w-12 text-white/10 group-hover:text-white/30 transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                        </div>
                      )}
                      
                      {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-500 opacity-0 group-hover:opacity-100">
                          <div className="w-16 h-16 rounded-full bg-[#c5a059]/80 backdrop-blur-md flex items-center justify-center ring-1 ring-white/20 transform scale-75 group-hover:scale-100 transition-all duration-500 shadow-xl">
                            <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                      <div className="p-5 bg-[#111111]">
                        <h3 className="line-clamp-2 text-lg font-bold text-white group-hover:text-[#c5a059] transition-colors duration-300">
                        {session.title}
                      </h3>
                      {session.createdAt && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wider font-semibold">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(session.createdAt).toLocaleDateString()}
                          </div>
                      )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

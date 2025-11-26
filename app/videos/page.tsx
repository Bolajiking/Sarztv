import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { VideoCard } from '@/components/video-card';
import { getLivepeerVideos } from '@/lib/video/livepeer-data';

export default async function VideosPage() {
  const videos = await getLivepeerVideos(48);

  return (
    <div className="flex min-h-screen flex-col bg-[#050505] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#c5a059] rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-white rounded-full filter blur-[128px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <Navigation />
      
      <main className="flex-1 relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-black text-white flex items-center justify-center gap-4 drop-shadow-lg">
              <span className="text-4xl md:text-6xl">🎬</span>
              Video Library
            </h1>
            <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">
              Explore our premium collection of exclusive sermons, worship moments, and inspiring content.
            </p>
          </div>

          {videos.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-[#111111]/50 backdrop-blur-sm p-16 text-center shadow-2xl">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-[#c5a059] to-[#e5c07b] opacity-20 blur-xl rounded-full"></div>
                <svg
                  className="relative mx-auto h-20 w-20 text-slate-500"
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
                Library is empty
              </h3>
              <p className="mt-3 text-base text-slate-400">
                New productions and messages will be premiered here soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
              {videos.map((video, index) => (
                <div
                  key={video.slug}
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    opacity: 0,
                  }}
                >
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
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

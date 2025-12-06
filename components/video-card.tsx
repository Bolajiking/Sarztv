import Link from 'next/link';
import Image from 'next/image';

interface VideoCardProps {
  id: string;
  href?: string;
  title: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  priceUsd?: number;
  isFree?: boolean;
  status?: string;
  compact?: boolean;
}

export function VideoCard({
  id,
  href,
  title,
  description,
  thumbnailUrl,
  priceUsd = 0,
  isFree = true,
  status,
  compact = false,
}: VideoCardProps) {
  // Don't show videos that aren't ready
  if (status !== 'ready') {
    return null;
  }

  // Determine if access is granted (simulated for demo)
  const isAccessGranted = isFree;

  return (
    <Link href={href ?? `/videos/${id}`} className="group block">
      <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#111111] to-black border border-white/10 shadow-lg hover:shadow-[#c5a059]/20 transition-all duration-500 hover:scale-[1.03] hover:border-[#c5a059]/40 hover:z-10 ${compact ? 'flex flex-row h-24' : ''}`}>
        
        <div className={`relative ${compact ? 'w-40 h-full' : 'aspect-video w-full'} bg-[#1a1a1a] overflow-hidden flex-shrink-0`}>
          {thumbnailUrl ? (
            thumbnailUrl.startsWith('data:') ? (
              // Use regular img tag for base64 data URLs
              <img
                src={thumbnailUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
            ) : (
              // Use Next.js Image for remote URLs
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            )
          ) : (
            <div className="flex h-full items-center justify-center relative bg-[#1a1a1a]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/10 to-[#e5c07b]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <svg
                className="relative h-16 w-16 text-white/20 group-hover:text-[#c5a059]/40 transition-all duration-500 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
          
          {/* Play button overlay or Lock overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-500 opacity-0 group-hover:opacity-100">
            <div className={`w-16 h-16 rounded-full ${isAccessGranted ? 'bg-[#c5a059]/80' : 'bg-black/80'} backdrop-blur-md flex items-center justify-center ring-1 ring-white/20 transform scale-75 group-hover:scale-100 transition-all duration-500 shadow-xl`}>
              {isAccessGranted ? (
                <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              ) : (
                 <svg className="w-8 h-8 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
              )}
            </div>
          </div>
          
          {!isFree && (
            <div className="absolute right-3 top-3 rounded-lg bg-[#c5a059] px-3 py-1.5 text-xs font-bold text-black shadow-lg z-20 flex items-center gap-1">
              {!isAccessGranted && (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
              ${priceUsd.toFixed(2)}
            </div>
          )}
        </div>
        
        {/* Content panel */}
        <div className={`${compact ? 'p-3 flex-1 flex flex-col justify-between' : 'p-5'} relative z-20 bg-[#111111]`}>
          <h3 className={`${compact ? 'text-sm line-clamp-2 leading-tight' : 'text-lg line-clamp-2'} font-bold text-white group-hover:text-[#c5a059] transition-colors duration-300 mb-2`}>
            {title}
          </h3>
          
          {!compact && description && (
            <p className="text-sm text-slate-400 line-clamp-2 mb-4 group-hover:text-slate-300 transition-colors">
                {description}
              </p>
            )}
            
          {/* Footer info */}
          <div className={`flex items-center justify-between text-xs text-slate-500 ${compact ? '' : 'border-t border-white/5 pt-3'}`}>
            {!compact && (
              <span className="flex items-center gap-1 uppercase tracking-wider font-semibold">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Video
              </span>
            )}
            {isFree ? (
              <span className={`px-2 py-0.5 bg-[#c5a059]/10 text-[#c5a059] rounded font-bold ${compact ? 'text-[10px]' : ''}`}>
                  FREE
                </span>
            ) : (
              <span className={`px-2 py-0.5 bg-white/10 text-white rounded font-bold ${compact ? 'text-[10px]' : ''}`}>
                PREMIUM
              </span>
              )}
          </div>
        </div>
      </div>
    </Link>
  );
}

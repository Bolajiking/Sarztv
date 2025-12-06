'use client';

import { useState } from 'react';
import { VideoPlayer } from '@/components/video-player';
import { ProductCheckoutModal } from '@/components/product-checkout-modal';
import Image from 'next/image';
import type { LivepeerVideoRecord } from '@/lib/video/livepeer-data';
import type { Src } from '@livepeer/react';

interface VideoAccessManagerProps {
    video: LivepeerVideoRecord;
    playbackSrc: Src[] | null;
    hasAccess: boolean;
}

export function VideoAccessManager({ video, playbackSrc, hasAccess }: VideoAccessManagerProps) {
    const [showCheckout, setShowCheckout] = useState(false);

    // If user has access, show the player
    if (hasAccess) {
        return (
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
        );
    }

    // Otherwise, show the paywall
    return (
        <>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 bg-black aspect-video group">
                {/* Blurred Background Image */}
                {video.thumbnailUrl && (
                    <div className="absolute inset-0 z-0">
                         <Image
                            src={video.thumbnailUrl}
                            alt={video.title}
                            fill
                            className="object-cover blur-md opacity-50"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                    </div>
                )}

                {/* Lock Overlay Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                     <div className="w-20 h-20 bg-[#c5a059]/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm ring-1 ring-[#c5a059]/30">
                        <svg className="w-10 h-10 text-[#c5a059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                     </div>
                     
                     <h2 className="text-3xl font-black text-white mb-2">Premium Content</h2>
                     <p className="text-slate-300 max-w-md mb-8 text-lg">
                        Unlock full access to this exclusive video and support the artist directly.
                     </p>
                     
                     <button 
                        onClick={() => setShowCheckout(true)}
                        className="px-8 py-4 bg-[#c5a059] hover:bg-[#e5c07b] text-black font-bold rounded-full transition-all transform hover:scale-105 shadow-xl shadow-[#c5a059]/20 flex items-center gap-2"
                    >
                        <span>Unlock for ${video.priceUsd.toFixed(2)}</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                     </button>
                     
                     <p className="mt-4 text-xs text-slate-500 uppercase tracking-widest font-semibold">
                        Secure Payment • Instant Access
                     </p>
                </div>
            </div>

            <ProductCheckoutModal 
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
                product={{
                    id: video.slug,
                    title: video.title,
                    price: `$${video.priceUsd.toFixed(2)}`,
                    description: video.description || 'Premium Video Access',
                    emoji: '🎬',
                    type: 'digital'
                }}
            />
        </>
    );
}


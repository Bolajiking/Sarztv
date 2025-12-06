'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth/use-auth';
import { BroadcastPlayer } from './broadcast-player';

interface StreamCreateFormProps {
  onSuccess?: (stream: {
    streamId: string;
    rtmpUrl: string;
    streamKey: string;
    playbackId: string | null;
  }) => void;
}

export function StreamCreateForm({ onSuccess }: StreamCreateFormProps) {
  const { userId } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '0',
    isFree: true,
    recordEnabled: true,
  });
  const [loading, setLoading] = useState(false);
  const [streamData, setStreamData] = useState<{
    streamId: string;
    rtmpUrl: string;
    streamKey: string;
    playbackId: string | null;
    title?: string;
  } | null>(null);

  async function createStream() {
    if (!formData.title.trim()) {
      alert('Please enter a stream title');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/streams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(userId ? { 'x-user-id': userId } : {}),
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim() || null,
          price: parseFloat(formData.price) || 0,
          isFree: formData.isFree,
          recordEnabled: formData.recordEnabled,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create stream');
      }

      const result = await response.json();
      const data = {
        streamId: result.streamId,
        rtmpUrl: result.rtmpUrl,
        streamKey: result.streamKey,
        playbackId: result.playbackId ?? null,
        title: formData.title,
      };
      setStreamData(data);
      onSuccess?.(data);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create stream');
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="space-y-6">
      {!streamData ? (
        <>
          <div className="space-y-4">
            <div>
              <label htmlFor="stream-title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="stream-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-black shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white dark:focus:ring-white"
                placeholder="Enter stream title"
                required
              />
            </div>

            <div>
              <label htmlFor="stream-description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Description
              </label>
              <textarea
                id="stream-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-black shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white dark:focus:ring-white"
                placeholder="Enter stream description"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="stream-is-free"
                  checked={formData.isFree}
                  onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                  className="h-4 w-4 rounded border-zinc-300 text-black focus:ring-black dark:border-zinc-700 dark:focus:ring-white"
                />
                <label htmlFor="stream-is-free" className="ml-2 text-sm text-zinc-700 dark:text-zinc-300">
                  Free stream
                </label>
              </div>

              {!formData.isFree && (
                <div className="flex-1">
                  <label htmlFor="stream-price" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    id="stream-price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-black shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white dark:focus:ring-white"
                    placeholder="0.00"
                  />
                </div>
              )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="stream-record-enabled"
                  checked={formData.recordEnabled}
                  onChange={(e) => setFormData({ ...formData, recordEnabled: e.target.checked })}
                  className="h-4 w-4 rounded border-zinc-300 text-black focus:ring-black dark:border-zinc-700 dark:focus:ring-white"
                />
                <label htmlFor="stream-record-enabled" className="ml-2 text-sm text-zinc-700 dark:text-zinc-300">
                  Record this session (saves a VOD for replay)
                </label>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                When enabled, SARZ TV will capture the broadcast and create a replay automatically.
              </p>
            </div>
          </div>

          <button
            onClick={createStream}
            disabled={loading}
            className="rounded-md bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {loading ? 'Creating Stream...' : 'Create Stream'}
          </button>
        </>
      ) : (
        <div className="space-y-8">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
            Stream created successfully! You can broadcast directly from your browser below, or use OBS with the credentials provided.
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-black dark:text-white">Broadcast Now</h3>
            <BroadcastPlayer 
              streamKey={streamData.streamKey} 
              title={streamData.title}
            />
          </div>

          <div className="space-y-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-black dark:text-white">Stream Settings (OBS / External)</h3>
            
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                RTMP URL (Server)
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={streamData.rtmpUrl}
                  className="flex-1 rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 font-mono text-sm text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
                <button
                  onClick={() => copyToClipboard(streamData.rtmpUrl)}
                  className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Copy
                </button>
              </div>
              <p className="mt-1 text-xs text-red-500 font-medium">
                Note: If OBS fails to connect, ensure port 1935 is open on your network.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Stream Key
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={streamData.streamKey}
                  className="flex-1 rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 font-mono text-sm text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
                <button
                  onClick={() => copyToClipboard(streamData.streamKey)}
                  className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  Copy
                </button>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                Keep this key secret! Do not share it publicly.
              </p>
            </div>

            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <h3 className="mb-3 text-sm font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Recommended Encoder Settings (OBS/Wirecast)
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                Use these settings to ensure high-quality playback and avoid warnings.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-800 dark:text-blue-200 mb-3">
                <li className="flex items-center gap-2 bg-white/50 dark:bg-black/20 p-2 rounded">
                  <span className="font-bold min-w-[80px]">Keyframe Interval:</span> 
                  <span>2 seconds (or GOP = 2s)</span>
                </li>
                <li className="flex items-center gap-2 bg-white/50 dark:bg-black/20 p-2 rounded">
                  <span className="font-bold min-w-[80px]">Rate Control:</span> 
                  <span>CBR (Constant Bitrate)</span>
                </li>
                <li className="flex items-center gap-2 bg-white/50 dark:bg-black/20 p-2 rounded">
                  <span className="font-bold min-w-[80px]">Profile:</span> 
                  <span>High or Main</span>
                </li>
                <li className="flex items-center gap-2 bg-white/50 dark:bg-black/20 p-2 rounded">
                  <span className="font-bold min-w-[80px]">Tune:</span> 
                  <span>Zerolatency (optional)</span>
                </li>
              </ul>
              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 mb-2">Bitrate Guidelines (Prevents Jitter):</p>
                <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• <strong>10+ Mbps upload:</strong> 4000-6000 Kbps @ 1080p</li>
                  <li>• <strong>5-8 Mbps upload:</strong> 3000 Kbps @ 720p</li>
                  <li>• <strong>3-5 Mbps upload:</strong> 2500 Kbps @ 720p</li>
                  <li>• <strong>Rule:</strong> Bitrate = 60-70% of your upload speed</li>
                </ul>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 italic">
                  If you see "jitter" warnings, lower your bitrate by 500-1000 Kbps.
                </p>
              </div>
            </div>

            <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-900">
              <h3 className="mb-2 text-sm font-semibold text-black dark:text-white">
                How to stream
              </h3>
              <ol className="list-decimal space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                <li>Use the <strong>Broadcast Now</strong> player above to stream directly from your browser.</li>
                <li>OR use external software (OBS):
                  <ul className="list-disc pl-5 mt-1 text-zinc-500">
                    <li>Open OBS and go to <strong>Settings → Stream</strong>.</li>
                    <li>Paste the RTMP URL and Stream Key above.</li>
                    <li><strong>Add Sources:</strong> Click (+) in Sources to add "Video Capture Device" (Camera) and "Audio Input Capture" (Mic).</li>
                    <li><strong>IMPORTANT:</strong> Configure Output settings as shown in the blue box.</li>
                    <li>Click “Start Streaming”.</li>
                  </ul>
                </li>
              </ol>
            </div>

            <div className="pt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Stream ID: {streamData.streamId}
            </div>
            
            <div className="pt-4">
               <button
                onClick={() => setStreamData(null)}
                className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                ← Create another stream
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

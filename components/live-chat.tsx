'use client';

import React, { useState, useEffect, useRef } from 'react';

export function LiveChat() {
  const [messages, setMessages] = useState<{ id: string; user: string; text: string; color: string }[]>([
    { id: '1', user: 'Grace', text: 'Good morning everyone! 🙏', color: 'text-[#e5c07b]' },
    { id: '2', user: 'John', text: 'Ready for the word today.', color: 'text-blue-400' },
    { id: '3', user: 'Sarah', text: 'Hallelujah!', color: 'text-[#c5a059]' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      const mockMessages = [
        { user: 'David', text: 'Amen! 🙌', color: 'text-green-400' },
        { user: 'Esther', text: 'So powerful.', color: 'text-[#e5c07b]' },
        { user: 'Michael', text: 'Greetings from London!', color: 'text-orange-400' },
        { user: 'Rebecca', text: 'Thank you for this message.', color: 'text-cyan-400' },
        { user: 'James', text: 'Can we get the scripture reference?', color: 'text-red-400' },
        { user: 'Mary', text: '🙏 blessed', color: 'text-[#c5a059]' },
      ];
      
      const randomMsg = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      
      setMessages(prev => {
        // Keep chat history manageable
        const newHistory = [...prev, { id: Date.now().toString(), ...randomMsg }];
        return newHistory.slice(-50);
      });
    }, 5000); // New message every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      user: 'You',
      text: newMessage,
      color: 'text-white'
    }]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-[#111111]/50 rounded-xl border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <h3 className="font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          Live Chat
        </h3>
        <span className="text-xs text-zinc-500 font-mono">1.2k online</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col animate-fade-in-up">
            <span className={`text-xs font-bold ${msg.color} mb-0.5`}>{msg.user}</span>
            <p className="text-sm text-slate-300 break-words leading-relaxed">{msg.text}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/40">
        <div className="relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Say something..."
            className="w-full bg-zinc-800/50 border border-white/10 rounded-full py-2.5 pl-4 pr-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#c5a059]/50 focus:ring-1 focus:ring-[#c5a059]/50 transition-all"
          />
          <button 
            type="submit"
            className="absolute right-1.5 top-1.5 p-1.5 bg-[#c5a059] rounded-full text-black hover:bg-[#e5c07b] transition-colors disabled:opacity-50"
            disabled={!newMessage.trim()}
          >
            <svg className="w-3 h-3 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

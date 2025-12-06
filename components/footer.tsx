import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c5a059] rounded-full filter blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-[128px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-black flex items-center gap-2">
              <span className="text-3xl">🎹</span>
              <span className="gradient-text">SARZ TV</span>
            </h3>
            <p className="mt-4 text-base text-slate-400 leading-relaxed max-w-md">
              The official streaming platform for Sarz. Exclusive beats, behind-the-scenes, live sessions, and more from the legendary producer.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center hover:bg-[#c5a059] hover:scale-110 transform transition-all duration-300 border border-white/10 group">
                <span className="text-white font-bold group-hover:text-black">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center hover:bg-[#c5a059] hover:scale-110 transform transition-all duration-300 border border-white/10 group">
                <span className="text-white font-bold group-hover:text-black">IG</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center hover:bg-[#c5a059] hover:scale-110 transform transition-all duration-300 border border-white/10 group">
                <span className="text-white font-bold group-hover:text-black">YT</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/videos" className="text-slate-400 hover:text-[#c5a059] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/streams" className="text-slate-400 hover:text-[#c5a059] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Live Sessions
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-400 hover:text-[#c5a059] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Store
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Account</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/profile" className="text-slate-400 hover:text-[#c5a059] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-[#c5a059] transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} SARZ TV. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-slate-500">
              <a href="#" className="hover:text-[#c5a059] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#c5a059] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#c5a059] transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

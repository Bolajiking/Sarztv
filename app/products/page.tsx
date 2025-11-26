'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ProductCheckoutModal, Product } from '@/components/product-checkout-modal';
import { useState } from 'react';

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handlePurchase = (product: Product) => {
    setSelectedProduct(product);
  };

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
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
              Ministry Hub
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Equipping the saints with resources for growth, outreach, and daily living.
            </p>
          </div>

          {/* Store Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
             {/* Category 1: Digital Resources */}
             <div className="group relative overflow-hidden rounded-2xl bg-[#111111] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#c5a059]/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-8 text-center">
                   <div className="w-16 h-16 mx-auto bg-[#c5a059]/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">📚</span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">E-Books & Guides</h3>
                   <p className="text-slate-400 text-sm mb-6">
                      Digital devotionals, study guides, and theological resources for your personal walk.
                   </p>
                   <button className="px-6 py-2 rounded-full bg-white/5 hover:bg-[#c5a059] hover:text-black text-white font-semibold text-sm transition-colors border border-white/10">
                      Browse Library
                   </button>
                </div>
             </div>

             {/* Category 2: Merch & Apparel */}
             <div className="group relative overflow-hidden rounded-2xl bg-[#111111] border border-white/10 hover:border-[#e5c07b]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#e5c07b]/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e5c07b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-8 text-center">
                   <div className="w-16 h-16 mx-auto bg-[#e5c07b]/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">👕</span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">Kingdom Apparel</h3>
                   <p className="text-slate-400 text-sm mb-6">
                      Wear your faith. High-quality shirts, hoodies, and accessories that spark conversation.
                   </p>
                   <button className="px-6 py-2 rounded-full bg-white/5 hover:bg-[#e5c07b] hover:text-black text-white font-semibold text-sm transition-colors border border-white/10">
                      Shop Collection
                   </button>
                </div>
             </div>

             {/* Category 3: Partner Products */}
             <div className="group relative overflow-hidden rounded-2xl bg-[#111111] border border-white/10 hover:border-[#998045]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#998045]/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#998045]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-8 text-center">
                   <div className="w-16 h-16 mx-auto bg-[#998045]/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="text-3xl">🤝</span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">Partner Resources</h3>
                   <p className="text-slate-400 text-sm mb-6">
                      Curated tools and materials from our ministry partners and trusted authors.
            </p>
                   <button className="px-6 py-2 rounded-full bg-white/5 hover:bg-[#998045] hover:text-black text-white font-semibold text-sm transition-colors border border-white/10">
                      View Partners
                   </button>
                </div>
             </div>
          </div>

          {/* Featured Items Grid (Placeholder) */}
          <div className="mb-12">
             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-[#c5a059]">✨</span> Featured Resources
             </h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Product Card 1 */}
                <div className="group bg-[#111111] rounded-xl overflow-hidden border border-white/5 hover:border-[#c5a059]/30 transition-all">
                   <div className="aspect-square bg-[#1a1a1a] relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-6xl bg-[#1a1a1a] group-hover:scale-110 transition-transform duration-500">
                         📖
                      </div>
                      <div className="absolute top-3 right-3 bg-[#c5a059] text-black text-xs font-bold px-2 py-1 rounded">
                         NEW
                      </div>
                   </div>
                   <div className="p-4">
                      <h4 className="text-white font-bold mb-1">Daily Walk Devotional</h4>
                      <p className="text-slate-400 text-xs mb-3">365 Days of Inspiration</p>
                      <div className="flex items-center justify-between">
                         <span className="text-white font-bold">$14.99</span>
                         <button 
                           onClick={() => handlePurchase({
                             id: '1',
                             title: 'Daily Walk Devotional',
                             price: '$14.99',
                             description: '365 Days of Inspiration',
                             emoji: '📖',
                             type: 'digital'
                           })}
                           className="text-xs bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#c5a059] hover:text-black px-3 py-1.5 rounded transition-colors font-bold"
                         >
                            Add to Cart
                         </button>
                      </div>
                   </div>
                </div>

                {/* Product Card 2 */}
                <div className="group bg-[#111111] rounded-xl overflow-hidden border border-white/5 hover:border-[#c5a059]/30 transition-all">
                   <div className="aspect-square bg-[#1a1a1a] relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-6xl bg-[#1a1a1a] group-hover:scale-110 transition-transform duration-500">
                         👕
                      </div>
                   </div>
                   <div className="p-4">
                      <h4 className="text-white font-bold mb-1">Faith Over Fear Tee</h4>
                      <p className="text-slate-400 text-xs mb-3">Premium Cotton Blend</p>
                      <div className="flex items-center justify-between">
                         <span className="text-white font-bold">$24.99</span>
                         <button 
                           onClick={() => handlePurchase({
                             id: '2',
                             title: 'Faith Over Fear Tee',
                             price: '$24.99',
                             description: 'Premium Cotton Blend',
                             emoji: '👕',
                             type: 'physical'
                           })}
                           className="text-xs bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#c5a059] hover:text-black px-3 py-1.5 rounded transition-colors font-bold"
                         >
                            Add to Cart
                         </button>
                      </div>
                   </div>
                </div>

                {/* Product Card 3 */}
                <div className="group bg-[#111111] rounded-xl overflow-hidden border border-white/5 hover:border-[#c5a059]/30 transition-all">
                   <div className="aspect-square bg-[#1a1a1a] relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-6xl bg-[#1a1a1a] group-hover:scale-110 transition-transform duration-500">
                         📓
                      </div>
                   </div>
                   <div className="p-4">
                      <h4 className="text-white font-bold mb-1">Sermon Notes Journal</h4>
                      <p className="text-slate-400 text-xs mb-3">Leather-bound</p>
                      <div className="flex items-center justify-between">
                         <span className="text-white font-bold">$19.99</span>
                         <button 
                           onClick={() => handlePurchase({
                             id: '3',
                             title: 'Sermon Notes Journal',
                             price: '$19.99',
                             description: 'Leather-bound',
                             emoji: '📓',
                             type: 'physical'
                           })}
                           className="text-xs bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#c5a059] hover:text-black px-3 py-1.5 rounded transition-colors font-bold"
                         >
                            Add to Cart
                         </button>
                      </div>
                   </div>
                </div>

                {/* Product Card 4 */}
                <div className="group bg-[#111111] rounded-xl overflow-hidden border border-white/5 hover:border-[#c5a059]/30 transition-all">
                   <div className="aspect-square bg-[#1a1a1a] relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-6xl bg-[#1a1a1a] group-hover:scale-110 transition-transform duration-500">
                         💿
                      </div>
                   </div>
                   <div className="p-4">
                      <h4 className="text-white font-bold mb-1">Worship Album Vol. 1</h4>
                      <p className="text-slate-400 text-xs mb-3">Digital Download</p>
                      <div className="flex items-center justify-between">
                         <span className="text-white font-bold">$9.99</span>
                         <button 
                           onClick={() => handlePurchase({
                             id: '4',
                             title: 'Worship Album Vol. 1',
                             price: '$9.99',
                             description: 'Digital Download',
                             emoji: '💿',
                             type: 'digital'
                           })}
                           className="text-xs bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#c5a059] hover:text-black px-3 py-1.5 rounded transition-colors font-bold"
                         >
                            Add to Cart
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Call to Action */}
          <div className="rounded-2xl bg-gradient-to-r from-[#c5a059]/20 to-[#998045]/20 border border-[#c5a059]/20 p-8 text-center relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Become a Ministry Partner</h3>
                <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                   Join our community of monthly supporters and get exclusive access to premium resources and early product releases.
                </p>
                <button className="px-8 py-3 rounded-full bg-[#c5a059] text-black font-bold hover:bg-[#e5c07b] transition-colors">
                   Learn More
                </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* Checkout Modal */}
      <ProductCheckoutModal 
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </div>
  );
}

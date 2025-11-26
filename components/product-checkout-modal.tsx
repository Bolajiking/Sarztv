'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  image?: string; // Optional if using emoji placeholders
  emoji?: string; // For existing placeholder style
  type: 'digital' | 'physical';
}

interface ProductCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export function ProductCheckoutModal({ isOpen, onClose, product }: ProductCheckoutModalProps) {
  const [step, setStep] = useState<'summary' | 'processing' | 'success'>('summary');

  useEffect(() => {
    if (isOpen) {
      setStep('summary');
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-2xl transition-all">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {step === 'summary' && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-white">Checkout</h2>
                <p className="text-slate-400 text-sm mt-1">Complete your purchase securely</p>
              </div>

              {/* Product Preview */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-lg bg-slate-700 flex items-center justify-center text-3xl flex-shrink-0">
                  {product.emoji || '📦'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{product.title}</h3>
                  <p className="text-xs text-slate-400 truncate">{product.description}</p>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-white">{product.price}</span>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-3">
                <button 
                  onClick={handlePayment}
                  className="w-full py-3.5 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-lg"
                >
                  <span className="text-xl"></span> Pay
                </button>
                <button 
                  onClick={handlePayment}
                  className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
                >
                  Pay with Card
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Encrypted & Secure Payment
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center animate-fade-in-up">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Processing Payment</h3>
              <p className="text-slate-400">Please wait while we confirm your order...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center animate-fade-in-up">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Order Confirmed!</h3>
              <p className="text-slate-400 mb-8 max-w-xs mx-auto">
                Thank you for your purchase. A confirmation email has been sent to you.
              </p>
              
              {product.type === 'digital' ? (
                <button 
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Now
                </button>
              ) : (
                <button 
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors border border-white/10"
                >
                  View Order Details
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


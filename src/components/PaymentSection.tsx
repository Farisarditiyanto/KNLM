import React, { useState, useCallback, Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

const PaymentMethod = lazy(() => import('./PaymentMethod'));

export default function PaymentSection() {
  const [activePayments, setActivePayments] = useState<string[]>([]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isQrisLoaded, setIsQrisLoaded] = useState(false);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1000);
  }, []);

  const togglePayment = useCallback((method: string) => {
    setActivePayments(prev => 
      prev.includes(method) ? prev.filter(p => p !== method) : [...prev, method]
    );
  }, []);

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 text-sm tracking-widest uppercase items-start">
      <Suspense fallback={<div className="h-24 border border-neutral-800 animate-pulse"></div>}>
        {/* Transfer Bank */}
        <PaymentMethod id="transfer" title="TRANSFER BANK" isActive={activePayments.includes('transfer')} onToggle={togglePayment}>
          <div className="flex flex-col items-center text-center">
            <span className="text-xs opacity-50 mb-1">BSI</span>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg">7207 6635 08</span>
              <button 
                onClick={() => handleCopy('7207663508')} 
                className="text-[10px] border px-2 py-1 transition-colors border-neutral-700 hover:bg-white hover:text-black"
              >
                {copiedText === '7207663508' ? 'TERSALIN' : 'SALIN'}
              </button>
            </div>
            <span className="text-xs opacity-50">A.N. MUHAMMAD FARIS ARDITIYANTO</span>
          </div>
        </PaymentMethod>

        {/* E-Wallet */}
        <PaymentMethod id="ewallet" title="E-WALLET" isActive={activePayments.includes('ewallet')} onToggle={togglePayment}>
          <div className="flex flex-col items-center text-center">
            <span className="text-xs opacity-50 mb-1">GOPAY / OVO / SHOPEEPAY</span>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-lg">0851 6255 7434</span>
              <button 
                onClick={() => handleCopy('085162557434')} 
                className="text-[10px] border px-2 py-1 transition-colors border-neutral-700 hover:bg-white hover:text-black"
              >
                {copiedText === '085162557434' ? 'TERSALIN' : 'SALIN'}
              </button>
            </div>
            <span className="text-xs opacity-50">A.N. MUHAMMAD FARIS ARDITIYANTO</span>
          </div>
        </PaymentMethod>

        {/* QRIS */}
        <PaymentMethod id="qris" title="QRIS" isActive={activePayments.includes('qris')} onToggle={togglePayment}>
          <div className="w-32 h-32 border flex items-center justify-center border-neutral-700 bg-neutral-900 overflow-hidden relative">
            {!isQrisLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-neutral-500" />
              </div>
            )}
            <img 
              src="https://i.postimg.cc/bYD95cp9/Whats_App_Image_2026_03_27_at_10_07_31.webp" 
              alt="QRIS Kutayb NLM" 
              referrerPolicy="no-referrer"
              className={`w-full h-full object-contain transition-opacity duration-300 ${isQrisLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsQrisLoaded(true)}
              onError={(e) => {
                setIsQrisLoaded(true);
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="text-xs opacity-50 hidden absolute">[ GAMBAR QRIS ]</span>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold tracking-widest">A.N. BUTIK UMYAS</span>
              <span className="text-xs opacity-50 tracking-widest">LOKASI: BEKASI</span>
            </div>
            <span className="text-[10px] opacity-50 leading-relaxed">SILAHKAN UNDUH ATAU SCREENSHOT</span>
            <a 
              href="https://i.postimg.cc/bYD95cp9/Whats_App_Image_2026_03_27_at_10_07_31.webp" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest uppercase border px-4 py-2 transition-colors border-white hover:bg-white hover:text-black"
            >
              UNDUH QRIS
            </a>
          </div>
        </PaymentMethod>
      </Suspense>
    </div>
  );
}

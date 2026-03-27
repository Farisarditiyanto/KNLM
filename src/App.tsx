/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense, lazy, memo, useCallback } from 'react';
import { BookOpen, ArrowRight, Cpu, FileText, Sparkles, Loader2 } from 'lucide-react';

const LinksView = lazy(() => import('./LinksView'));

const Modal = memo(({ isOpen, onClose, title, description, cancelText, confirmText, confirmHref, onConfirm }: any) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <dialog 
      ref={dialogRef}
      onClose={onClose}
      className="backdrop:bg-black/50 backdrop:backdrop-blur-sm bg-transparent p-4 m-auto w-full max-w-sm open:animate-in open:fade-in open:zoom-in-95 duration-200"
    >
      <div className="w-full p-8 flex flex-col items-center text-center border bg-black border-neutral-800 text-white font-mono">
        <h3 className="text-[clamp(1.125rem,2.5vw,1.25rem)] tracking-widest uppercase mb-4">{title}</h3>
        <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] leading-relaxed tracking-widest uppercase opacity-70 mb-8">
          {description}
        </p>
        <div className="flex gap-4 w-full">
          <button 
            onClick={onClose}
            className="flex-1 py-3 min-h-[44px] text-[clamp(0.75rem,1.5vw,0.875rem)] tracking-widest uppercase border transition-colors border-neutral-800 hover:bg-neutral-900"
          >
            {cancelText || 'Kembali'}
          </button>
          <a 
            href={confirmHref} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={onConfirm}
            className="flex-1 py-3 min-h-[44px] text-[clamp(0.75rem,1.5vw,0.875rem)] tracking-widest uppercase border transition-colors border-white bg-white text-black hover:bg-neutral-200 flex items-center justify-center"
          >
            {confirmText || 'Lanjutkan'}
          </a>
        </div>
      </div>
    </dialog>
  );
});

const FAQS = [
  { q: "APA ITU KUTAYB NLM?", a: "Kutayb NLM adalah inisiatif untuk mendigitalkan (OCR) kitab-kitab bahasa Arab agar teksnya dapat dibaca dan diproses oleh AI seperti NotebookLM." },
  { q: "BAGAIMANA CARA DONASINYA?", a: "Anda bisa berdonasi melalui Transfer Bank, E-Wallet, atau QRIS yang tersedia di atas. Dana 100% digunakan untuk biaya API Mistral OCR." },
  { q: "KAPAN KITAB BARU DITAMBAHKAN?", a: "Kami memproses kitab baru secara berkala sesuai dengan dana donasi yang terkumpul. Pantau terus Instagram kami untuk update terbaru." }
];

const QuestionForm = memo(({ waLink }: { waLink: string }) => {
  const [questionText, setQuestionText] = useState('');
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const handleCloseModal = useCallback(() => setShowQuestionModal(false), []);
  const handleConfirmModal = useCallback(() => {
    setShowQuestionModal(false);
    setQuestionText('');
  }, []);

  return (
    <>
      <div className="mt-6 pt-6 flex flex-col gap-4">
        <h3 className="text-sm tracking-widest uppercase">Tanya Pertanyaan Lain (via WA)</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Ketik pertanyaan Anda di sini..."
            className="flex-1 bg-transparent border border-neutral-800 p-4 text-xs tracking-widest outline-none focus:border-neutral-500 transition-colors"
          />
          <button
            onClick={() => {
              if (questionText.trim()) setShowQuestionModal(true);
            }}
            className="px-8 py-4 text-xs tracking-widest uppercase border border-white bg-white text-black hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!questionText.trim()}
          >
            Kirim
          </button>
        </div>
      </div>

      <Modal 
        isOpen={showQuestionModal}
        onClose={handleCloseModal}
        title="Konfirmasi"
        description="Anda akan membuka WhatsApp untuk mengirimkan pertanyaan ini ke admin."
        cancelText="Kembali"
        confirmText="Lanjutkan"
        confirmHref={`${waLink}?text=${encodeURIComponent(questionText)}`}
        onConfirm={handleConfirmModal}
      />
    </>
  );
});

const FaqItem = memo(({ faq, index, isActive, onToggle }: { faq: any, index: number, isActive: boolean, onToggle: (index: number) => void }) => {
  return (
    <div className="w-full flex flex-col transition-colors">
      <button 
        onClick={() => onToggle(index)}
        className="w-full py-3 flex justify-start items-center gap-3 opacity-70 hover:opacity-100 transition-opacity text-left"
      >
        <span className={`text-sm transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`}>
          ▹
        </span>
        <span className="text-sm">{faq.q}</span>
      </button>
      {isActive && (
        <div className="pb-4 pl-6 text-xs opacity-50 leading-relaxed normal-case">
          {faq.a}
        </div>
      )}
    </div>
  );
});

const PaymentMethod = memo(({ id, title, isActive, onToggle, children }: { id: string, title: string, isActive: boolean, onToggle: (id: string) => void, children: React.ReactNode }) => {
  return (
    <div className="w-full border flex flex-col transition-colors border-neutral-800 bg-black">
      <button 
        onClick={() => onToggle(id)}
        className="w-full p-6 flex justify-between items-center opacity-70 hover:opacity-100 transition-opacity"
      >
        <span>{title}</span>
        <span className="text-lg">{isActive ? '-' : '+'}</span>
      </button>
      {isActive && (
        <div className="p-6 border-t flex flex-col items-center gap-6 border-neutral-800">
          {children}
        </div>
      )}
    </div>
  );
});

export default function App() {
  const [activePayments, setActivePayments] = useState<string[]>([]);
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'links'>('home');
  const [activeTab, setActiveTab] = useState<'faq' | 'hasil' | 'support' | null>('hasil');
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

  const toggleFaq = useCallback((index: number) => {
    setActiveFaqs(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  }, []);

  // Ganti dengan nomor WhatsApp asli Anda
  const waNumber = "6288809123250"; 
  const waDisplay = "+62 888-0912-3250";
  const waLink = `https://wa.me/${waNumber}`;

  const scrollToDonasi = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById('donasi')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('donasi')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-mono flex flex-col items-center transition-colors duration-300 bg-black text-white selection:bg-white selection:text-black bg-grid-dark pb-[env(safe-area-inset-bottom)]">
      
      <div className="w-full max-w-5xl min-h-screen flex flex-col border-x border-neutral-800 bg-black">
        {/* Navigation / Header */}
        <header className="w-full py-8 px-8 flex justify-center items-center gap-8 md:gap-12 text-xs tracking-widest uppercase border-b border-neutral-800">
          <div className="opacity-100 font-bold">
            KNLM
          </div>
          
          {currentView === 'home' && (
            <button 
              onClick={() => setCurrentView('links')}
              className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity min-h-[44px]"
            >
              BUKA KUTAYB <span className="text-base leading-none">↗</span>
            </button>
          )}
          {currentView === 'links' && (
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity min-h-[44px]"
            >
              BERANDA <span className="text-base leading-none">↗</span>
            </button>
          )}

          <button 
            onClick={scrollToDonasi}
            className="opacity-50 hover:opacity-100 transition-opacity min-h-[44px]"
          >
            DONASI
          </button>
        </header>

        {currentView === 'home' ? (
          <main className="flex-1 w-full flex flex-col animate-in fade-in slide-in-from-top-8 duration-700 ease-out">
            
            {/* Title / Hero Illustration */}
            <div className="w-full py-24 px-6 flex flex-col items-center justify-center border-b border-neutral-800">
              <div className="flex items-center justify-center gap-3 md:gap-6 text-neutral-500">
                <div className="flex flex-col items-center gap-3">
                  <BookOpen className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
                  <span className="text-[10px] tracking-widest uppercase">Kitab</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 opacity-50" strokeWidth={1} />
                <div className="flex flex-col items-center gap-3">
                  <Cpu className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
                  <span className="text-[10px] tracking-widest uppercase">Proses</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 opacity-50" strokeWidth={1} />
                <div className="flex flex-col items-center gap-3">
                  <FileText className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
                  <span className="text-[10px] tracking-widest uppercase">Teks</span>
                </div>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 opacity-50" strokeWidth={1} />
                <div className="flex flex-col items-center gap-3">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
                  <span className="text-[10px] tracking-widest uppercase">NLM</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full py-16 px-6 flex flex-col items-center border-b border-neutral-800">
              <div className="max-w-2xl flex flex-col gap-10 text-[clamp(0.875rem,2vw,1rem)] leading-loose tracking-widest uppercase text-center">
                <p>
                  Tanya apapun dijawab 100% sesuai kitab.
                </p>
                <p>
                  Hasil NotebookLM dibagikan secara gratis.
                </p>
                <p>
                  Dengan Rp 17.000 / $ 1 , Anda membantu menambah OCR 500 halaman* ke database KITA BERSAMA**.
                </p>
                <div className="flex flex-col gap-4 text-xs opacity-50 leading-relaxed normal-case mt-4 p-6 border border-dashed border-neutral-600">
                  <p>
                    * OCR: Teknologi pengubah teks pada gambar/pindaian menjadi teks digital.
                  </p>
                  <p>
                    ** Alasan: Jika PDF kitab Arab langsung dimasukkan ke NotebookLM, teks tidak dapat terbaca.
                  </p>
                </div>
              </div>
            </div>

            {/* Donation Section */}
            <div id="donasi" className="w-full py-16 px-6 flex flex-col items-center border-b border-neutral-800">
              <h2 className="text-[clamp(1.25rem,3vw,1.5rem)] tracking-widest uppercase mb-10">Donasi</h2>
              <p className="text-xs leading-relaxed tracking-widest uppercase opacity-50 mb-12 max-w-xl text-center">
                Kami tidak mengambil uang jasa atau keuntungan sepeserpun. Semua dana kami pakai untuk proses ocr menggunakan <a href="https://mistral.ai/news/mistral-ocr-3" target="_blank" rel="noopener noreferrer" className="border-b border-current hover:opacity-100 transition-opacity">mistral ocr</a>.
              </p>

              {/* Payment Methods */}
              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 text-sm tracking-widest uppercase items-start">
                
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

              </div>

              {/* Bukti TF Link */}
              <div className="mt-12 text-center max-w-2xl mx-auto">
                <p className="text-[10px] md:text-xs tracking-widest uppercase leading-loose text-neutral-400">
                  untuk transparansi dan amanah, wajib mengirimkan bukti transfer,{' '}
                  <button 
                    onClick={() => setShowProofModal(true)} 
                    className="border-b border-current pb-1 hover:opacity-50 transition-opacity font-bold ml-1 text-white"
                  >
                    KLIK UNTUK KIRIM BUKTI TF (via whatsapp)
                  </button>
                </p>
              </div>
            </div>

            {/* Info Tabs Section */}
            <div className="w-full py-16 px-6 flex flex-col items-center">
              <div className="w-full max-w-4xl flex flex-col">
                {/* Tab Headers */}
                <div className="flex w-full justify-center -mb-[1px] relative z-10">
                  <button 
                    onClick={() => setActiveTab(activeTab === 'hasil' ? null : 'hasil')}
                    className={`px-6 md:px-8 py-4 text-sm tracking-widest uppercase border-t border-l border-b transition-colors flex items-center justify-center gap-2 ${
                      activeTab === 'hasil' 
                        ? 'border-t-neutral-800 border-l-neutral-800 border-b-black bg-black text-white opacity-100' 
                        : 'border-neutral-800 bg-black text-white opacity-50 hover:opacity-100'
                    }`}
                  >
                    HASIL {activeTab === 'hasil' && <span>↘</span>}
                  </button>
                  <button 
                    onClick={() => setActiveTab(activeTab === 'faq' ? null : 'faq')}
                    className={`px-6 md:px-8 py-4 text-sm tracking-widest uppercase border-t border-l border-b transition-colors flex items-center justify-center gap-2 ${
                      activeTab === 'faq' 
                        ? 'border-t-neutral-800 border-l-neutral-800 border-b-black bg-black text-white opacity-100' 
                        : 'border-neutral-800 bg-black text-white opacity-50 hover:opacity-100'
                    }`}
                  >
                    FAQ {activeTab === 'faq' && <span>↘</span>}
                  </button>
                  <button 
                    onClick={() => setActiveTab(activeTab === 'support' ? null : 'support')}
                    className={`px-6 md:px-8 py-4 text-sm tracking-widest uppercase border-t border-l border-r border-b transition-colors flex items-center justify-center gap-2 ${
                      activeTab === 'support' 
                        ? 'border-t-neutral-800 border-l-neutral-800 border-r-neutral-800 border-b-black bg-black text-white opacity-100' 
                        : 'border-neutral-800 bg-black text-white opacity-50 hover:opacity-100'
                    }`}
                  >
                    ❤️ {activeTab === 'support' && <span>↘</span>}
                  </button>
                </div>

                {/* Tab Content Box */}
                {activeTab && (
                  <div className="w-full border p-8 md:p-12 relative z-0 border-neutral-800 bg-black">
                    {activeTab === 'faq' && (
                      <div className="w-full flex flex-col gap-2 text-left tracking-widest uppercase">
                        {FAQS.map((faq, index) => (
                          <FaqItem 
                            key={index} 
                            faq={faq} 
                            index={index} 
                            isActive={activeFaqs.includes(index)} 
                            onToggle={toggleFaq} 
                          />
                        ))}

                        {/* Ask Question Section */}
                        <QuestionForm waLink={waLink} />
                      </div>
                    )}

                    {activeTab === 'hasil' && (
                      <div className="w-full flex flex-col gap-12 text-left tracking-widest uppercase">
                        <div className="flex flex-col gap-4">
                          <p className="text-xs opacity-50 leading-relaxed normal-case">
                            Berikut adalah perbandingan persentase tingkat keterbacaan scanning teks Arab oleh NotebookLM, antara dokumen PDF kitab asli vs PDF yang telah melalui proses OCR (Mistral OCR 3)
                          </p>
                        </div>

                        <div className="flex flex-col gap-8">
                          {/* Tanpa OCR */}
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-end gap-4">
                              <h3 className="text-sm">PDF ASLI</h3>
                              <span className="text-[clamp(1rem,3vw,1.25rem)] whitespace-nowrap">3-7%</span>
                            </div>
                            <div className="relative w-full h-2 rounded-full overflow-hidden bg-neutral-800">
                              <div className="absolute left-0 top-0 h-full w-[7%] rounded-full bg-neutral-500"></div>
                              <div className="absolute left-0 top-0 h-full w-[3%] rounded-full bg-white"></div>
                            </div>
                            <a 
                              href="https://i.postimg.cc/y6cS9VV4/Whats_App_Image_2026_03_27_at_10_35_08.webp" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[10px] opacity-50 hover:opacity-100 transition-opacity border-b border-current self-start pb-1"
                            >
                              LIHAT HASIL SCAN PDF ASLI
                            </a>
                          </div>

                          {/* Dengan OCR */}
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-end gap-4">
                              <h3 className="text-sm">OCR</h3>
                              <span className="text-[clamp(1rem,3vw,1.25rem)] whitespace-nowrap">93-99%</span>
                            </div>
                            <div className="relative w-full h-2 rounded-full overflow-hidden bg-neutral-800">
                              <div className="absolute left-0 top-0 h-full w-[99%] rounded-full bg-neutral-500"></div>
                              <div className="absolute left-0 top-0 h-full w-[93%] rounded-full bg-white"></div>
                            </div>
                            <a 
                              href="https://i.postimg.cc/Yq2q9k0d/Whats_App_Image_2026_03_27_at_10_38_07.webp" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[10px] opacity-50 hover:opacity-100 transition-opacity border-b border-current self-start pb-1"
                            >
                              LIHAT HASIL OCR
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'support' && (
                      <div className="w-full flex flex-col items-center text-center">
                        <p className="text-sm leading-loose tracking-widest uppercase mb-8">
                          Saran, masukan, kritik, atau ingin join team?
                        </p>
                        <a 
                          href={waLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs tracking-widest uppercase border px-8 py-4 transition-colors border-white hover:bg-white hover:text-black"
                        >
                          HUBUNGI KAMI
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </main>
        ) : (
          <Suspense fallback={
            <div className="flex-1 w-full flex items-center justify-center bg-black">
              <span className="text-xs tracking-widest uppercase font-bold animate-pulse">KNLM</span>
            </div>
          }>
            <LinksView />
          </Suspense>
        )}

        <footer className="w-full py-8 flex justify-center text-xs tracking-widest uppercase gap-8 mt-auto border-t border-neutral-800">
          <button onClick={() => setShowContactModal(true)} className="opacity-50 hover:opacity-100 transition-opacity min-h-[44px]">KONTAK</button>
          <a href="https://www.instagram.com/kutayb.nlm?igsh=MTB5YWY5Y3RjbTd0Zw==" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity min-h-[44px] flex items-center">INSTAGRAM</a>
          <button 
            onClick={() => {
              setCurrentView('links');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="opacity-50 hover:opacity-100 transition-opacity min-h-[44px]"
          >
            KUTAYB NLM &trade;
          </button>
        </footer>
      </div>

      {/* Floating Mobile Back Button */}
      {currentView === 'links' && (
        <div className="fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 transition-all duration-500 md:hidden animate-in fade-in slide-in-from-bottom-8">
          <button 
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-black text-white border border-neutral-800 px-6 py-4 min-h-[44px] text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            BERANDA <span className="text-base leading-none">↗</span>
          </button>
        </div>
      )}

      {/* Contact Modal */}
      <Modal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        title="Perhatian"
        description="Anda akan menchat admin via WhatsApp. Pastikan urusan urgen, konfirmasi donasi, atau memberikan saran."
        cancelText="Batal"
        confirmText="Lanjut"
        confirmHref={waLink}
        onConfirm={() => setShowContactModal(false)}
      />

      {/* Proof Modal */}
      <Modal 
        isOpen={showProofModal}
        onClose={() => setShowProofModal(false)}
        title="Konfirmasi"
        description="Anda akan membuka WhatsApp untuk mengirimkan bukti transfer."
        cancelText="Kembali"
        confirmText="Lanjutkan"
        confirmHref={`${waLink}?text=${encodeURIComponent('Assalamualaikum, ini bukti tf donasi kutayb nlm, semoga dijalankan dengan amanah dan bertanggung jawab ya')}`}
        onConfirm={() => setShowProofModal(false)}
      />
    </div>
  );
}

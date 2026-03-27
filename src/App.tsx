/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy, useCallback } from 'react';
import AlurProses from './components/AlurProses';

const LinksView = lazy(() => import('./LinksView'));
const Modal = lazy(() => import('./components/Modal'));
const FaqItem = lazy(() => import('./components/FaqItem'));
const PaymentSection = lazy(() => import('./components/PaymentSection'));
const QuestionForm = lazy(() => import('./components/QuestionForm'));

const FAQS = [
  { q: "APA ITU KUTAYB NLM?", a: "Kutayb NLM adalah inisiatif untuk mendigitalkan (OCR) kitab-kitab bahasa Arab agar teksnya dapat dibaca dan diproses oleh AI seperti NotebookLM." },
  { q: "BAGAIMANA CARA DONASINYA?", a: "Anda bisa berdonasi melalui Transfer Bank, E-Wallet, atau QRIS yang tersedia di atas. Dana 100% digunakan untuk biaya API Mistral OCR." },
  { q: "KAPAN KITAB BARU DITAMBAHKAN?", a: "Kami memproses kitab baru secara berkala sesuai dengan dana donasi yang terkumpul. Pantau terus Instagram kami untuk update terbaru." }
];

export default function App() {
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'links'>('home');
  const [activeTab, setActiveTab] = useState<'faq' | 'hasil' | 'support' | null>('hasil');

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
          <h1 className="opacity-100 font-bold m-0 text-xs">
            KNLM
          </h1>
          
          <nav className="flex items-center gap-8 md:gap-12">
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
          </nav>
        </header>

        {currentView === 'home' ? (
          <main className="flex-1 w-full flex flex-col animate-in fade-in slide-in-from-top-8 duration-500 ease-out">
            
            {/* Title / Hero Illustration */}
            <AlurProses />

            {/* Content */}
            <section aria-label="Tentang KNLM" className="w-full py-16 px-6 flex flex-col items-center border-b border-neutral-800">
              <h2 className="sr-only">Tentang KNLM</h2>
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
            </section>

            {/* Donation Section */}
            <section id="donasi" aria-labelledby="donasi-heading" className="w-full py-16 px-6 flex flex-col items-center border-b border-neutral-800">
              <h2 id="donasi-heading" className="text-[clamp(1.25rem,3vw,1.5rem)] tracking-widest uppercase mb-10">Donasi</h2>
              <p className="text-xs leading-relaxed tracking-widest uppercase opacity-50 mb-12 max-w-xl text-center">
                Kami tidak mengambil uang jasa atau keuntungan sepeserpun. Semua dana kami pakai untuk proses ocr menggunakan <a href="https://mistral.ai/news/mistral-ocr-3" target="_blank" rel="noopener noreferrer" className="border-b border-current hover:opacity-100 transition-opacity">mistral ocr</a>.
              </p>

                {/* Payment Methods */}
              <Suspense fallback={<div className="w-full h-24 border border-neutral-800 animate-pulse"></div>}>
                <PaymentSection />
              </Suspense>

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
            </section>

            {/* Info Tabs Section */}
            <section aria-label="Informasi Tambahan" className="w-full py-16 px-6 flex flex-col items-center">
              <h2 className="sr-only">Informasi Tambahan</h2>
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
                      <div className="w-full flex flex-col gap-2 text-left tracking-widest uppercase min-h-[200px]">
                        <Suspense fallback={
                          <div className="w-full h-full min-h-[200px] flex items-center justify-center">
                            <span className="text-xs tracking-widest uppercase font-bold animate-pulse">KNLM</span>
                          </div>
                        }>
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
                        </Suspense>
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
            </section>

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
      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
}

import React, { useState, Suspense, lazy, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

const FaqItem = lazy(() => import('./FaqItem'));
const PaymentMethod = lazy(() => import('./PaymentMethod'));
const QuestionForm = lazy(() => import('./QuestionForm'));
const Modal = lazy(() => import('./Modal'));

const FAQS = [
  { q: "APA ITU KUTAYB NLM?", a: "Kutayb NLM adalah inisiatif untuk mendigitalkan (OCR) kitab-kitab bahasa Arab agar teksnya dapat dibaca dan diproses oleh AI seperti NotebookLM." },
  { q: "BAGAIMANA CARA DONASINYA?", a: "Anda bisa berdonasi melalui Transfer Bank, E-Wallet, atau QRIS yang tersedia di atas. Dana 100% digunakan untuk biaya API Mistral OCR." },
  { q: "KAPAN KITAB BARU DITAMBAHKAN?", a: "Kami memproses kitab baru secara berkala sesuai dengan dana donasi yang terkumpul. Pantau terus Instagram kami untuk update terbaru." }
];

const waNumber = "6288809123250"; 

export default function MainContent() {
  const [activePayments, setActivePayments] = useState<string[]>([]);
  const [activeFaqs, setActiveFaqs] = useState<number[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
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

  return (
    <>
      <section id="donasi" aria-labelledby="donasi-heading" className="w-full py-16 px-6 flex flex-col items-center border-b border-neutral-800">
        <h2 id="donasi-heading" className="text-[clamp(1.5rem,4vw,2rem)] tracking-widest uppercase mb-12 text-center">
          Donasi
        </h2>
        
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <Suspense fallback={<div className="col-span-1 md:col-span-3 py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin opacity-50" /></div>}>
            {/* Transfer Bank */}
            <PaymentMethod id="bank" title="TRANSFER BANK" isActive={activePayments.includes('bank')} onToggle={togglePayment}>
              <div className="flex flex-col gap-4 text-center">
                <span className="text-xl font-bold tracking-widest">BSI</span>
                <span className="text-sm opacity-50 tracking-widest">7241258667</span>
                <span className="text-xs opacity-50">A.N. MUHAMMAD FARIS ARDITIYANTO</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleCopy("7241258667"); }}
                  className="mt-2 text-[10px] tracking-widest uppercase border px-4 py-2 transition-colors border-white hover:bg-white hover:text-black"
                >
                  {copiedText === "7241258667" ? "TERSALIN" : "SALIN REKENING"}
                </button>
              </div>
            </PaymentMethod>

            {/* E-Wallet */}
            <PaymentMethod id="ewallet" title="E-WALLET" isActive={activePayments.includes('ewallet')} onToggle={togglePayment}>
              <div className="flex flex-col gap-4 text-center items-center">
                <span className="text-xl font-bold tracking-widest">GOPAY / DANA</span>
                <span className="text-sm opacity-50 tracking-widest">088809123250</span>
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
          </Suspense>
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
                <div className="w-full flex flex-col gap-2 text-left tracking-widest uppercase">
                  <Suspense fallback={<div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 animate-spin opacity-50" /></div>}>
                    {FAQS.map((faq, i) => (
                      <FaqItem 
                        key={i} 
                        faq={faq} 
                        isActive={activeFaqs.includes(i)} 
                        onToggle={() => toggleFaq(i)} 
                      />
                    ))}
                    <QuestionForm />
                  </Suspense>
                </div>
              )}

              {activeTab === 'hasil' && (
                <div className="w-full flex flex-col gap-12 text-left tracking-widest uppercase">
                  <div className="text-sm opacity-70 leading-loose text-center max-w-2xl mx-auto">
                    Berikut adalah perbandingan persentase tingkat keterbacaan scanning teks Arab oleh NotebookLM, antara dokumen PDF kitab asli vs PDF yang telah melalui proses OCR (Mistral OCR 3)
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* PDF Asli */}
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between border-b pb-4 border-neutral-800">
                        <h3 className="text-sm font-bold">PDF ASLI</h3>
                        <span className="text-xs opacity-50">SEBELUM PROSES</span>
                      </div>
                      <div className="aspect-[3/4] w-full border border-neutral-800 bg-neutral-900 relative overflow-hidden group">
                        <img 
                          src="https://i.postimg.cc/y6cS9VV4/Whats_App_Image_2026_03_27_at_10_35_08.webp" 
                          alt="Hasil PDF Asli" 
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black/80 px-4 py-2 border border-neutral-800 backdrop-blur-sm">
                            <span className="text-red-500 font-bold">0% TERBACA</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OCR */}
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between border-b pb-4 border-neutral-800">
                        <h3 className="text-sm font-bold">OCR</h3>
                        <span className="text-xs opacity-50">MISTRAL OCR 3</span>
                      </div>
                      <div className="aspect-[3/4] w-full border border-neutral-800 bg-neutral-900 relative overflow-hidden group">
                        <img 
                          src="https://i.postimg.cc/Yq2q9k0d/Whats_App_Image_2026_03_27_at_10_38_07.webp" 
                          alt="Hasil Scan OCR" 
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black/80 px-4 py-2 border border-neutral-800 backdrop-blur-sm">
                            <span className="text-green-500 font-bold">99% TERBACA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'support' && (
                <div className="w-full flex flex-col items-center gap-8 text-center tracking-widest uppercase">
                  <div className="w-16 h-16 border rounded-full flex items-center justify-center border-neutral-800 bg-neutral-900">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div className="max-w-xl flex flex-col gap-4 text-sm leading-loose opacity-70">
                    <p>
                      Terima kasih atas dukungan Anda. Setiap kontribusi sangat berarti untuk kelangsungan proyek ini.
                    </p>
                    <p>
                      Semoga menjadi amal jariyah yang pahalanya terus mengalir.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="mt-4 px-8 py-4 border text-xs transition-colors border-white hover:bg-white hover:text-black"
                  >
                    HUBUNGI KAMI
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <Suspense fallback={null}>
        <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="HUBUNGI KAMI">
          <div className="flex flex-col gap-6">
            <p className="text-xs opacity-70 leading-loose">
              Untuk pertanyaan, saran, atau kerjasama, silakan hubungi kami melalui WhatsApp:
            </p>
            <a 
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 border text-center transition-colors border-white hover:bg-white hover:text-black"
            >
              CHAT WHATSAPP
            </a>
          </div>
        </Modal>

        <Modal isOpen={showProofModal} onClose={() => setShowProofModal(false)} title="KIRIM BUKTI TRANSFER">
          <div className="flex flex-col gap-6">
            <p className="text-xs opacity-70 leading-loose">
              Silakan kirimkan bukti transfer Anda melalui WhatsApp agar kami dapat memverifikasi donasi Anda.
            </p>
            <a 
              href={`https://wa.me/${waNumber}?text=Assalamu'alaikum,%20saya%20ingin%20mengirimkan%20bukti%20transfer%20donasi%20Kutayb%20NLM.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 border text-center transition-colors border-white hover:bg-white hover:text-black"
            >
              KIRIM VIA WHATSAPP
            </a>
          </div>
        </Modal>
      </Suspense>
    </>
  );
}

import React, { memo } from 'react';
import { BookOpen, ArrowRight, Cpu, FileText, Sparkles } from 'lucide-react';

const HeroSection = memo(() => {
  return (
    <>
      {/* Title / Hero Illustration */}
      <section aria-label="Alur Proses" className="w-full py-24 px-6 flex flex-col items-center justify-center border-b border-neutral-800">
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
      </section>

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
    </>
  );
});

export default HeroSection;

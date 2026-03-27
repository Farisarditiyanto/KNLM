import React from 'react';
import { BookOpen, ArrowRight, Cpu, FileText, Sparkles } from 'lucide-react';

export default function AlurProses() {
  return (
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
  );
}

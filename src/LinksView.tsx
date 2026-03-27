import React from 'react';

const SUBJECTS = [
  { name: 'Hadits', url: 'https://notebooklm.google.com/notebook/ad9b1484-0168-4aaa-8d2a-45a7279c3595' },
  { name: 'Qowaid Fiqh', url: 'https://notebooklm.google.com/notebook/58c44e41-273c-4dd0-97eb-df47e0e3145a' },
  { name: 'Akhlaq', url: 'https://notebooklm.google.com/notebook/9a0ed831-f20d-44bf-a79a-d9a125cccc2b' },
  { name: 'Fiqh', url: 'https://notebooklm.google.com/notebook/fc81e5c2-6e51-486c-818b-983c85f0e850' },
  { name: 'Nahwu', url: 'https://notebooklm.google.com/notebook/71729cf8-87ab-4d8c-bcc9-c08a62fe29d8' },
  { name: 'Aqidah', url: 'https://notebooklm.google.com/notebook/cf7b00ac-4824-45ab-ad1d-f7afd150a596' },
  { name: 'Ushul Fiqh', url: 'https://notebooklm.google.com/notebook/2e6a30eb-b5cc-4f4b-9e88-b46022a4b96d' },
];

export default function LinksView() {
  return (
    <main className="flex-1 w-full flex flex-col items-center animate-in fade-in slide-in-from-top-8 duration-700 ease-out">
      {/* Links view */}
      <div className="w-full py-16 px-6 flex flex-col items-center justify-center border-b border-neutral-800">
        <h2 className="text-[clamp(1.5rem,4vw,2rem)] tracking-widest uppercase mb-4 m-0">
          Kutayb NLM
        </h2>
        <p className="text-xs opacity-50 tracking-widest uppercase">Pilih Mata Pelajaran</p>
      </div>

      <div className="w-full py-16 px-6 flex flex-col items-center border-b border-neutral-800">
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUBJECTS.map((subject) => (
            <a
              key={subject.name}
              href={subject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-6 border tracking-widest uppercase transition-colors flex justify-between items-center border-neutral-800 bg-neutral-950/50 hover:bg-neutral-900 min-h-[44px]"
            >
              <span>{subject.name}</span>
              <span className="opacity-50">↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="w-full py-16 px-6 flex flex-col items-center">
        <div className="w-full max-w-2xl p-8 border text-xs leading-relaxed tracking-widest uppercase opacity-70 text-center border-neutral-800 bg-neutral-950/50">
          <p className="mb-4">Penambahan mata pelajaran dan kitab lainnya pada tiap pelajaran coming soon.</p>
          <p>Ikuti Instagram kami untuk update dan pengumuman.</p>
        </div>
      </div>
    </main>
  );
}

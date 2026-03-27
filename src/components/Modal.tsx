import React, { useEffect, useRef, memo } from 'react';

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
        <h2 className="text-[clamp(1.125rem,2.5vw,1.25rem)] tracking-widest uppercase mb-4 m-0">{title}</h2>
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

export default Modal;

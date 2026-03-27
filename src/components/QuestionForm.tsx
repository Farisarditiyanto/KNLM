import React, { useState, useCallback, memo, lazy, Suspense } from 'react';

const Modal = lazy(() => import('./Modal'));

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

      <Suspense fallback={null}>
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
      </Suspense>
    </>
  );
});

export default QuestionForm;

import React, { memo } from 'react';

const FaqItem = memo(({ faq, index, isActive, onToggle }: { faq: any, index: number, isActive: boolean, onToggle: (index: number) => void }) => {
  return (
    <div className="w-full flex flex-col transition-colors">
      <button 
        onClick={() => onToggle(index)}
        className="w-full py-3 flex justify-start items-center gap-3 opacity-70 hover:opacity-100 transition-opacity text-left"
      >
        <span className={`text-sm transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`} aria-hidden="true">
          ▹
        </span>
        <h3 className="text-sm font-normal m-0">{faq.q}</h3>
      </button>
      {isActive && (
        <div className="pb-4 pl-6 text-xs opacity-50 leading-relaxed normal-case">
          {faq.a}
        </div>
      )}
    </div>
  );
});

export default FaqItem;

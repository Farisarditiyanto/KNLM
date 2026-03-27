import React, { memo } from 'react';

const PaymentMethod = memo(({ id, title, isActive, onToggle, children }: { id: string, title: string, isActive: boolean, onToggle: (id: string) => void, children: React.ReactNode }) => {
  return (
    <div className="w-full border flex flex-col transition-colors border-neutral-800 bg-black">
      <button 
        onClick={() => onToggle(id)}
        className="w-full p-6 flex justify-between items-center opacity-70 hover:opacity-100 transition-opacity"
      >
        <h3 className="text-sm font-normal m-0">{title}</h3>
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

export default PaymentMethod;

'use client';

export type PaymentMethod = 'card' | 'venmo';

const methods: { id: PaymentMethod; label: string }[] = [
  { id: 'card', label: 'Credit Card' },
  { id: 'venmo', label: 'Venmo' },
];

export function PaymentMethodSelector({ value, onChange }: { value: PaymentMethod; onChange: (method: PaymentMethod) => void }) {
  return (
    <div role="tablist" aria-label="Payment method" className="grid grid-cols-2 gap-2 rounded-xl bg-slate-950 p-1">
      {methods.map((method) => (
        <button
          key={method.id}
          type="button"
          role="tab"
          aria-selected={value === method.id}
          onClick={() => onChange(method.id)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${value === method.id ? 'bg-red-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
        >
          {method.label}
        </button>
      ))}
    </div>
  );
}

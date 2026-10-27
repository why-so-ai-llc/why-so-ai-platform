'use client';

export type PaymentMethod = 'card' | 'venmo';

const methods: { id: PaymentMethod; label: string }[] = [
  { id: 'card', label: 'Credit Card' },
  { id: 'venmo', label: 'Venmo' },
];

export function PaymentMethodSelector({ value, onChange }: { value: PaymentMethod; onChange: (method: PaymentMethod) => void }) {
  return (
    <div role="tablist" aria-label="Payment method" className="grid grid-cols-2 gap-2 rounded-xl bg-black p-1">
      {methods.map((method) => (
        <button
          key={method.id}
          type="button"
          role="tab"
          aria-selected={value === method.id}
          onClick={() => onChange(method.id)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${value === method.id ? 'bg-lime-400 text-black' : 'text-white/80 hover:bg-white/10'}`}
        >
          {method.label}
        </button>
      ))}
    </div>
  );
}

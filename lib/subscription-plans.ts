export type PlanId = 'monthly' | 'annual';

export type SubscriptionPlan = {
  id: PlanId;
  name: string;
  description: string;
  amountCents: number;
  interval: 'month' | 'year';
  features: string[];
};

export const subscriptionPlans: Record<PlanId, SubscriptionPlan> = {
  monthly: {
    id: 'monthly',
    name: 'Monthly',
    description: 'Flexible month-to-month access to the Why So AI platform.',
    amountCents: 4900,
    interval: 'month',
    features: ['Full platform access', 'Cancel anytime', 'Email support'],
  },
  annual: {
    id: 'annual',
    name: 'Annual',
    description: 'One payment per year with the best value.',
    amountCents: 49900,
    interval: 'year',
    features: ['Full platform access', 'Save about 15% vs monthly', 'Priority email support'],
  },
};

export const venmoUsername = process.env.NEXT_PUBLIC_VENMO_USERNAME || 'whysoai';

export function isPlanId(value: unknown): value is PlanId {
  return value === 'monthly' || value === 'annual';
}

export function formatPrice(amountCents: number) {
  return `$${(amountCents / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function annualSavingsPercent() {
  const yearlyAtMonthly = subscriptionPlans.monthly.amountCents * 12;
  return Math.round((1 - subscriptionPlans.annual.amountCents / yearlyAtMonthly) * 100);
}

export function getRenewalDate(plan: PlanId, from: Date = new Date()) {
  const next = new Date(from);
  if (plan === 'annual') next.setFullYear(next.getFullYear() + 1);
  else next.setMonth(next.getMonth() + 1);
  return next;
}

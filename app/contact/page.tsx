import { PageHero } from '@/components/page-hero';
import { ContactFormDemo } from '@/components/tool-demos';

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Prepare a consultation request"
        description="Use the demo form below to prepare an email draft. This repository does not include backend submission or CRM wiring."
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <ContactFormDemo />
      </div>
    </div>
  );
}

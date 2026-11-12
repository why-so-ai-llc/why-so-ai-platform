'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { resume, TEAM_PHOTO_SRC } from '@/lib/team';

export function TeamProfile() {
  const [open, setOpen] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`View résumé for ${resume.name}`}
        className="card card-interactive group mx-auto block w-full max-w-md overflow-hidden text-left shadow-neon"
      >
        <div className="relative aspect-[4/5] w-full bg-black">
          {photoFailed ? (
            <div className="flex h-full items-center justify-center font-tech text-6xl text-lime-400">BT</div>
          ) : (
            <Image
              src={TEAM_PHOTO_SRC}
              alt={`${resume.name}, ${resume.headline}`}
              fill
              sizes="(max-width: 768px) 100vw, 448px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              onError={() => setPhotoFailed(true)}
              priority
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5">
            <p className="font-tech text-xl font-bold text-brand-text">{resume.name}</p>
            <p className="text-sm text-lime-400">{resume.headline}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-brand-muted">Click to view résumé</p>
          </div>
        </div>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-title"
            onClick={(event) => event.stopPropagation()}
            className="relative my-4 w-full max-w-3xl rounded-2xl border border-lime-400/40 bg-brand-surface p-6 shadow-neon sm:p-10"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close résumé"
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-lime-400/40 text-white hover:border-lime-400 hover:text-lime-400"
            >
              <span aria-hidden="true">✕</span>
            </button>

            <header>
              <h2 id="resume-title" className="font-tech text-2xl font-bold text-brand-text sm:text-3xl">{resume.name}</h2>
              <p className="mt-1 font-semibold text-lime-400">{resume.headline}</p>
              <p className="mt-3 text-sm text-brand-muted">
                {resume.location} | <a className="hover:text-lime-400" href={`tel:${resume.phone.replaceAll('-', '')}`}>{resume.phone}</a>
              </p>
              <p className="text-sm text-brand-muted">
                {resume.emails.map((email, index) => (
                  <span key={email}>
                    {index > 0 ? ' | ' : ''}
                    <a className="hover:text-lime-400" href={`mailto:${email}`}>{email}</a>
                  </span>
                ))}
              </p>
            </header>

            <ResumeSection title="Professional Summary">
              <p className="text-brand-muted">{resume.summary}</p>
            </ResumeSection>

            <ResumeSection title="Core Competencies">
              <dl className="space-y-3">
                {resume.competencies.map((group) => (
                  <div key={group.group}>
                    <dt className="font-semibold text-brand-text">{group.group}</dt>
                    <dd className="text-brand-muted">{group.items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </ResumeSection>

            <ResumeSection title="Professional Experience">
              <div className="space-y-5">
                {resume.experience.map((role) => (
                  <div key={`${role.title}-${role.org}`}>
                    <h4 className="font-semibold text-brand-text">{role.title}</h4>
                    <p className="text-sm text-lime-400">{role.org}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-brand-muted">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title="Education & Training">
              <ul className="list-disc space-y-1 pl-5 text-brand-muted">
                {resume.education.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ResumeSection>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 border-b border-lime-400/25 pb-2 font-tech text-sm font-bold uppercase tracking-[0.2em] text-lime-400">{title}</h3>
      {children}
    </section>
  );
}

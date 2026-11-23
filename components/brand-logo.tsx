'use client';

import Image from 'next/image';
import { useState } from 'react';

export const LOGO_SRC = '/brand/whyso-logo.png';

type BrandLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
  showWordmark?: boolean;
};

// The logo artwork is square (1:1); width and height are always equal to preserve its aspect ratio.
export function BrandLogo({ size = 40, className = '', priority = false, showWordmark = false }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {failed ? null : (
        <Image
          src={LOGO_SRC}
          alt="WHYSO AI LLC logo"
          width={size}
          height={size}
          priority={priority}
          onError={() => setFailed(true)}
          style={{ width: size, height: size }}
          className="shrink-0 object-contain"
        />
      )}
      {showWordmark || failed ? (
        <span className="font-tech text-base font-bold uppercase tracking-wider text-brand-text">
          WHYSO <span className="text-brand-primary">AI</span> <span className="text-xs text-brand-muted">LLC</span>
        </span>
      ) : null}
    </span>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">Page not found</p>
      <h1 className="mt-4 text-4xl font-bold text-white">This route is not part of the current demo.</h1>
      <p className="mt-4 text-white/80">
        Use the navigation above to visit the supported services, tools, pricing, contact, and documentation pages.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-lg bg-lime-400 px-5 py-3 font-semibold text-black hover:bg-lime-300">
          Go home
        </Link>
        <Link href="/documentation" className="rounded-lg border border-white/15 px-5 py-3 font-semibold text-white hover:border-lime-400 hover:text-lime-300">
          View routes
        </Link>
      </div>
    </div>
  );
}

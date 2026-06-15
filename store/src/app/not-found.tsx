import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 sm:py-32 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
        Page Not Found
      </p>
      <h1 className="text-5xl sm:text-6xl font-light mb-6">404</h1>
      <p className="text-warm-gray leading-relaxed mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="inline-block bg-foreground text-white text-sm tracking-[0.2em] uppercase px-8 py-3.5 rounded-sm hover:bg-gold transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

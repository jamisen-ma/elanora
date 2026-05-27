"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-gold-light transition-colors"
      />
      <button
        type="submit"
        className="bg-gold text-white text-sm tracking-[0.15em] uppercase px-6 py-3 rounded-sm hover:bg-gold-light transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}

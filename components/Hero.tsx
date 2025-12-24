import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Turn your audience into competitors.
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto">
          Post outcome-based dares. Collect proof. Pay only for results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <Link
            href="/sign-up"
            className="px-8 py-4 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors w-full sm:w-auto"
          >
            Create a Dare
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 border border-white text-white font-semibold rounded hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
          >
            See how it works
          </a>
        </div>
        <p className="text-sm text-neutral-500">
          No subscriptions. No storefronts. No long setup.
        </p>
      </div>
    </section>
  );
}

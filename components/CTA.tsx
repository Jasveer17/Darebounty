import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center border border-neutral-800 p-12 rounded">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Whop is for selling. DareBounty is for winning.
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/app"
            className="px-8 py-4 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors w-full sm:w-auto"
          >
            Create your first Dare
          </Link>
          <Link
            href="#"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            Or see how creators use it →
          </Link>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AppPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Link href="/" className="inline-block mb-8 text-neutral-400 hover:text-white transition-colors">
          ← Back to home
        </Link>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Dare creation is opening soon.
        </h1>
        <p className="text-xl text-neutral-400 mb-12">
          Want early access? Drop your email.
        </p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-6 py-4 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors text-white"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors"
              >
                Join Waitlist
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-6 border border-neutral-800 rounded">
            <p className="text-xl text-white">Thanks! We&apos;ll be in touch soon.</p>
          </div>
        )}
      </div>
    </main>
  );
}

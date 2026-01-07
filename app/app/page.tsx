'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AppPage() {
  const [email, setEmail] = useState('');
  const [dareIdea, setDareIdea] = useState('');
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
          Create a Dare
        </h1>
        <p className="text-xl text-neutral-400 mb-12">
          We&apos;re onboarding creators in small batches to keep challenges fair and high-quality.
        </p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-6 py-4 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors text-white"
              />
              <textarea
                value={dareIdea}
                onChange={(e) => setDareIdea(e.target.value)}
                placeholder="What dare would you run? (optional)"
                rows={3}
                className="flex-1 px-6 py-4 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors text-white resize-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors"
              >
                Request Access
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-6 border border-neutral-800 rounded">
            <p className="text-xl text-white">You&apos;re in. We&apos;ll reach out with next steps.</p>
          </div>
        )}
      </div>
    </main>
  );
}

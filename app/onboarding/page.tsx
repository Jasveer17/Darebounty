'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function OnboardingPage() {
  const [role, setRole] = useState<'CREATOR' | 'PARTICIPANT' | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleRoleSelection = async () => {
    if (!role || !user) return;

    setLoading(true);

    try {
      const response = await fetch('/api/user/role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Failed to set role:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Are you here to run dares or participate?
        </h1>
        <p className="text-xl text-neutral-400 mb-12">
          Choose your role to get started.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setRole('CREATOR')}
            className={`p-8 border-2 rounded-lg transition-all ${
              role === 'CREATOR'
                ? 'border-white bg-white text-black'
                : 'border-neutral-800 hover:border-neutral-600'
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">Creator</h3>
            <p className={role === 'CREATOR' ? 'text-neutral-800' : 'text-neutral-400'}>
              Post dares, review submissions, and pay winners.
            </p>
          </button>
          <button
            onClick={() => setRole('PARTICIPANT')}
            className={`p-8 border-2 rounded-lg transition-all ${
              role === 'PARTICIPANT'
                ? 'border-white bg-white text-black'
                : 'border-neutral-800 hover:border-neutral-600'
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">Participant</h3>
            <p className={role === 'PARTICIPANT' ? 'text-neutral-800' : 'text-neutral-400'}>
              Join dares, submit proof, and compete to win.
            </p>
          </button>
        </div>
        <button
          onClick={handleRoleSelection}
          disabled={!role || loading}
          className="px-8 py-4 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Setting up...' : 'Continue'}
        </button>
      </div>
    </main>
  );
}

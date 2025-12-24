'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

interface SubmitProofFormProps {
  dareId: string;
  proofType: string;
}

export default function SubmitProofForm({ dareId, proofType }: SubmitProofFormProps) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    proofUrl: '',
    proofImage: '',
    note: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dareId,
          ...formData,
        }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit proof');
      }
    } catch (error) {
      console.error('Failed to submit proof:', error);
      alert('Failed to submit proof');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-neutral-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Submit Your Proof</h2>

      {!isSignedIn ? (
        <div className="text-center py-8">
          <p className="text-neutral-400 mb-4">Sign in to submit your proof</p>
          <button
            onClick={() => router.push('/sign-in')}
            className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors"
          >
            Sign In
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Proof URL *</label>
            <input
              type="url"
              required
              value={formData.proofUrl}
              onChange={(e) => setFormData({ ...formData, proofUrl: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {proofType === 'URL_IMAGE' && (
            <div>
              <label className="block text-sm font-semibold mb-2">Image URL</label>
              <input
                type="url"
                value={formData.proofImage}
                onChange={(e) => setFormData({ ...formData, proofImage: e.target.value })}
                placeholder="https://imgur.com/..."
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2">Note (optional)</label>
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Additional context or explanation..."
              rows={3}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Proof'}
          </button>
        </form>
      )}
    </div>
  );
}

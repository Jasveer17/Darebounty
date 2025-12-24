'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default function CreateDarePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    proofType: 'URL' as 'URL' | 'URL_IMAGE',
    totalReward: '',
    winnerCount: '',
    deadline: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/dare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          totalReward: parseFloat(formData.totalReward),
          winnerCount: parseInt(formData.winnerCount),
          deadline: new Date(formData.deadline).toISOString(),
        }),
      });

      if (response.ok) {
        const { dare } = await response.json();
        router.push(`/dashboard/dare/${dare.id}`);
      }
    } catch (error) {
      console.error('Failed to create dare:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            DareBounty
          </Link>
          <UserButton />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/dashboard"
          className="inline-block mb-8 text-neutral-400 hover:text-white transition-colors"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold mb-8">Create New Dare</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Dare Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Film yourself doing a backflip"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Must be a clean backflip with both feet leaving the ground. Submit a video link."
              rows={4}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Proof Required</label>
            <select
              value={formData.proofType}
              onChange={(e) => setFormData({ ...formData, proofType: e.target.value as 'URL' | 'URL_IMAGE' })}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors"
            >
              <option value="URL">URL only</option>
              <option value="URL_IMAGE">URL + Image</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Total Reward ($)</label>
              <input
                type="number"
                required
                min="1"
                step="0.01"
                value={formData.totalReward}
                onChange={(e) => setFormData({ ...formData, totalReward: e.target.value })}
                placeholder="100"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Number of Winners</label>
              <input
                type="number"
                required
                min="1"
                value={formData.winnerCount}
                onChange={(e) => setFormData({ ...formData, winnerCount: e.target.value })}
                placeholder="3"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Deadline</label>
            <input
              type="datetime-local"
              required
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Dare'}
          </button>
        </form>
      </main>
    </div>
  );
}

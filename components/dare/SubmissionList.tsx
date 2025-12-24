'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Submission {
  id: string;
  proofUrl: string;
  proofImage: string | null;
  note: string | null;
  status: string;
  createdAt: Date;
  participant: {
    email: string;
  };
}

interface SubmissionListProps {
  submissions: Submission[];
  dareId: string;
  maxWinners: number;
  currentAccepted: number;
}

export default function SubmissionList({
  submissions,
  dareId,
  maxWinners,
  currentAccepted,
}: SubmissionListProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState<string | null>(null);

  const handleStatusUpdate = async (submissionId: string, status: 'ACCEPTED' | 'REJECTED') => {
    if (status === 'ACCEPTED' && currentAccepted >= maxWinners) {
      alert('Maximum number of winners already reached');
      return;
    }

    setProcessing(submissionId);

    try {
      const response = await fetch('/api/submission/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId, status }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update submission');
      }
    } catch (error) {
      console.error('Failed to update submission:', error);
      alert('Failed to update submission');
    } finally {
      setProcessing(null);
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12 border border-neutral-800 rounded-lg">
        <p className="text-neutral-400">No submissions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="p-6 border border-neutral-800 rounded-lg"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-semibold mb-1">{submission.participant.email}</p>
              <p className="text-sm text-neutral-400">
                Submitted {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded ${
                submission.status === 'ACCEPTED'
                  ? 'bg-green-900 text-green-300'
                  : submission.status === 'REJECTED'
                  ? 'bg-red-900 text-red-300'
                  : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {submission.status}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div>
              <p className="text-sm text-neutral-500 mb-1">Proof URL:</p>
              <a
                href={submission.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline break-all"
              >
                {submission.proofUrl}
              </a>
            </div>

            {submission.proofImage && (
              <div>
                <p className="text-sm text-neutral-500 mb-1">Image:</p>
                <a
                  href={submission.proofImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {submission.proofImage}
                </a>
              </div>
            )}

            {submission.note && (
              <div>
                <p className="text-sm text-neutral-500 mb-1">Note:</p>
                <p className="text-neutral-300">{submission.note}</p>
              </div>
            )}
          </div>

          {submission.status === 'PENDING' && (
            <div className="flex gap-3">
              <button
                onClick={() => handleStatusUpdate(submission.id, 'ACCEPTED')}
                disabled={processing === submission.id}
                className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing === submission.id ? 'Processing...' : 'Accept'}
              </button>
              <button
                onClick={() => handleStatusUpdate(submission.id, 'REJECTED')}
                disabled={processing === submission.id}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing === submission.id ? 'Processing...' : 'Reject'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

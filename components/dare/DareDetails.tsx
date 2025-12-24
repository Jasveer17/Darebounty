'use client';

import { useEffect, useState } from 'react';

interface DareDetailsProps {
  dare: {
    id: string;
    title: string;
    description: string;
    proofType: string;
    totalReward: number;
    winnerCount: number;
    deadline: Date;
    status: string;
    creator: {
      email: string;
    };
  };
  isActive: boolean;
}

export default function DareDetails({ dare, isActive }: DareDetailsProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!isActive) return;

    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const deadline = new Date(dare.deadline).getTime();
      const distance = deadline - now;

      if (distance < 0) {
        setTimeLeft('Expired');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [dare.deadline, isActive]);

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-bold">{dare.title}</h1>
        <span
          className={`px-4 py-2 text-sm font-semibold rounded ${
            isActive
              ? 'bg-green-900 text-green-300'
              : 'bg-neutral-800 text-neutral-400'
          }`}
        >
          {dare.status}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
        <div>
          <p className="text-sm text-neutral-400 mb-1">Total Reward</p>
          <p className="text-2xl font-bold">${dare.totalReward}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400 mb-1">Winners</p>
          <p className="text-2xl font-bold">{dare.winnerCount}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400 mb-1">
            {isActive ? 'Time Left' : 'Ended'}
          </p>
          <p className="text-2xl font-bold">
            {isActive ? timeLeft : new Date(dare.deadline).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-neutral-400 whitespace-pre-wrap">{dare.description}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Proof Required</h2>
          <p className="text-neutral-400">
            {dare.proofType === 'URL' ? 'URL only' : 'URL + Image'}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Created By</h2>
          <p className="text-neutral-400">{dare.creator.email}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Deadline</h2>
          <p className="text-neutral-400">
            {new Date(dare.deadline).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

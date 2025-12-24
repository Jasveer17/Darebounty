import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

interface ParticipantDashboardProps {
  userId: string;
}

export default async function ParticipantDashboard({ userId }: ParticipantDashboardProps) {
  const submissions = await prisma.submission.findMany({
    where: { participantId: userId },
    include: {
      dare: true,
    },
    orderBy: { createdAt: 'desc' },
  });

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

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Your Submissions</h1>

        {submissions.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">No submissions yet</h2>
            <p className="text-neutral-400 mb-8">
              Find dares to participate in and start competing.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="p-6 border border-neutral-800 rounded-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Link
                      href={`/dare/${submission.dare.id}`}
                      className="text-xl font-bold hover:underline mb-2 block"
                    >
                      {submission.dare.title}
                    </Link>
                    <p className="text-neutral-400">
                      Submitted {new Date(submission.createdAt).toLocaleDateString()}
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
                <div className="text-sm text-neutral-400">
                  <p>Proof: <a href={submission.proofUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{submission.proofUrl}</a></p>
                  {submission.note && <p className="mt-2">Note: {submission.note}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

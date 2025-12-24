import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

interface CreatorDashboardProps {
  userId: string;
}

export default async function CreatorDashboard({ userId }: CreatorDashboardProps) {
  const dares = await prisma.dare.findMany({
    where: { creatorId: userId },
    include: {
      submissions: true,
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Your Dares</h1>
          <Link
            href="/dashboard/create"
            className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors"
          >
            Create New Dare
          </Link>
        </div>

        {dares.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">No dares yet</h2>
            <p className="text-neutral-400 mb-8">
              Create your first dare to get started.
            </p>
            <Link
              href="/dashboard/create"
              className="inline-block px-6 py-3 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors"
            >
              Create Dare
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {dares.map((dare) => {
              const acceptedCount = dare.submissions.filter((s) => s.status === 'ACCEPTED').length;
              const isActive = new Date(dare.deadline) > new Date() && dare.status === 'OPEN';

              return (
                <Link
                  key={dare.id}
                  href={`/dashboard/dare/${dare.id}`}
                  className="block p-6 border border-neutral-800 rounded-lg hover:border-neutral-600 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{dare.title}</h3>
                      <p className="text-neutral-400 line-clamp-2">{dare.description}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded ${
                        isActive
                          ? 'bg-green-900 text-green-300'
                          : dare.status === 'PAID'
                          ? 'bg-blue-900 text-blue-300'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {dare.status}
                    </span>
                  </div>
                  <div className="flex gap-6 text-sm text-neutral-400">
                    <span>{dare.submissions.length} submissions</span>
                    <span>{acceptedCount}/{dare.winnerCount} winners selected</span>
                    <span>${dare.totalReward} total</span>
                    <span>
                      {isActive
                        ? `Ends ${new Date(dare.deadline).toLocaleDateString()}`
                        : 'Closed'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

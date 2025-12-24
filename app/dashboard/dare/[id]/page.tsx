import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import SubmissionList from '@/components/dare/SubmissionList';

export default async function DareManagementPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    redirect('/onboarding');
  }

  const dare = await prisma.dare.findUnique({
    where: { id: params.id },
    include: {
      submissions: {
        include: {
          participant: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!dare) {
    notFound();
  }

  if (dare.creatorId !== user.id && user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const acceptedCount = dare.submissions.filter((s) => s.status === 'ACCEPTED').length;
  const isActive = new Date(dare.deadline) > new Date() && dare.status === 'OPEN';

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
        <Link
          href="/dashboard"
          className="inline-block mb-8 text-neutral-400 hover:text-white transition-colors"
        >
          ← Back to Dashboard
        </Link>

        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl font-bold">{dare.title}</h1>
            <span
              className={`px-4 py-2 text-sm font-semibold rounded ${
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
          <p className="text-neutral-400 mb-6">{dare.description}</p>

          <div className="grid md:grid-cols-4 gap-4 p-6 bg-neutral-900 border border-neutral-800 rounded-lg">
            <div>
              <p className="text-sm text-neutral-400 mb-1">Total Reward</p>
              <p className="text-xl font-bold">${dare.totalReward}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400 mb-1">Winners Selected</p>
              <p className="text-xl font-bold">{acceptedCount}/{dare.winnerCount}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400 mb-1">Submissions</p>
              <p className="text-xl font-bold">{dare.submissions.length}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-400 mb-1">Deadline</p>
              <p className="text-xl font-bold">
                {new Date(dare.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <a
              href={`/dare/${dare.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white text-white font-semibold rounded hover:bg-white hover:text-black transition-colors"
            >
              View Public Page
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Submissions</h2>
          <SubmissionList
            submissions={dare.submissions}
            maxWinners={dare.winnerCount}
            currentAccepted={acceptedCount}
          />
        </div>
      </main>
    </div>
  );
}

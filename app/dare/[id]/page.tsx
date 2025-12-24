import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import DareDetails from '@/components/dare/DareDetails';
import SubmitProofForm from '@/components/dare/SubmitProofForm';

export default async function DarePage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  
  const dare = await prisma.dare.findUnique({
    where: { id: params.id },
    include: {
      creator: true,
      submissions: userId ? {
        where: { 
          participant: {
            clerkId: userId
          }
        }
      } : false,
    },
  });

  if (!dare) {
    notFound();
  }

  let currentUserSubmission = null;
  if (userId && Array.isArray(dare.submissions) && dare.submissions.length > 0) {
    currentUserSubmission = dare.submissions[0];
  }

  const isActive = new Date(dare.deadline) > new Date() && dare.status === 'OPEN';

  return (
    <div className="min-h-screen">
      <header className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <a href="/" className="text-2xl font-bold">
            DareBounty
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <DareDetails dare={dare} isActive={isActive} />
        
        {isActive && !currentUserSubmission && (
          <div className="mt-12">
            <SubmitProofForm dareId={dare.id} proofType={dare.proofType} />
          </div>
        )}

        {currentUserSubmission && (
          <div className="mt-12 p-6 border border-neutral-800 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Your Submission</h3>
            <div className="space-y-2 text-neutral-400">
              <p>Status: <span className={`font-semibold ${
                currentUserSubmission.status === 'ACCEPTED' ? 'text-green-400' :
                currentUserSubmission.status === 'REJECTED' ? 'text-red-400' :
                'text-neutral-300'
              }`}>{currentUserSubmission.status}</span></p>
              <p>Proof: <a href={currentUserSubmission.proofUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">{currentUserSubmission.proofUrl}</a></p>
              {currentUserSubmission.note && <p>Note: {currentUserSubmission.note}</p>}
              <p className="text-sm">Submitted {new Date(currentUserSubmission.createdAt).toLocaleString()}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

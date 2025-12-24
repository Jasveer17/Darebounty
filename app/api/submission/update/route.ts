import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { submissionId, status } = await request.json();

    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        dare: true,
      },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    if (submission.dare.creatorId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (status === 'ACCEPTED') {
      const acceptedCount = await prisma.submission.count({
        where: {
          dareId: submission.dareId,
          status: 'ACCEPTED',
        },
      });

      if (acceptedCount >= submission.dare.winnerCount) {
        return NextResponse.json({ error: 'Maximum winners already reached' }, { status: 400 });
      }
    }

    const updatedSubmission = await prisma.submission.update({
      where: { id: submissionId },
      data: { status },
    });

    const newAcceptedCount = await prisma.submission.count({
      where: {
        dareId: submission.dareId,
        status: 'ACCEPTED',
      },
    });

    if (newAcceptedCount === submission.dare.winnerCount && submission.dare.status === 'OPEN') {
      await prisma.dare.update({
        where: { id: submission.dareId },
        data: { status: 'CLOSED' },
      });
    }

    return NextResponse.json({ success: true, submission: updatedSubmission });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

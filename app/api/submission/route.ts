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

    const { dareId, proofUrl, proofImage, note } = await request.json();

    const dare = await prisma.dare.findUnique({
      where: { id: dareId },
      include: {
        submissions: true,
      },
    });

    if (!dare) {
      return NextResponse.json({ error: 'Dare not found' }, { status: 404 });
    }

    if (dare.status !== 'OPEN') {
      return NextResponse.json({ error: 'Dare is not accepting submissions' }, { status: 400 });
    }

    if (new Date(dare.deadline) < new Date()) {
      return NextResponse.json({ error: 'Dare deadline has passed' }, { status: 400 });
    }

    const existingSubmission = await prisma.submission.findUnique({
      where: {
        dareId_participantId: {
          dareId,
          participantId: user.id,
        },
      },
    });

    if (existingSubmission) {
      return NextResponse.json({ error: 'You have already submitted to this dare' }, { status: 400 });
    }

    const submission = await prisma.submission.create({
      data: {
        dareId,
        participantId: user.id,
        proofUrl,
        proofImage,
        note,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, submission });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

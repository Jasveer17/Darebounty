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

    if (!user || (user.role !== 'CREATOR' && user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Only creators can create dares' }, { status: 403 });
    }

    const { title, description, proofType, totalReward, winnerCount, deadline } = await request.json();

    const dare = await prisma.dare.create({
      data: {
        creatorId: user.id,
        title,
        description,
        proofType,
        totalReward,
        winnerCount,
        deadline: new Date(deadline),
        status: 'OPEN',
      },
    });

    return NextResponse.json({ success: true, dare });
  } catch (error) {
    console.error('Error creating dare:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

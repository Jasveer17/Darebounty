import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role } = await request.json();

    if (!role || !['CREATOR', 'PARTICIPANT'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: { role },
      create: {
        clerkId: userId,
        email: '', // Will be updated via webhook
        role,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error setting user role:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CreatorDashboard from '@/components/dashboard/CreatorDashboard';
import ParticipantDashboard from '@/components/dashboard/ParticipantDashboard';

export default async function DashboardPage() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId) {
    redirect('/sign-in');
  }

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser?.emailAddresses[0]?.emailAddress || '',
        role: 'PARTICIPANT',
      },
    });
    redirect('/onboarding');
  }

  if (user.role === 'CREATOR' || user.role === 'ADMIN') {
    return <CreatorDashboard userId={user.id} />;
  }

  return <ParticipantDashboard userId={user.id} />;
}

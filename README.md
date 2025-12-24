# DareBounty

Turn your audience into competitors.

## Overview

DareBounty is a platform that lets creators post outcome-based dares to their audience. Participants submit proof, creators manually pick winners, and payments happen through the platform.

**Whop is for selling. DareBounty is for winning.**

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, TypeScript
- **Backend**: Next.js API routes / Route Handlers
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Clerk (Email magic link)
- **Payments**: Stripe Connect (Express accounts)
- **Realtime**: Pusher/Ably for chat
- **Deployment**: Vercel

## Features

### Phase 1-7 (Implemented)

- ✅ Landing page with dark minimal UI
- ✅ Email authentication with Clerk
- ✅ Role selection (Creator/Participant)
- ✅ Creator dashboard to manage dares
- ✅ Participant dashboard to view submissions
- ✅ Create dare flow
- ✅ Public dare pages
- ✅ Submission flow with proof validation
- ✅ Review & winner selection system

### Upcoming Phases

- Phase 8: Stripe Connect for payouts
- Phase 9: Per-dare chat system
- Phase 10: Email notifications
- Phase 11: Safety & abuse controls
- Phase 12: Admin panel

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database (or use Prisma dev server)
- Clerk account for authentication
- (Optional) Stripe account for payments
- (Optional) Pusher account for chat

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy `.env.example` to `.env` and fill in your credentials:

```bash
# Database
DATABASE_URL="your_postgres_url"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
CLERK_WEBHOOK_SECRET=your_webhook_secret

# Stripe (for phase 8)
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key

# Pusher (for phase 9)
NEXT_PUBLIC_PUSHER_APP_KEY=your_pusher_key
PUSHER_APP_ID=your_pusher_app_id
PUSHER_SECRET=your_pusher_secret
```

4. Start the Prisma development database:

```bash
npx prisma dev &
```

5. Push the database schema:

```bash
npx prisma db push --accept-data-loss
```

6. Generate Prisma Client:

```bash
npx prisma generate
```

7. Run the development server:

```bash
npm run dev
```

8. Open [http://localhost:3000](http://localhost:3000)

## Database Models

- **User**: id, email, clerkId, role (CREATOR/PARTICIPANT/ADMIN)
- **Dare**: id, creatorId, title, description, proofType, totalReward, winnerCount, deadline, status
- **Submission**: id, dareId, participantId, proofUrl, proofImage, note, status
- **Payout**: id, dareId, submissionId, amount, status, stripeTransferId
- **Message**: id, dareId, senderId, message, createdAt

## Key Routes

- `/` - Landing page
- `/sign-in`, `/sign-up` - Authentication
- `/onboarding` - Role selection
- `/dashboard` - User dashboard (Creator or Participant view)
- `/dashboard/create` - Create new dare
- `/dashboard/dare/[id]` - Manage dare submissions (Creators only)
- `/dare/[id]` - Public dare page

## Development Principles

- **Manual control over automation** - Creators have full control
- **Transparency over polish** - Clear, honest communication
- **Speed matters** - Faster than Discord + Google Forms
- **No bloat** - No gamification, AI, feeds, or vanity features

## Deployment

Deploy to Vercel:

```bash
vercel
```

Make sure to set all environment variables in your Vercel project settings.

## Clerk Webhook Setup

Set up a webhook in Clerk dashboard:
- Endpoint: `https://your-domain.com/api/webhook/clerk`
- Events: `user.created`, `user.updated`
- Copy the webhook secret to `CLERK_WEBHOOK_SECRET`

## License

Private - All rights reserved

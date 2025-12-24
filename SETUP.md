# DareBounty Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Clerk Authentication

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. Get your API keys from the API Keys section
4. Update `.env` with your real Clerk keys:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_here
```

**Important**: The placeholder keys in the `.env` file won't work. You must use real Clerk keys.

### 3. Set Up the Database

Start the Prisma development database server:

```bash
npx prisma dev &
```

Push the database schema:

```bash
npx prisma db push
```

Generate the Prisma Client:

```bash
npx prisma generate
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Configuration

The project uses Prisma 7 with PostgreSQL. By default, it uses Prisma's local development database (`npx prisma dev`).

### Using a Different Database

To use your own PostgreSQL database:

1. Update `DATABASE_URL` in `.env`:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/darebounty"
```

2. Update `prisma.config.ts` if needed

3. Run migrations:

```bash
npx prisma db push
```

## Clerk Webhook Setup

For user synchronization to work properly:

1. In your Clerk Dashboard, go to Webhooks
2. Add a new endpoint: `https://your-domain.com/api/webhook/clerk`
3. Subscribe to these events:
   - `user.created`
   - `user.updated`
4. Copy the webhook signing secret to `.env`:

```bash
CLERK_WEBHOOK_SECRET=whsec_your_actual_webhook_secret
```

## Environment Variables

Required environment variables:

```bash
# Database
DATABASE_URL="your_database_url"

# Clerk Authentication (REQUIRED)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_secret
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret

# Clerk URLs (already configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

Optional (for future phases):

```bash
# Stripe (Phase 8)
STRIPE_SECRET_KEY=sk_test_placeholder
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# Pusher (Phase 9)
NEXT_PUBLIC_PUSHER_APP_KEY=placeholder
PUSHER_APP_ID=placeholder
PUSHER_SECRET=placeholder
NEXT_PUBLIC_PUSHER_CLUSTER=us2
```

## Building for Production

```bash
npm run build
```

**Note**: The build requires valid Clerk API keys. Placeholder keys will cause the build to fail.

## Troubleshooting

### Prisma Client Error

If you see "PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions":

```bash
npx prisma generate
npx prisma db push
```

### Clerk Invalid Key Error

Make sure you're using real Clerk API keys, not placeholders. Get your keys from [https://dashboard.clerk.com](https://dashboard.clerk.com).

### Database Connection Error

Make sure the Prisma dev server is running:

```bash
npx prisma dev
```

Or check your `DATABASE_URL` if using a custom database.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx tsc --noEmit` - Check TypeScript types
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db push` - Push schema changes to database
- `npx prisma generate` - Generate Prisma Client

## Project Structure

```
/app
  /api                  # API routes
    /dare              # Dare creation
    /submission        # Submission handling
    /user              # User management
    /webhook           # Clerk webhook
  /dashboard           # Dashboard pages
    /create            # Create dare form
    /dare/[id]         # Manage specific dare
  /dare/[id]           # Public dare page
  /sign-in             # Clerk sign-in
  /sign-up             # Clerk sign-up
  /onboarding          # Role selection
  page.tsx             # Landing page

/components
  /dashboard           # Dashboard components
  /dare                # Dare-related components
  Hero.tsx, etc.       # Landing page components

/lib
  prisma.ts            # Prisma client singleton

/prisma
  schema.prisma        # Database schema
  prisma.config.ts     # Prisma configuration
```

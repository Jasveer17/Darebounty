# Build Instructions

## Important: Clerk Keys Required for Production Builds

This application requires valid Clerk API keys to build successfully. The placeholder keys in `.env` will cause the build to fail during the static page generation phase.

## Development Mode

For development, you can run the app without building:

```bash
npm run dev
```

This will work with placeholder keys (though authentication won't function properly).

## Production Build

To build for production:

1. **Get real Clerk API keys** from [https://dashboard.clerk.com](https://dashboard.clerk.com)

2. Update your `.env` file:
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key
CLERK_SECRET_KEY=sk_test_your_actual_secret  
```

3. Run the build:
```bash
npm run build
```

## Why Are Clerk Keys Required at Build Time?

Next.js attempts to pre-render pages during the build process. Since the Clerk Provider wraps the entire application and validates keys during initialization, it needs valid keys even at build time.

##Alternative: Deploy Without Building Locally

If you don't want to add real Clerk keys locally, you can:

1. Push your code to a Git repository
2. Deploy to Vercel/similar platform
3. Add your Clerk keys as environment variables in the platform's dashboard
4. The platform will build with the real keys

## Vercel Deployment

1. Push code to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `CLERK_WEBHOOK_SECRET`
   - `DATABASE_URL`
4. Deploy

The build will succeed on Vercel with real keys set in the environment variables.

## CI/CD Considerations

If setting up CI/CD pipelines:
- Ensure Clerk keys are available as secrets/environment variables
- Use real test keys, not placeholders
- Consider using different Clerk instances for dev/staging/production

## Current Build Status

With placeholder keys, the build will show errors like:
```
Error: @clerk/clerk-react: The publishableKey passed to Clerk is invalid.
```

This is expected and will resolve once real keys are added.

All code compiles correctly - lint and TypeScript checks pass.

import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "DareBounty - Turn your audience into competitors",
  description: "Post outcome-based dares. Collect proof. Pay only for results. No subscriptions. No storefronts. No long setup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('placeholder');

  if (!isClerkConfigured) {
    return (
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

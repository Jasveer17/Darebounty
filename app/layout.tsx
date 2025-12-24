import type { Metadata } from "next";
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
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

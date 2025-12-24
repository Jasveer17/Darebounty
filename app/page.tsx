import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import HowItWorks from '@/components/HowItWorks';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProps />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}

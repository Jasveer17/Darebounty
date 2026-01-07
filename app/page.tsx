import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import ExampleDare from '@/components/ExampleDare';
import HowItWorks from '@/components/HowItWorks';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <ValueProps />
      <ExampleDare />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}

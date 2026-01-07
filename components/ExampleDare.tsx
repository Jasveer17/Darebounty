export default function ExampleDare() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          What a Dare looks like
        </h2>
        <div className="border border-neutral-800 bg-neutral-900/50 p-8 rounded font-mono text-left">
          <div className="mb-6">
            <p className="text-neutral-400 text-sm mb-2">DARE:</p>
            <p className="text-white text-lg">Clip my stream — best 3 clips win $50 each.</p>
          </div>
          <div className="mb-6">
            <p className="text-neutral-400 text-sm mb-2">DEADLINE:</p>
            <p className="text-white text-lg">72 hours</p>
          </div>
          <div>
            <p className="text-neutral-400 text-sm mb-2">PROOF:</p>
            <p className="text-white text-lg">YouTube or TikTok link</p>
          </div>
        </div>
      </div>
    </section>
  );
}
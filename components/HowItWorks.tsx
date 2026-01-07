export default function HowItWorks() {
  const steps = [
    "Create a Dare",
    "Share it with your audience",
    "Collect proof submissions",
    "Pick winners. Release payouts."
  ];

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          How It Works
        </h2>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-6 p-6 border border-neutral-800 rounded hover:border-neutral-700 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center font-bold text-xl">
                {index + 1}
              </div>
              <div className="flex-1 pt-2">
                <p className="text-xl">{step}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-neutral-500 text-center mt-8">
          Creators review submissions and approve winners.
        </p>
      </div>
    </section>
  );
}

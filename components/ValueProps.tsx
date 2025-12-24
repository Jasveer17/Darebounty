export default function ValueProps() {
  const props = [
    {
      title: "Run challenges in minutes",
      text: "Clip contests, promo dares, growth challenges — without building a product or pricing a subscription."
    },
    {
      title: "Outcome only",
      text: "You decide the rules. You decide the winners. You only pay when results are delivered."
    },
    {
      title: "Built for chaos, not committees",
      text: "Perfect for Discord drops, Twitter posts, and fast experiments. No long-term commitment."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {props.map((prop, index) => (
            <div
              key={index}
              className="border border-neutral-800 p-8 rounded hover:border-neutral-700 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-4">{prop.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{prop.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-24">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
        Transforming <span className="text-brand">quantitative analysis </span> 
        from a bottleneck into a strategic advantage
      </h1>
      <p className="mt-8 text-2xl font-light text-gray-200 max-w-4xl border-l-4 border-brand pl-5 italic leading-snug">
        Building the future of quantitative evidence in competition law.
      </p>

      {/* Principles Box */}
      <div className="mt-12 p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 shadow-lg">
        <p className="text-lg sm:text-xl font-medium text-white leading-relaxed">
          <span className="text-brand font-semibold">AI safety</span>, data security, 
          transparency and defensibility are foundational principles.
        </p>
      </div>
    </main>
  );
}

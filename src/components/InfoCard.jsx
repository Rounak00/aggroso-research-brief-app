export default function InfoCard() {
  const steps = [
    { step: '1', title: 'Paste Links', desc: 'Enter 2 to 10 article or blog URLs you want to research.' },
    { step: '2', title: 'Fetch Content', desc: 'The app fetches and cleans text from each URL automatically.' },
    { step: '3', title: 'AI Brief', desc: 'Groq AI generates a summary, key points, conflicts, and citations.' },
    { step: '4', title: 'Review', desc: 'Browse the brief, see what was used from each source, and verify claims.' },
  ];

  return (
    <div className="absolute right-0 top-10 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-5 z-50">
      <h3 className="font-semibold text-gray-800 mb-4 text-base">How to use</h3>
      <div className="flex flex-col gap-3">
        {steps.map((s) => (
          <div key={s.step} className="flex gap-3 items-start">
            <span className="min-w-6 h-6 w-6 rounded-full bg-gray-800 text-white text-xs flex items-center justify-center font-bold">
              {s.step}
            </span>
            <div>
              <p className="text-sm font-medium text-gray-800">{s.title}</p>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// components/ProsCons.tsx

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-8">
      <div className="border-l-4 border-green-500 pl-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Pros</h3>
        <ul className="space-y-2">
          {pros.map((pro, idx) => (
            <li key={idx} className="text-slate-700 flex items-start gap-2">
              <span className="text-green-600 mt-1">✓</span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-l-4 border-red-500 pl-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Cons</h3>
        <ul className="space-y-2">
          {cons.map((con, idx) => (
            <li key={idx} className="text-slate-700 flex items-start gap-2">
              <span className="text-red-600 mt-1">✗</span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

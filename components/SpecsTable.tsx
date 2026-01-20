// components/SpecsTable.tsx

interface SpecsTableProps {
  specs: Record<string, string>;
}

export function SpecsTable({ specs }: SpecsTableProps) {
  const entries = Object.entries(specs);

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="text-left py-3 px-4 font-semibold text-slate-900">Specification</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-900">Details</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, value], idx) => (
            <tr key={key} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
              <td className="py-3 px-4 font-medium text-slate-700">{key}</td>
              <td className="py-3 px-4 text-slate-600">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

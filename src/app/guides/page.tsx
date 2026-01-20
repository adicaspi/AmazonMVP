import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides - AI Picks",
  description: "Practical guides to help you organize and upgrade your home.",
};

// Placeholder guide data - will be replaced with MDX content
const guides = [
  {
    slug: "kitchen-organization-guide",
    title: "Complete Kitchen Organization Guide",
    summary: "Transform your kitchen into an organized, efficient space with our comprehensive guide.",
    room: "kitchen",
    dateUpdated: "2025-01-20",
  },
  {
    slug: "living-room-storage-solutions",
    title: "Living Room Storage Solutions",
    summary: "Maximize space and minimize clutter with these smart storage solutions.",
    room: "living_room",
    dateUpdated: "2025-01-19",
  },
  {
    slug: "bedroom-organization-tips",
    title: "Bedroom Organization Tips",
    summary: "Create a peaceful, organized bedroom with these practical tips.",
    room: "bedroom",
    dateUpdated: "2025-01-18",
  },
];

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Guides
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Practical, actionable guides to help you organize and upgrade your home.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors"
          >
            <div className="text-sm text-slate-500 mb-2">
              {guide.room.replace("_", " ")} • Updated {new Date(guide.dateUpdated).toLocaleDateString()}
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-700">
              {guide.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {guide.summary}
            </p>
            <div className="mt-4 text-sm text-slate-900 font-medium group-hover:underline">
              Read guide →
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded">
        <p className="text-slate-700">
          <strong>Note:</strong> More guides are coming soon. We're working on comprehensive 
          MDX-based guides with detailed product recommendations and practical tips.
        </p>
      </div>
    </div>
  );
}

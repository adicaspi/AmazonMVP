import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides - Home Organization & Product Recommendations | AI Picks",
  description: "Practical guides to help you organize and upgrade your home. Learn about lighting, storage, organization, and choosing the right products.",
};

const guides = [
  {
    slug: "choosing-kitchen-lighting",
    title: "How to Choose the Perfect Kitchen Lighting",
    description: "A complete guide to selecting kitchen lighting that combines functionality with style. Learn about task lighting, ambient lighting, and how to create the perfect kitchen atmosphere.",
    category: "Lighting",
    readTime: "8 min read",
    image: "💡",
  },
  {
    slug: "organizing-small-kitchen",
    title: "How to Organize a Small Kitchen",
    description: "Practical strategies for organizing a small kitchen. Learn about drawer organizers, storage solutions, and space-saving techniques that actually work.",
    category: "Organization",
    readTime: "10 min read",
    image: "🗂️",
  },
  {
    slug: "kitchen-storage-solutions",
    title: "Kitchen Storage Solutions: Organize Every Corner",
    description: "Comprehensive guide to kitchen storage. Learn about drawer organizers, cabinet solutions, and products that maximize your kitchen's storage potential.",
    category: "Storage",
    readTime: "9 min read",
    image: "📦",
  },
  {
    slug: "choosing-bedroom-lighting",
    title: "How to Choose Bedroom Lighting for Better Sleep",
    description: "Complete guide to bedroom lighting. Learn about task lighting, ambient lighting, and how to create a relaxing bedroom atmosphere that promotes better sleep.",
    category: "Lighting",
    readTime: "7 min read",
    image: "🌙",
  },
  {
    slug: "creating-cozy-living-room",
    title: "How to Create a Cozy Living Room",
    description: "Transform your living room into a cozy, inviting space. Learn about lighting, textiles, organization, and products that create warmth and comfort.",
    category: "Decor",
    readTime: "8 min read",
    image: "🛋️",
  },
];

export default function GuidesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-10 sm:mb-12">
        <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-full shadow-sm">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Practical Guides
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
          Home Organization & Product Guides
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed">
          Practical, actionable guides to help you organize and upgrade your home. 
          Each guide includes product recommendations and real-world solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden transform hover:-translate-y-1"
          >
            <div className="p-6 sm:p-8">
              <div className="text-5xl mb-4">{guide.image}</div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                  {guide.category}
                </span>
                <span className="text-xs text-slate-500">{guide.readTime}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                {guide.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3">
                {guide.description}
              </p>
              <div className="mt-6 flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all">
                <span>Read guide</span>
                <span className="text-lg">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-2xl border border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          More Guides Coming Soon
        </h2>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
          We're constantly adding new guides to help you make better decisions about home products. 
          Check back regularly for new content on organization, lighting, storage, and more.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
            Bathroom Organization
          </span>
          <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
            Home Office Setup
          </span>
          <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
            Entryway Solutions
          </span>
          <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700">
            Laundry Room Organization
          </span>
        </div>
      </div>
    </div>
  );
}

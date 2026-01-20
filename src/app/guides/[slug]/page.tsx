import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Placeholder - will be replaced with MDX loader
const guides: Record<string, { title: string; content: string }> = {
  "kitchen-organization-guide": {
    title: "Complete Kitchen Organization Guide",
    content: "This guide is coming soon. MDX content will be loaded here.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides[slug];

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  return {
    title: `${guide.title} - AI Picks`,
    description: "A comprehensive guide to kitchen organization.",
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides[slug];

  if (!guide) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <div className="mb-8">
          <div className="text-sm text-slate-500 mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {guide.title}
          </h1>
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            {guide.content}
          </p>

          <div className="border border-slate-200 bg-slate-50 p-6 rounded my-8">
            <p className="text-slate-700">
              <strong>Note:</strong> This is a placeholder guide. Full MDX-based guides 
              with product recommendations, comparison tables, and detailed sections will 
              be implemented next.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 mt-12">
          <p className="text-xs text-slate-500">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>
      </article>
    </div>
  );
}

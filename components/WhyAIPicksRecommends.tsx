// components/WhyAIPicksRecommends.tsx
// Standardized "Why AI Picks Recommends This" section component

type WhyAIPicksRecommendsProps = {
  content: string;
};

export function WhyAIPicksRecommends({ content }: WhyAIPicksRecommendsProps) {
  // Ensure content is 2-3 sentences, practical, and experience-based
  // If content is too long, truncate to first 2-3 sentences
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const standardizedContent = sentences.slice(0, 3).join('. ').trim();
  const finalContent = standardizedContent.endsWith('.') 
    ? standardizedContent 
    : standardizedContent + '.';

  return (
    <div className="mb-8 sm:mb-10 p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border-l-4 border-emerald-500 rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🎯</span>
        <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-slate-50">Why AI Picks Recommends This</h3>
      </div>
      <p className="text-base sm:text-lg text-slate-200 dark:text-slate-300 leading-relaxed">
        {finalContent}
      </p>
    </div>
  );
}

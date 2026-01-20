// components/AffiliateDisclosure.tsx
// Amazon Associates disclosure component - Required on all pages

export function AffiliateDisclosure() {
  return (
    <div className="bg-slate-50 border-t border-slate-200 py-4 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases. 
          This means that when you click on an affiliate link and make a purchase, I may receive 
          a small commission at no additional cost to you. This helps support the site and allows 
          me to continue providing free, valuable content. All product recommendations are based 
          on thorough research and editorial judgment, and affiliate relationships do not influence 
          our recommendations.
        </p>
      </div>
    </div>
  );
}

// components/ProductCTA.tsx
// Reusable CTA button component for product pages

type ProductCTAProps = {
  href: string;
  text: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function ProductCTA({ href, text, variant = "primary", className = "" }: ProductCTAProps) {
  const baseStyles = "inline-block w-full md:w-auto text-center font-bold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105";
  
  const variantStyles = {
    primary: "py-5 sm:py-6 px-10 sm:px-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg sm:text-xl hover:from-emerald-700 hover:to-teal-700",
    secondary: "py-4 sm:py-5 px-8 sm:px-10 bg-gradient-to-r from-slate-700 to-slate-600 text-white text-base sm:text-lg hover:from-slate-600 hover:to-slate-500"
  };

  // All product CTAs link to Amazon (direct or via tracking), so always use sponsored
  const relAttributes = "nofollow sponsored noopener noreferrer";

  return (
    <a
      href={href}
      target="_blank"
      rel={relAttributes}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {text} →
    </a>
  );
}

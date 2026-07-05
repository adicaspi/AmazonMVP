"use client";

// Kit photo with graceful fallback: tries the clean official kit image
// (kit.jpg — [USER ASSET]: download the full-kit image from the product's
// official Amazon gallery and drop it in public/images/shark-flexstyle/),
// falling back to the existing comparison image until it's provided.
export function KitImage() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/shark-flexstyle/kit.jpg"
      alt="Shark FlexStyle full kit — styler with all five attachments"
      loading="lazy"
      decoding="async"
      className="w-full h-auto"
      onError={(e) => {
        const img = e.currentTarget;
        if (!img.src.endsWith("why-switching.jpg")) {
          img.src = "/images/shark-flexstyle/why-switching.jpg";
        }
      }}
    />
  );
}

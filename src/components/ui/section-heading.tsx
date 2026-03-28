import { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="text-xs tracking-[0.22em] uppercase text-zinc-300/80">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-sm md:text-base text-zinc-300/80 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}


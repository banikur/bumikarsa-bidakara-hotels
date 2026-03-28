import { ReactNode } from "react";

type PageSectionProps = {
  id?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

export function PageSection({
  id,
  children,
  ...ariaProps
}: PageSectionProps) {
  return (
    <section
      id={id}
      className="space-y-8 md:space-y-10 lg:space-y-12"
      {...ariaProps}
    >
      {children}
    </section>
  );
}


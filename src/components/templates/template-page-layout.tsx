import { TemplateId } from "@/types/cms.types";
import { ReactNode } from "react";

interface TemplatePageLayoutProps {
  templateId: TemplateId;
  children: ReactNode;
}

const TEMPLATE_STYLES: Record<TemplateId, { body: string; css: string }> = {
  "warm-earthy": {
    body: "bg-[#FDFAF5] text-[#2C1A0E]",
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      .tpl-page { font-family: 'DM Sans', sans-serif; }
      .tpl-page h1, .tpl-page h2, .tpl-page h3 { font-family: 'Cormorant Garamond', serif; }
    `,
  },
  cinematic: {
    body: "bg-[#0a0a0f] text-[#F5F0E8]",
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500&display=swap');
      .tpl-page { font-family: 'Inter', sans-serif; }
      .tpl-page h1, .tpl-page h2, .tpl-page h3 { font-family: 'Playfair Display', Georgia, serif; }
    `,
  },
  membership: {
    body: "bg-[#FDFBF7] text-[#1a1a1a]",
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;600;700;800&display=swap');
      .tpl-page { font-family: 'Inter', sans-serif; }
      .tpl-page h1, .tpl-page h2, .tpl-page h3 { font-family: 'Poppins', sans-serif; }
    `,
  },
  mice: {
    body: "bg-[#FAFAFC] text-[#1a1a1a]",
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      .tpl-page { font-family: 'Inter', sans-serif; }
      .tpl-page h1, .tpl-page h2, .tpl-page h3 { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; letter-spacing: -0.02em; }
    `,
  },
  corporate: {
    body: "bg-[#FDFAF5] text-[#2C1A0E]",
    css: `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      .tpl-page { font-family: 'DM Sans', sans-serif; }
      .tpl-page h1, .tpl-page h2, .tpl-page h3 { font-family: 'Cormorant Garamond', serif; }
    `,
  },
};

export function TemplatePageLayout({ templateId, children }: TemplatePageLayoutProps) {
  const styles = TEMPLATE_STYLES[templateId] || TEMPLATE_STYLES["warm-earthy"];

  return (
    <>
      <style>{styles.css}</style>
      <div className={`tpl-page min-h-screen ${styles.body}`}>
        {children}
      </div>
    </>
  );
}

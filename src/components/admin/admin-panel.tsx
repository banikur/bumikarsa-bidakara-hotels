"use client";

import { useState } from "react";
import { SiteConfig, TemplateId, UniversalContent } from "@/types/cms.types";
import { updateSiteConfig } from "@/app/actions/update-site-config";
import { CmsHeader } from "./cms-header";
import { Toast } from "@/components/ui/toast";

import { HeroSection } from "./sections/hero-section";
import { PropertiesSection } from "./sections/properties-section";
import { FeaturesSection } from "./sections/features-section";
import { OffersSection } from "./sections/offers-section";
import { MembershipSection } from "./sections/membership-section";
import { ContactSection } from "./sections/contact-section";

interface AdminPanelProps {
  initialConfig: SiteConfig;
}

const TEMPLATES: { id: TemplateId; label: string; desc: string }[] = [
  { id: "warm-earthy", label: "Warm Earthy", desc: "Editorial serif style with rich tones." },
  { id: "cinematic", label: "Cinematic Luxury", desc: "Dark mode elegance with GSAP animations." },
  { id: "membership", label: "Membership Promo", desc: "Gold/Navy promo focused on club tiers." },
  { id: "mice", label: "MICE Professional", desc: "Corporate style built for venue specifications." },
];

export function AdminPanel({ initialConfig }: AdminPanelProps) {
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [activeSection, setActiveSection] = useState<string>("hero");

  const [activeTemplate, setActiveTemplate] = useState<TemplateId>(initialConfig.active_template);
  const [contentId, setContentId] = useState<UniversalContent>(initialConfig.content_id);
  const [contentEn, setContentEn] = useState<UniversalContent>(initialConfig.content_en);

  const [savedSnapshot, setSavedSnapshot] = useState<string>(
    JSON.stringify({ activeTemplate: initialConfig.active_template, contentId: initialConfig.content_id, contentEn: initialConfig.content_en })
  );
  
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const hasUnsavedChanges = JSON.stringify({ activeTemplate, contentId, contentEn }) !== savedSnapshot;

  const handleSave = async () => {
    setIsSaving(true);
    const res = await updateSiteConfig({
      active_template: activeTemplate,
      content_id: contentId,
      content_en: contentEn,
    });
    setIsSaving(false);

    if (res.success) {
      setSavedSnapshot(JSON.stringify({ activeTemplate, contentId, contentEn }));
      setToast({ message: "Content successfully published to live site.", type: "success" });
    } else {
      setToast({ message: res.error || "Failed to save content.", type: "error" });
    }
  };

  const currentContent = language === "id" ? contentId : contentEn;
  const setCurrentContent = language === "id" ? setContentId : setContentEn;

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden bg-muted/10 font-sans">
      <CmsHeader
        language={language}
        onLanguageChange={setLanguage}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-64 flex flex-col bg-background border-r shadow-sm overflow-y-auto z-10 p-4">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-3">Sections</div>
          <nav className="flex flex-col gap-1">
            {["hero", "properties", "features", "offers", "membership", "contact"].map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`flex items-center w-full px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors capitalize text-left ${
                  activeSection === sec
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {sec}
              </button>
            ))}
            
            <hr className="my-4 border-t" />
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-3">Global</div>
            <button
              onClick={() => setActiveSection("template")}
              className={`flex items-center w-full px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors capitalize text-left ${
                activeSection === "template"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              Active Template
            </button>
          </nav>
        </aside>

        {/* Main Editor Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#fafafa]">
          <div className="max-w-5xl mx-auto p-12 pb-32">
            
            {activeSection === "template" && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-[#111]">Active Template</h2>
                  <p className="text-sm text-gray-500 mt-2">Select the visual skin that packages your site content.</p>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-4">
                  {TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => setActiveTemplate(tmpl.id)}
                      className={`text-left p-6 rounded-xl border-2 transition-all ${
                        activeTemplate === tmpl.id
                          ? "border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-600/10"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <h3 className={`text-lg font-bold mb-2 ${activeTemplate === tmpl.id ? "text-blue-700" : "text-gray-900"}`}>{tmpl.label}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{tmpl.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "hero" && <HeroSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "properties" && <PropertiesSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "features" && <FeaturesSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "offers" && <OffersSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "membership" && <MembershipSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "contact" && <ContactSection content={currentContent} onChange={setCurrentContent} />}

          </div>
        </main>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
      )}
    </div>
  );
}

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
import { PageHeadersSection } from "./sections/page-headers-section";

interface AdminPanelProps {
  initialConfig: SiteConfig;
}

const TEMPLATES: { id: TemplateId; label: string; desc: string; tag: string }[] = [
  { id: "warm-earthy", label: "Warm Earthy", desc: "Editorial serif style with rich warm tones and natural textures.", tag: "Editorial" },
  { id: "cinematic", label: "Cinematic Luxury", desc: "Dark mode elegance with GSAP animations and dramatic visuals.", tag: "Dark Mode" },
  { id: "membership", label: "Membership Promo", desc: "Gold and navy promo design focused on club tiers and exclusivity.", tag: "Promo" },
  { id: "mice", label: "MICE Professional", desc: "Corporate style built for venue specifications and B2B audiences.", tag: "Corporate" },
];

const SECTIONS: { id: string; label: string; icon: React.ReactNode }[] = [
  {
    id: "hero",
    label: "Hero",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    id: "properties",
    label: "Properties",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "features",
    label: "Features",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: "offers",
    label: "Offers",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    id: "membership",
    label: "Membership",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: "page-headers",
    label: "Page Headers",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 7V4h16v3" />
        <path d="M9 20h6" />
        <path d="M12 4v16" />
      </svg>
    ),
  },
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

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.reload();
    } catch {
      setToast({ message: "Failed to logout.", type: "error" });
    }
  };

  const sectionTitles: Record<string, string> = {
    hero: "Hero Section",
    properties: "Properties",
    features: "Features & Amenities",
    offers: "Special Offers",
    membership: "Membership Program",
    contact: "Contact Information",
    "page-headers": "Page Headers",
    template: "Active Template",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "#F7F5F2" }}>
      <CmsHeader
        language={language}
        onLanguageChange={setLanguage}
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        isSaving={isSaving}
        onLogout={handleLogout}
      />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <aside
          data-lenis-prevent="true"
          style={{
            width: 232,
            display: "flex",
            flexDirection: "column",
            background: "#0F1117",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            overflowY: "auto",
            flexShrink: 0,
          }}
        >
          {/* Sections label */}
          <div style={{ padding: "20px 16px 8px 16px" }}>
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}>
              Content Sections
            </span>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", padding: "0 8px", gap: 2 }}>
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    textAlign: "left",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    background: isActive ? "rgba(201, 150, 74, 0.12)" : "transparent",
                    color: isActive ? "#C9964A" : "rgba(255,255,255,0.45)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)";
                    }
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: 18,
                        borderRadius: "0 3px 3px 0",
                        background: "#C9964A",
                      }}
                    />
                  )}
                  <span style={{ opacity: isActive ? 1 : 0.6 }}>{sec.icon}</span>
                  {sec.label}
                </button>
              );
            })}
          </nav>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "12px 16px" }} />

          {/* Global */}
          <div style={{ padding: "0 8px 8px 8px" }}>
            <div style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              padding: "0 12px 8px 12px",
            }}>
              Global Settings
            </div>
            {(["template"] as const).map((id) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 500,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    background: isActive ? "rgba(201, 150, 74, 0.12)" : "transparent",
                    color: isActive ? "#C9964A" : "rgba(255,255,255,0.45)",
                    position: "relative",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)";
                    }
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: 18,
                        borderRadius: "0 3px 3px 0",
                        background: "#C9964A",
                      }}
                    />
                  )}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: isActive ? 1 : 0.6 }}>
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                  Active Template
                </button>
              );
            })}
          </div>

          {/* Bottom user info */}
          <div style={{ marginTop: "auto", padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
              Bumikarsa Bidakara Hotels
            </div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.12)", letterSpacing: "0.06em", marginTop: 2 }}>
              Content Management System v2
            </div>
          </div>
        </aside>

        {/* Main Editor */}
        <main data-lenis-prevent="true" style={{ flex: 1, overflowY: "auto", background: "#F7F5F2" }}>
          {/* Section breadcrumb bar */}
          <div
            style={{
              padding: "14px 40px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <span style={{ fontSize: 11, color: "#999", letterSpacing: "0.08em" }}>Content</span>
            <span style={{ fontSize: 11, color: "#bbb" }}>›</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#444", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {sectionTitles[activeSection] || activeSection}
            </span>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: language === "id" ? "#10B981" : "#3B82F6",
                }}
              />
              <span style={{ fontSize: 10, color: "#888", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {language === "id" ? "Indonesian" : "English"}
              </span>
            </div>
          </div>

          <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 40px 120px 40px" }}>

            {/* Template Picker */}
            {activeSection === "template" && (
              <div>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111", letterSpacing: "-0.02em", marginBottom: 8 }}>
                    Active Template
                  </h2>
                  <p style={{ fontSize: 14, color: "#777", lineHeight: 1.6, maxWidth: 480 }}>
                    Select the visual skin that wraps your content. This change affects the entire live website appearance.
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {TEMPLATES.map((tmpl) => {
                    const isActive = activeTemplate === tmpl.id;
                    return (
                      <button
                        key={tmpl.id}
                        onClick={() => setActiveTemplate(tmpl.id)}
                        style={{
                          textAlign: "left",
                          padding: "20px 22px",
                          borderRadius: 12,
                          border: isActive ? "2px solid #C9964A" : "2px solid #E5E1DB",
                          background: isActive ? "rgba(201,150,74,0.04)" : "#fff",
                          cursor: "pointer",
                          transition: "all 0.18s ease",
                          boxShadow: isActive ? "0 0 0 4px rgba(201,150,74,0.1), 0 4px 16px rgba(0,0,0,0.06)" : "0 1px 4px rgba(0,0,0,0.05)",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
                          <h3 style={{ fontSize: 15, fontWeight: 700, color: isActive ? "#8a6426" : "#1a1a1a", margin: 0 }}>
                            {tmpl.label}
                          </h3>
                          <span style={{
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            padding: "3px 8px",
                            borderRadius: 100,
                            background: isActive ? "rgba(201,150,74,0.15)" : "rgba(0,0,0,0.05)",
                            color: isActive ? "#8a6426" : "#888",
                          }}>
                            {tmpl.tag}
                          </span>
                        </div>
                        <p style={{ fontSize: 13, color: "#888", lineHeight: 1.55, margin: 0 }}>{tmpl.desc}</p>
                        {isActive && (
                          <div style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: "#C9964A",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeSection === "hero" && <HeroSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "properties" && <PropertiesSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "features" && <FeaturesSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "offers" && <OffersSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "membership" && <MembershipSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "contact" && <ContactSection content={currentContent} onChange={setCurrentContent} />}
            {activeSection === "page-headers" && <PageHeadersSection content={currentContent} onChange={setCurrentContent} />}
          </div>
        </main>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
      )}
    </div>
  );
}

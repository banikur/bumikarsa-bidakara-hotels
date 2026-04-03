"use client";

interface CmsHeaderProps {
  language: "id" | "en";
  onLanguageChange: (lang: "id" | "en") => void;
  hasUnsavedChanges: boolean;
  onSave: () => void;
  isSaving: boolean;
  onLogout: () => void;
}

export function CmsHeader({
  language,
  onLanguageChange,
  hasUnsavedChanges,
  onSave,
  isSaving,
  onLogout,
}: CmsHeaderProps) {
  return (
    <header
      style={{ background: "#0F1117", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      className="sticky top-0 z-50 flex items-center justify-between w-full h-[60px] px-6"
    >
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #C9964A 0%, #8a6426 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div className="flex flex-col leading-none">
          <span style={{ color: "#F5F0E8", fontSize: 13, fontWeight: 700, letterSpacing: "0.05em" }}>
            Bidakara CMS
          </span>
          <span style={{ color: "#C9964A", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 1 }}>
            Production Console
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Unsaved indicator */}
        {hasUnsavedChanges && (
          <div className="flex items-center gap-1.5 mr-1">
            <div
              style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", boxShadow: "0 0 6px #F59E0B" }}
            />
            <span style={{ color: "#D4B483", fontSize: 11, letterSpacing: "0.1em", fontWeight: 600 }}>
              UNSAVED
            </span>
          </div>
        )}

        {/* Language Toggle */}
        <div
          style={{
            display: "flex",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: 3,
            gap: 2,
          }}
        >
          {(["id", "en"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => onLanguageChange(lang)}
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.15s ease",
                background: language === lang ? "#C9964A" : "transparent",
                color: language === lang ? "#0F1117" : "rgba(255,255,255,0.4)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {lang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
            </button>
          ))}
        </div>

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={!hasUnsavedChanges || isSaving}
          style={{
            padding: "8px 20px",
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            transition: "all 0.2s ease",
            cursor: hasUnsavedChanges ? "pointer" : "not-allowed",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: hasUnsavedChanges
              ? "linear-gradient(135deg, #C9964A 0%, #a87a34 100%)"
              : "rgba(255,255,255,0.06)",
            color: hasUnsavedChanges ? "#0F1117" : "rgba(255,255,255,0.25)",
            boxShadow: hasUnsavedChanges ? "0 2px 12px rgba(201,150,74,0.35)" : "none",
          }}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  opacity="0.75"
                />
              </svg>
              Publishing...
            </>
          ) : hasUnsavedChanges ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Publish Changes
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              All Saved
            </>
          )}
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.08)" }} />

        {/* Logout */}
        <button
          onClick={onLogout}
          title="Logout"
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.4)",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </header>
  );
}

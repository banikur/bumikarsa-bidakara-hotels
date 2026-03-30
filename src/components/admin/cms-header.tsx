"use client";

interface CmsHeaderProps {
  language: "id" | "en";
  onLanguageChange: (lang: "id" | "en") => void;
  hasUnsavedChanges: boolean;
  onSave: () => void;
  isSaving: boolean;
}

export function CmsHeader({ language, onLanguageChange, hasUnsavedChanges, onSave, isSaving }: CmsHeaderProps) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-6 bg-background/95 backdrop-blur border-b shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold tracking-tight text-foreground">Bidakara CMS</h1>
        <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full">
          Production
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* Language Toggle */}
        <div className="flex items-center bg-muted/50 p-1 rounded-md border border-border/50">
          <button
            onClick={() => onLanguageChange("id")}
            className={`px-3 py-1 text-xs font-bold transition-all rounded ${
              language === "id"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            🇮🇩 ID
          </button>
          <button
            onClick={() => onLanguageChange("en")}
            className={`px-3 py-1 text-xs font-bold transition-all rounded ${
              language === "en"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            🇬🇧 EN
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={onSave}
          disabled={!hasUnsavedChanges || isSaving}
          className={`px-5 py-2 text-sm font-bold tracking-wide uppercase transition-all rounded shadow-sm ${
            hasUnsavedChanges
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed border border-border"
          }`}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
              </svg>
              Saving...
            </span>
          ) : hasUnsavedChanges ? (
            "Save Changes"
          ) : (
            "Saved"
          )}
        </button>
      </div>
    </div>
  );
}

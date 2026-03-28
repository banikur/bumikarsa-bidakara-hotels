"use client";

import { useState, useTransition } from "react";
import { updateSiteConfig, logoutAction } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

type ConfigPayload = {
  id: string;
  active_template: string;
  locale: string;
  content_id: any;
  content_en: any;
};

const TEMPLATES = [
  { id: "corporate", label: "Corporate Standard (Navy)" },
  { id: "mice", label: "MICE Flagship (Light)" },
  { id: "cinematic", label: "Cinematic GSAP (Dark)" },
  { id: "membership", label: "Membership Drive (Premium)" },
  { id: "warm_earthy", label: "Warm & Earthy (New Default)" },
];

export function AdminPanel({ initialConfig }: { initialConfig: ConfigPayload }) {
  const router = useRouter();
  const [config, setConfig] = useState<ConfigPayload>(initialConfig);
  const [isPending, startTransition] = useTransition();
  const [editLocale, setEditLocale] = useState<"id" | "en">("id");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await updateSiteConfig(config.id, {
        active_template: config.active_template,
        locale: config.locale,
        content_id: config.content_id,
        content_en: config.content_en,
      });
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
      router.refresh(); // Refresh server state
    } catch (err: any) {
      setSaveStatus("error");
      setErrorMessage(err.message || "Failed to save");
    }
  };

  const handleLogout = async () => {
    await logoutAction();
    router.refresh();
  };

  return (
    <div className="flex h-full w-full bg-slate-50 relative z-[200]">
      {/* Sidebar */}
      <aside className="w-80 border-r border-slate-200 bg-white shadow-sm flex flex-col h-full overflow-y-auto">
        <div className="p-6 border-b border-slate-100">
          <h1 className="font-display text-2xl font-bold text-slate-800">
            Bumikarsa CMS
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Site Configuration & Templates
          </p>
        </div>

        <div className="p-6 space-y-8 flex-1">
          {/* Template Selection */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Active Template
            </h3>
            <div className="space-y-2">
              {TEMPLATES.map((tpl) => (
                <label
                  key={tpl.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    config.active_template === tpl.id
                      ? "border-blue-500 bg-blue-50/50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="active_template"
                    value={tpl.id}
                    checked={config.active_template === tpl.id}
                    onChange={(e) =>
                      setConfig({ ...config, active_template: e.target.value })
                    }
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span
                    className={`text-sm ${
                      config.active_template === tpl.id
                        ? "font-medium text-slate-900"
                        : "text-slate-600"
                    }`}
                  >
                    {tpl.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Default Locale */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Default Locale
            </h3>
            <select
              value={config.locale}
              onChange={(e) => setConfig({ ...config, locale: e.target.value })}
              className="w-full text-sm border-slate-200 rounded-md p-2 bg-slate-50 outline-none focus:border-blue-500"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English (UK)</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700 uppercase tracking-wider"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-slate-50">
        <header className="px-10 py-5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-slate-800">Content Editor</h2>
            <div className="flex bg-slate-100 p-1 rounded-md">
              <button
                onClick={() => setEditLocale("id")}
                className={`px-4 py-1.5 text-xs font-medium rounded-sm uppercase tracking-wider transition-colors ${
                  editLocale === "id"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Indonesia
              </button>
              <button
                onClick={() => setEditLocale("en")}
                className={`px-4 py-1.5 text-xs font-medium rounded-sm uppercase tracking-wider transition-colors ${
                  editLocale === "en"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                English
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {saveStatus === "success" && (
              <span className="text-sm text-green-600 font-medium tracking-wide">
                Saved!
              </span>
            )}
            {saveStatus === "error" && (
              <span className="text-sm text-red-600 font-medium tracking-wide">
                {errorMessage}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium tracking-wide rounded hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50"
            >
              {saveStatus === "saving" ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-4xl grid gap-8">
            <JsonForm 
              data={editLocale === "id" ? config.content_id : config.content_en} 
              onChange={(newData) => {
                setConfig((prev) => ({
                  ...prev,
                  [editLocale === "id" ? "content_id" : "content_en"]: newData
                }))
              }} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// A simple recursive JSON form renderer
function JsonForm({ data, onChange }: { data: any, onChange: (d: any) => void }) {
  if (typeof data !== 'object' || data === null) return null;

  return (
    <div className="space-y-8">
      {Object.entries(data).map(([key, value]) => {
        if (typeof value === "string") {
          return (
            <div key={key} className="flex flex-col gap-2 bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {value.length > 60 ? (
                <textarea
                  className="w-full text-sm border-slate-200 rounded p-3 bg-slate-50 outline-none focus:border-blue-500 min-h-[100px]"
                  value={value}
                  onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                />
              ) : (
                <input
                  type="text"
                  className="w-full text-sm border-slate-200 rounded p-3 bg-slate-50 outline-none focus:border-blue-500"
                  value={value}
                  onChange={(e) => onChange({ ...data, [key]: e.target.value })}
                />
              )}
            </div>
          );
        }

        if (Array.isArray(value)) {
          return (
            <div key={key} className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm space-y-4">
               <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {key} (List)
              </label>
              <textarea
                className="w-full text-sm font-mono border-slate-200 rounded p-3 bg-slate-50 outline-none focus:border-blue-500 min-h-[200px]"
                value={JSON.stringify(value, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    onChange({ ...data, [key]: parsed });
                  } catch (err) {
                    // Just ignore parsing errors while typing
                  }
                }}
              />
            </div>
          )
        }

        if (typeof value === "object") {
          return (
            <div key={key} className="bg-white p-6 rounded border border-slate-200 space-y-4">
              <h2 className="text-lg font-display text-slate-800 capitalize border-b pb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</h2>
              <JsonForm
                data={value}
                onChange={(newValue) => onChange({ ...data, [key]: newValue })}
              />
            </div>
          );
        }

        return null; // hide booleans/numbers for now
      })}
    </div>
  );
}

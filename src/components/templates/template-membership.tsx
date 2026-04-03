"use client";

import { useState } from "react";
import { UniversalContent } from "@/types/cms.types";

type Tier = "silver" | "gold" | "platinum";

const TIERS: Record<Tier, { label: string; color: string; textColor: string; price: string; benefits: string[] }> = {
  silver: {
    label: "BMC Silver",
    color: "linear-gradient(135deg, #e2e2e2 0%, #c8c8c8 100%)",
    textColor: "#1a1a1a",
    price: "FREE to join",
    benefits: ["10% room discount", "15% F&B discount", "Welcome voucher IDR 500,000", "Birthday complimentary breakfast", "Monthly offers newsletter"],
  },
  gold: {
    label: "BMC Gold",
    color: "linear-gradient(135deg, #b8860b 0%, #C9A96E 50%, #e8c98a 100%)",
    textColor: "#ffffff",
    price: "FREE to upgrade",
    benefits: ["20% room discount", "25% F&B discount", "IDR 1,000,000 welcome vouchers", "Free airport transfer 1x/month", "Room upgrade priority", "Anniversary free night"],
  },
  platinum: {
    label: "BMC Platinum",
    color: "linear-gradient(135deg, #0A192F 0%, #1a3358 60%, #0A192F 100%)",
    textColor: "#C9A96E",
    price: "FREE to upgrade",
    benefits: ["All Gold benefits included", "IDR 2,000,000 annual vouchers", "Guaranteed suite upgrade", "Dedicated personal concierge 24/7", "Private networking events", "3 free nights / year"],
  },
};

export function TemplateMembership({ copy }: { copy: UniversalContent }) {
  const [activeTier, setActiveTier] = useState<Tier>("silver");

  // Try to use CMS tiers if available, otherwise fallback to local hardcoded
  const dynamicTiers = copy.membership?.tiers && copy.membership.tiers.length >= 3
    ? copy.membership.tiers
    : [
        { name: TIERS.silver.label, benefits: TIERS.silver.benefits },
        { name: TIERS.gold.label, benefits: TIERS.gold.benefits },
        { name: TIERS.platinum.label, benefits: TIERS.platinum.benefits }
      ];

  const getTierContent = (t: Tier) => {
    const idx = t === "silver" ? 0 : t === "gold" ? 1 : 2;
    const cmsT = dynamicTiers[idx];
    return {
      label: cmsT?.name || TIERS[t].label,
      benefits: cmsT?.benefits || TIERS[t].benefits,
      color: TIERS[t].color,
      textColor: TIERS[t].textColor,
      price: TIERS[t].price
    };
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FDFBF7", color: "#1a1a1a", WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;600;700;800&display=swap');
        .mem-heading { font-family: 'Poppins', sans-serif; }
        .mem-gold-grad { background: linear-gradient(135deg, #C9A96E, #e8c98a, #C9A96E); }
        .mem-shine { background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%); background-size:200% 100%; animation: shine 2.5s infinite; }
        @keyframes shine { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .mem-card { transition: transform 0.25s, box-shadow 0.25s; }
        .mem-card:hover { transform: scale(1.025); box-shadow: 0 16px 40px rgba(10,25,47,0.15); }
        .mem-voucher { border: 2px dashed #C9A96E; position: relative; }
        .mem-voucher::before { content:''; position:absolute; left:-12px; top:50%; transform:translateY(-50%); width:24px; height:24px; background:#FDFBF7; border-radius:50%; border:2px dashed #C9A96E; }
        .mem-voucher::after { content:''; position:absolute; right:-12px; top:50%; transform:translateY(-50%); width:24px; height:24px; background:#FDFBF7; border-radius:50%; border:2px dashed #C9A96E; }
        .mem-btn-primary { background:#0A192F; color:white; transition:all 0.3s; display:inline-block; text-decoration:none; text-align:center; cursor:pointer; border:none; }
        .mem-btn-primary:hover { background:#C9A96E; color:#0A192F; }
        .mem-btn-gold { background:linear-gradient(135deg,#C9A96E,#e8c98a,#C9A96E); color:#0A192F; display:inline-block; text-decoration:none; text-align:center; cursor:pointer; border:none; }
        .mem-btn-gold:hover { opacity:0.9; }
        .mem-badge { display:inline-flex; align-items:center; gap:4px; font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:2px 10px; border-radius:9999px; }
      `}</style>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0A192F 60%, #1a3358)", position: "relative", overflow: "hidden", padding: "80px 16px 112px" }}>
        {copy.hero.background_image_url && (
           <div style={{ position: "absolute", inset: 0, opacity: 0.15, backgroundImage: `url('${copy.hero.background_image_url}')`, backgroundSize: "cover", backgroundPosition: "center", mixBlendMode: "luminosity", pointerEvents: "none" }} />
        )}
        <div style={{ position: "absolute", top: -80, right: -80, width: 384, height: 384, borderRadius: "50%", background: "rgba(201,169,110,0.1)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 288, height: 288, borderRadius: "50%", background: "rgba(201,169,110,0.05)", filter: "blur(48px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 768, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#C9A96E", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "8px 20px", borderRadius: 9999 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            Bidakara Members Club
          </div>

          <h1 className="mem-heading" style={{ fontWeight: 800, color: "white", fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.15, marginBottom: 20 }}>
            {(() => {
              const words = (copy.membership?.headline || "").split(" ").filter(Boolean);
              const mid = Math.ceil(words.length / 2) || 2;
              return (
                <>
                  {words.slice(0, mid).join(" ") || "Elevate"}<br />
                  <span style={{ color: "#C9A96E" }}>{words.slice(mid).join(" ") || "Your Lifestyle"}</span>
                </>
              );
            })()}
          </h1>
          <p style={{ color: "#d1d5db", fontSize: 18, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>
            {copy.membership?.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, marginBottom: 48 }}>
            {[{ n: "25%", l: "Max F&B Discount" }, { n: "5+", l: "Properties" }, { n: "IDR 2jt", l: "Welcome Vouchers" }, { n: "3", l: "Membership Tiers" }].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div className="mem-heading" style={{ fontWeight: 700, color: "#C9A96E", fontSize: 32 }}>{s.n}</div>
                <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            <a href="#signup" className="mem-btn-gold" style={{ padding: "16px 32px", borderRadius: 9999, fontWeight: 700, fontSize: 16, boxShadow: "0 8px 24px rgba(201,169,110,0.3)" }}>
              {copy.hero.cta_primary || "Sign Up BMC Now — It's Free →"}
            </a>
            <a href="#tiers" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "white", fontWeight: 600, fontSize: 16, padding: "16px 32px", borderRadius: 9999, textDecoration: "none", transition: "background 0.3s" }}>
              {copy.hero.cta_secondary || "View Member Tiers"}
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" style={{ background: "#F5EDD8", padding: "64px 16px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#C9A96E", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Why Join BMC</p>
            <h2 className="mem-heading" style={{ fontWeight: 700, color: "#0A192F", fontSize: "clamp(24px, 4vw, 36px)" }}>Your Privileges Await</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
            {copy.features.map((b, i) => (
              <div key={b.id} className="mem-card" style={{ background: "white", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                {b.image_url ? 
                  <img src={b.image_url} alt={b.title} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} /> : 
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(201,169,110,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>⭐</div>
                }
                <span className="mem-heading" style={{ fontWeight: 600, color: "#0A192F", fontSize: 14 }}>{b.title}</span>
                <span style={{ color: "#4B5563", fontSize: 12 }}>{b.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP TIERS */}
      <section id="tiers" style={{ padding: "80px 16px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#C9A96E", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Membership Tiers</p>
            <h2 className="mem-heading" style={{ fontWeight: 700, color: "#0A192F", fontSize: "clamp(24px, 4vw, 36px)" }}>Choose Your Level</h2>
            <p style={{ color: "#4B5563", marginTop: 8 }}>All tiers are free to join. Upgrade based on annual spend.</p>
          </div>

          {/* Tier tabs */}
          <div style={{ display: "flex", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden", maxWidth: 360, margin: "0 auto 40px" }}>
            {(["silver", "gold", "platinum"] as Tier[]).map((t) => (
              <button key={t} onClick={() => setActiveTier(t)}
                style={{ flex: 1, padding: "12px", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", transition: "background 0.2s, color 0.2s", background: activeTier === t ? "#0A192F" : "white", color: activeTier === t ? "white" : "#4B5563", borderRight: t !== "platinum" ? "1px solid #e5e7eb" : "none" }}>
                {getTierContent(t).label.split(" ").slice(-1)[0]}
              </button>
            ))}
          </div>

          {/* Active tier content */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
            <div style={{ background: getTierContent(activeTier).color, borderRadius: 24, padding: 32, position: "relative", overflow: "hidden" }}>
              <div className="mem-shine" style={{ position: "absolute", top: 16, right: 16, width: 96, height: 96, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
              <span className="mem-badge" style={{ background: "rgba(255,255,255,0.25)", color: getTierContent(activeTier).textColor, marginBottom: 16 }}>
                {getTierContent(activeTier).label}
                {activeTier === "gold" && " — Most Popular"}
              </span>
              <h3 className="mem-heading" style={{ fontWeight: 700, color: getTierContent(activeTier).textColor, fontSize: 28, marginBottom: 4 }}>{getTierContent(activeTier).label}</h3>
              <div style={{ fontSize: 36, fontWeight: 800, color: getTierContent(activeTier).textColor, marginBottom: 4 }}>
                FREE <span style={{ fontSize: 18, fontWeight: 400, opacity: 0.7 }}>{getTierContent(activeTier).price.split(" ").slice(1).join(" ")}</span>
              </div>
              <a href="#signup" className="mem-btn-primary" style={{ marginTop: 24, padding: "12px 24px", borderRadius: 9999, fontSize: 14, fontWeight: 700 }}>
                Join {getTierContent(activeTier).label.split(" ").slice(-1)[0]} Free →
              </a>
            </div>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {getTierContent(activeTier).benefits.map((b) => (
                <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: "#0A192F", fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section style={{ padding: "80px 16px", background: "#F5EDD8" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ color: "#C9A96E", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Exclusive for Members</p>
              <h2 className="mem-heading" style={{ fontWeight: 700, color: "#0A192F", fontSize: "clamp(24px, 4vw, 36px)" }}>Special Offers</h2>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {copy.offers.map((offer) => (
              <div key={offer.id} className="mem-card" style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                {offer.image_url && <img src={offer.image_url} alt={offer.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />}
                <div style={{ padding: 20 }}>
                  <span className="mem-badge" style={{ background: "#F5EDD8", color: "#0A192F", marginBottom: 12 }}>{offer.badge || "PROMO"}</span>
                  <h3 className="mem-heading" style={{ fontWeight: 600, color: "#0A192F", fontSize: 18, marginBottom: 8 }}>{offer.title}</h3>
                  <p style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{offer.subtitle}</p>
                  <a href="#signup" className="mem-btn-primary" style={{ display: "block", padding: "10px", borderRadius: 12, fontSize: 14, fontWeight: 700 }}>
                    Book as Member
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGN UP / CONTACT */}
      <section id="signup" style={{ padding: "80px 16px", background: "linear-gradient(135deg, #C9A96E 0%, #e8c98a 40%, #C9A96E 100%)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, background: "rgba(10,25,47,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0A192F" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </div>
          <h2 className="mem-heading" style={{ fontWeight: 800, color: "#0A192F", fontSize: "clamp(32px, 5vw, 48px)", marginBottom: 16 }}>Sign Up BMC Now</h2>
          <p style={{ color: "rgba(10,25,47,0.7)", fontSize: 18, marginBottom: 40 }}>
            {copy.contact?.footer_tagline || "Join thousands of members enjoying luxury for less."}
          </p>
          <form style={{ background: "white", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", padding: 32, textAlign: "left" }} onSubmit={e => e.preventDefault()}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[{ l: "Full Name", t: "text", p: "Budi Santoso" }, { l: "Email", t: "email", p: "budi@email.com" }, { l: "Phone / WhatsApp", t: "tel", p: "+62 8xx xxxx xxxx" }].map(f => (
                <div key={f.l} style={{ gridColumn: f.l === "Full Name" || f.l === "Email" ? undefined : "1/-1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 12, padding: "10px 16px", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
            <button type="submit" className="mem-btn-gold" style={{ width: "100%", padding: "16px", borderRadius: 12, fontWeight: 700, fontSize: 16 }}>
              🎉 Create My BMC Account — Free!
            </button>
            <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 12 }}>No spam — only exclusive member deals.</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#071120", color: "#9ca3af", padding: "40px 16px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div>
            <h3 className="mem-heading" style={{ fontWeight: 700, color: "white", marginBottom: 4 }}>Bumikarsa Bidakara Hotels Management</h3>
            <p style={{ fontSize: 12 }}>{copy.contact?.address || "Jl. Gatot Subroto Kav. 71-73, Pancoran, Jakarta Selatan 12870"}</p>
            <p style={{ fontSize: 12 }}>Tel: {copy.contact?.phone || "+62 21 8379 3555"} | Email: {copy.contact?.email}</p>
          </div>
          <p style={{ fontSize: 12 }}>© 2026 Bumikarsa Bidakara. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UniversalContent } from "@/types/cms.types";

export function TemplateCinematic({ copy }: { copy: UniversalContent }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#0a0a0f", color: "#F5F0E8", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500&display=swap');
        .cin-serif { font-family: 'Playfair Display', Georgia, serif; }
        .cin-gold-text { background: linear-gradient(135deg,#D4AF77 0%,#E8C547 50%,#D4AF77 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .cin-glass { background:rgba(26,28,35,0.4); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.05); }
        .cin-glass-nav { background:rgba(10,10,15,0.4); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border-bottom:1px solid rgba(212,175,119,0.1); }
        .cin-btn { background:rgba(212,175,119,0.1); border:1px solid rgba(212,175,119,0.4); color:#E8C547; position:relative; overflow:hidden; transition:all 0.4s cubic-bezier(0.165,0.84,0.44,1); border-radius:9999px; backdrop-filter:blur(4px); cursor:pointer; }
        .cin-btn::after { content:''; position:absolute; background:linear-gradient(135deg,#D4AF77 0%,#E8C547 100%); top:0;left:0;right:0;bottom:0; opacity:0; z-index:-1; transition:opacity 0.4s; }
        .cin-btn:hover { color:#0a0a0f; transform:scale(1.05); box-shadow:0 0 20px rgba(232,197,71,0.4); border-color:transparent; }
        .cin-btn:hover::after { opacity:1; }
        .cin-reveal { position:relative; transition:all 0.4s cubic-bezier(0.4,0,0.2,1); }
        .cin-reveal::after { content:''; position:absolute; inset:0; border:1px solid #D4AF77; opacity:0; transform:scale(0.95); transition:all 0.6s cubic-bezier(0.4,0,0.2,1); pointer-events:none; z-index:10; }
        .cin-reveal:hover { transform:scale(1.02); box-shadow:0 25px 50px -12px rgba(0,0,0,0.8); z-index:20; }
        .cin-reveal:hover::after { opacity:1; transform:scale(1); }
        .cin-reveal img { transition:all 0.8s cubic-bezier(0.4,0,0.2,1); }
        .cin-reveal:hover img { filter:brightness(1.1) contrast(1.1); transform:scale(1.05); }
        .cin-text-reveal { transform:translateY(20px); opacity:0; transition:all 0.4s cubic-bezier(0.4,0,0.2,1) 0.1s; }
        .cin-reveal:hover .cin-text-reveal { transform:translateY(0); opacity:1; }
        .cin-noise { position:fixed; top:0;left:0;right:0;bottom:0; pointer-events:none; z-index:9999; opacity:0.03; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
        .cin-loading { position:fixed; top:0;left:0; height:2px; background:linear-gradient(90deg,#D4AF77,#E8C547,#D4AF77); background-size:200% auto; z-index:10000; animation:cinLoad 2s ease-in-out forwards; }
        @keyframes cinLoad { 0%{width:0%;opacity:1} 80%{width:100%;opacity:1} 100%{width:100%;opacity:0} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .cin-hero-in1 { animation:fadeInUp 1s ease 0.5s both; }
        .cin-hero-in2 { animation:fadeInUp 1.5s ease 1s both; }
        .cin-hero-in3 { animation:fadeInUp 1.5s ease 1.5s both; }
      `}</style>

      <div className="cin-noise" />
      <div className="cin-loading" />

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 50 }} className="cin-glass-nav">
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
            <a href="#destinations" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,240,232,0.7)", textDecoration: "none", transition: "color 0.4s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#D4AF77")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}>
              Destinations
            </a>
            <a href="#experiences" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,240,232,0.7)", textDecoration: "none", transition: "color 0.4s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#D4AF77")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}>
              Experiences
            </a>
          </div>

          <a href="#" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>
            <span className="cin-serif cin-gold-text" style={{ fontSize: 28, fontWeight: 500, letterSpacing: "0.05em" }}>BUMIKARSA</span>
            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(212,175,119,0.8)", marginTop: 4 }}>Hotels &amp; Resorts</span>
          </a>

          <a href="#reserve" className="cin-btn" style={{ padding: "10px 32px", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", zIndex: 10, display: "inline-block" }}>
            Reserve
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header style={{ position: "relative", height: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={copy.hero.background_image_url || "https://images.unsplash.com/photo-1499591934245-40b55745b905?q=80&w=2000&auto=format&fit=crop"}
            alt="Luxury Hotel" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transform: "scale(1.05)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, transparent 0%, rgba(10,10,15,0.8) 100%), linear-gradient(to bottom, rgba(10,10,15,0.5) 0%, transparent 40%, rgba(10,10,15,0.9) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 16px", marginTop: 64 }}>
          <p className="cin-hero-in1" style={{ color: "#D4AF77", textTransform: "uppercase", letterSpacing: "0.4em", fontSize: 12, fontWeight: 300, marginBottom: 24 }}>
            CINEMATIC
          </p>
          <h1 className="cin-serif cin-hero-in2" style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 500, color: "#F5F0E8", lineHeight: 1.1, marginBottom: 32, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            {(copy.hero.headline || "Welcome").split(" ").slice(0, 4).join(" ")} <br />
            <span className="cin-gold-text" style={{ fontStyle: "italic" }}>
              {(copy.hero.headline || "Welcome").split(" ").slice(4).join(" ")}
            </span>
          </h1>
          <p className="cin-hero-in1" style={{ color: "rgba(245,240,232,0.7)", fontSize: 15, fontWeight: 300, maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.7 }}>
            {copy.hero.subtitle || copy.hero.description}
          </p>
        </div>

        {/* Floating booking widget */}
        <div id="reserve" className="cin-hero-in3 cin-glass" style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", width: "90%", maxWidth: 800, padding: "24px 32px", borderRadius: 16 }}>
          <form style={{ display: "flex", gap: 24, alignItems: "flex-end", justifyContent: "space-between" }} onSubmit={e => e.preventDefault()}>
            {["Arrival", "Departure"].map(f => (
              <div key={f} style={{ flex: 1 }}>
                <label style={{ display: "block", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,240,232,0.5)", marginBottom: 8 }}>{f}</label>
                <input type="date" style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", color: "#F5F0E8", fontSize: 14, fontWeight: 300, padding: "4px 0", outline: "none" }} />
              </div>
            ))}
            <div style={{ flex: "0 0 120px" }}>
              <label style={{ display: "block", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,240,232,0.5)", marginBottom: 8 }}>Guests</label>
              <select style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)", color: "#F5F0E8", fontSize: 14, padding: "4px 0", outline: "none", cursor: "pointer" }}>
                {[1, 2, 3, 4].map(n => <option key={n} value={n} style={{ background: "#0a0a0f" }}>{n}</option>)}
              </select>
            </div>
            <button type="submit" className="cin-btn" style={{ padding: "12px 24px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500 }}>
              {copy.hero.cta_primary || "Find Suites →"}
            </button>
          </form>
        </div>
      </header>

      {/* PORTFOLIO HORIZONTAL SCROLL */}
      <section id="destinations" style={{ padding: "128px 0", background: "#0a0a0f", borderBottom: "1px solid #1a1c23", overflow: "hidden" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px 64px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
          <div>
            <p style={{ color: "#D4AF77", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: 16 }}>Our Residences</p>
            <h2 className="cin-serif" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#F5F0E8", fontWeight: 300, lineHeight: 1.2 }}>
              Destinations <br /><em style={{ color: "rgba(212,175,119,0.8)" }}>Sanctuaries</em>
            </h2>
          </div>
        </div>

        <div style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", paddingLeft: 48, paddingBottom: 32, gap: 32 }}>
          {copy.properties.map((hotel, i) => (
            <div key={hotel.id} className="cin-reveal" style={{ flex: "0 0 calc(40vw - 2rem)", scrollSnapAlign: "center", cursor: "pointer" }}>
              <div style={{ position: "relative", height: "60vh", width: "100%", overflow: "hidden" }}>
                <img src={hotel.image_url || "https://images.unsplash.com/photo-1499591934245-40b55745b905?q=80&w=2000&auto=format&fit=crop"} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)", opacity: 0.9 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, padding: 32, width: "100%", boxSizing: "border-box" }}>
                  <p className="cin-text-reveal" style={{ fontSize: 12, color: "#D4AF77", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>{hotel.location}</p>
                  <h3 className="cin-serif" style={{ fontSize: 28, color: "#F5F0E8", marginBottom: 8 }}>{hotel.name}</h3>
                  <p className="cin-text-reveal" style={{ fontSize: 14, color: "rgba(245,240,232,0.6)", fontWeight: 300, maxWidth: 320 }}>{hotel.abstract}</p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ flex: "0 0 32px" }} />
        </div>
      </section>

      {/* EXPERIENCES GRID */}
      <section id="experiences" style={{ padding: "128px 0", background: "linear-gradient(to bottom, #0a0a0f 0%, #1a1c23 100%)", position: "relative" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <h2 className="cin-serif" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#F5F0E8", fontWeight: 300, marginBottom: 16 }}>
              Experiences
            </h2>
            <div style={{ width: 1, height: 64, background: "#D4AF77", margin: "0 auto", opacity: 0.5 }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 32, minHeight: 800 }}>
            {/* Large item */}
            <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
              className="cin-reveal">
              <img src={copy.features[0]?.image_url || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop"}
                alt={copy.features[0]?.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(15,17,21,0.4)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "48px" }}>
                <h3 className="cin-serif" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "#F5F0E8", marginBottom: 16 }}>
                  {copy.features[0]?.title}
                </h3>
                <p className="cin-text-reveal" style={{ color: "rgba(245,240,232,0.8)", fontWeight: 300, maxWidth: 400 }}>
                  {copy.features[0]?.description}
                </p>
                <div style={{ width: 0, height: 1, background: "#D4AF77", marginTop: 24, transition: "width 0.8s ease-in-out" }}
                  onMouseEnter={e => (e.currentTarget.style.width = "96px")}
                  onMouseLeave={e => (e.currentTarget.style.width = "0")} />
              </div>
            </div>

            {/* 2 small items stacked */}
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 32 }}>
              {copy.features.slice(1, 3).map((exp) => (
                <div key={exp.id} className="cin-reveal" style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
                  <img src={exp.image_url || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop"} alt={exp.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 50%)" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 32 }}>
                    <span className="cin-text-reveal" style={{ fontSize: 10, color: "#D4AF77", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>
                      SIGNATURE
                    </span>
                    <h3 className="cin-serif" style={{ fontSize: 28, color: "#F5F0E8" }}>{exp.title}</h3>
                    <div style={{ width: 0, height: 1, background: "#D4AF77", marginTop: 16, transition: "width 0.8s" }}
                      onMouseEnter={e => (e.currentTarget.style.width = "64px")}
                      onMouseLeave={e => (e.currentTarget.style.width = "0")} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE COLLECTIONS / OFFERS */}
      <section style={{ padding: "128px 0", background: "#0F1115" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, gap: 24 }}>
            <div>
              <h2 className="cin-serif" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#F5F0E8", fontWeight: 300, marginBottom: 16 }}>
                Signature Collections
              </h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {copy.offers.map((offer) => (
              <div key={offer.id} className="cin-glass" style={{ padding: 0, cursor: "pointer", overflow: "hidden", transition: "transform 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                <div style={{ padding: "32px" }}>
                  <span style={{ fontSize: 10, color: "#D4AF77", textTransform: "uppercase", letterSpacing: "0.2em" }}>{offer.badge || "Signature"}</span>
                  <h3 className="cin-serif" style={{ fontSize: 24, color: "#F5F0E8", marginTop: 8, marginBottom: 12 }}>{offer.title}</h3>
                  <p style={{ color: "rgba(245,240,232,0.6)", fontSize: 14, fontWeight: 300, lineHeight: 1.7 }}>{offer.subtitle}</p>
                  <a href="/offers" className="cin-btn" style={{ display: "inline-block", marginTop: 24, padding: "8px 20px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
                    Explore →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section style={{ padding: "96px 0 128px", background: "linear-gradient(to bottom, #0a0a0f 0%, #1a1c23 50%, #2a2418 100%)", position: "relative", borderTop: "1px solid rgba(212,175,119,0.1)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 48px", textAlign: "center" }}>
          <h2 className="cin-serif" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#F5F0E8", fontWeight: 300, lineHeight: 1.3, marginBottom: 32 }}>
            {copy.membership?.headline || "Elite Membership"}
          </h2>
          <p style={{ color: "rgba(245,240,232,0.7)", fontWeight: 300, maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}>
            {copy.membership?.description}
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480, margin: "0 auto 48px", textAlign: "left", listStyle: "none", padding: 0 }}>
            {copy.membership?.tiers[0]?.benefits.map((b) => (
              <li key={b} style={{ display: "flex", gap: 12, fontSize: 14, color: "rgba(245,240,232,0.8)", fontWeight: 300, lineHeight: 1.6 }}>
                <span style={{ color: "#D4AF77", flexShrink: 0 }}>◆</span>
                {b}
              </li>
            ))}
          </ul>
          <a href="/membership" className="cin-btn" style={{ display: "inline-block", padding: "14px 48px", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500, textDecoration: "none" }}>
            Join Member Circle
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "128px 0", background: "#110e0a", borderTop: "1px solid rgba(212,175,119,0.2)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 12, color: "#D4AF77", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 16 }}>Reservations</p>
              <h2 className="cin-serif" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#F5F0E8", fontWeight: 300, lineHeight: 1.2, marginBottom: 24 }}>
                At Your Service
              </h2>
              <p style={{ color: "rgba(245,240,232,0.6)", fontWeight: 300, lineHeight: 1.8, marginBottom: 40 }}>
                {copy.contact?.footer_tagline}
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="#reserve" className="cin-btn" style={{ padding: "14px 32px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500, textDecoration: "none" }}>
                  {copy.hero.cta_primary}
                </a>
                <a href="/our-hotels" style={{ fontSize: 12, color: "rgba(245,240,232,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", borderBottom: "1px solid rgba(212,175,119,0.4)", paddingBottom: 2, alignSelf: "center" }}>
                  {copy.hero.cta_secondary}
                </a>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {[
                  { l: "Phone", v: copy.contact?.phone },
                  { l: "Email", v: copy.contact?.email },
                  { l: "Address", v: copy.contact?.address },
                ].map(r => ( r.v &&
                  <div key={r.l} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 20 }}>
                    <span style={{ fontSize: 10, color: "#D4AF77", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 8 }}>{r.l}</span>
                    <span style={{ fontSize: 15, color: "rgba(245,240,232,0.8)", fontWeight: 300 }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#110e0a", padding: "32px 48px", borderTop: "1px solid rgba(212,175,119,0.1)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span className="cin-serif cin-gold-text" style={{ fontSize: 20, fontWeight: 500 }}>BUMIKARSA</span>
          <p style={{ fontSize: 10, color: "rgba(245,240,232,0.4)", textTransform: "uppercase", letterSpacing: "0.15em" }}>© 2026 Bumikarsa Bidakara. All Privileges Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

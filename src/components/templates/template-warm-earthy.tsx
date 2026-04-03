"use client";

import Link from "next/link";
import { UniversalContent } from "@/types/cms.types";
import { Section, SectionAnchor } from "@/components/layout/section-anchor";

export function TemplateWarmEarthy({ copy }: { copy: UniversalContent }) {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FDFAF5", color: "#2C1A0E" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        :root{--parchment:#F7F1E6;--parchment-dark:#EDE4D3;--sand:#D4B896;--gold:#B8924A;--gold-light:#C9A96E;--espresso:#2C1A0E;--bark:#4A3728;--ink:#1C1007;--mist:#8B7B6B;--cream:#FDFAF5;}
        .ornament{display:inline-block;width:36px;height:1px;background:var(--gold);vertical-align:middle;margin:0 14px;}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);}
        @keyframes scrollLine{0%{left:-40px}100%{left:40px}}
        .scroll-line{width:40px;height:1px;background:rgba(184,146,74,0.5);position:relative;overflow:hidden;}
        .scroll-line::after{content:'';position:absolute;top:0;left:-40px;width:40px;height:1px;background:var(--gold);animation:scrollLine 2s ease-in-out infinite;}
      `}</style>

<<<<<<< HEAD
=======
      {/* NAV handled globally in app/layout with Navbar (keep header consistent across templates) */}

>>>>>>> 1ebe353c3d1ab9ffde9ef71134a30e7f0e75f449
      {/* HERO */}
      <Section id="about" style={{ position: "relative", height: "100vh", minHeight: 700, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${copy.hero.background_image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80"}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,16,7,0.82) 0%, rgba(28,16,7,0.45) 45%, rgba(28,16,7,0.12) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, padding: "0 40px 80px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <p className="eyebrow" style={{ color: "var(--gold-light)", marginBottom: 20 }}>
            <span className="ornament" />
            Welcoming
            <span className="ornament" />
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 300, lineHeight: 1.06, color: "var(--cream)", letterSpacing: "-0.01em", maxWidth: 900, marginBottom: 28 }}>
            {(copy.hero.headline || "Welcome").split("&").map((part, i) => (
              <span key={i}>{i > 0 ? <em style={{ fontStyle: "italic", color: "var(--sand)" }}>&amp;</em> : null}{part}</span>
            ))}
          </h1>
          <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(253,250,245,0.72)", maxWidth: 440, lineHeight: 1.7, marginBottom: 40 }}>
            {copy.hero.subtitle || copy.hero.description}
          </p>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <a href="#properties" className="we-cta">{copy.hero.cta_primary || "Explore Hotels"}</a>
            <a href="#contact" style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(253,250,245,0.7)", textDecoration: "none", borderBottom: "1px solid rgba(184,146,74,0.4)", paddingBottom: 2, transition: "color 0.3s, border-color 0.3s" }}>
              {copy.hero.cta_secondary || "Contact Us"}
            </a>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 36, right: 40, display: "flex", alignItems: "center", gap: 10, fontSize: 10, fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(253,250,245,0.45)", zIndex: 10 }}>
          <span className="scroll-line" />
          Scroll
        </div>
      </Section>

      {/* HOTELS / PROPERTIES */}
      <Section id="properties" style={{ padding: "120px 0", background: "var(--parchment)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
            <div>
              <p className="eyebrow">Our Properties</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 58px)", fontWeight: 400, lineHeight: 1.1, color: "var(--espresso)", marginTop: 14 }}>
                Featured Hotels
              </h2>
            </div>
            <a href="/our-hotels" style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", textDecoration: "none", borderBottom: "1px solid var(--gold)", paddingBottom: 2, whiteSpace: "nowrap", transition: "opacity 0.3s" }}>
              View All
            </a>
          </div>

          <div style={{ display: "flex", gap: 24, overflowX: "auto", paddingBottom: 16, scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
            {copy.properties?.map((hotel) => (
              <Link key={hotel.id} href={`/our-hotels/${hotel.id}`}
                style={{ flex: "0 0 360px", scrollSnapAlign: "start", position: "relative", overflow: "hidden", cursor: "pointer", textDecoration: "none", display: "block" }}>
                <div style={{ width: "100%", height: 440, overflow: "hidden" }}>
                  <img src={hotel.image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"} alt={hotel.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,16,7,0.8) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28 }}>
                  <span style={{ display: "inline-block", fontSize: 9, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-light)", border: "1px solid rgba(184,146,74,0.4)", padding: "4px 10px", marginBottom: 10 }}>
                    FEATURED
                  </span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, lineHeight: 1.15, color: "var(--cream)", marginBottom: 6 }}>{hotel.name}</h3>
                  <p style={{ fontSize: 12, fontWeight: 300, color: "rgba(253,250,245,0.6)", letterSpacing: "0.06em" }}>{hotel.location}</p>
                  <p style={{ fontSize: 13, fontWeight: 300, color: "rgba(253,250,245,0.55)", marginTop: 8, lineHeight: 1.6 }}>{hotel.abstract}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* EXPERIENCES / SERVICES */}
      <SectionAnchor id="services" />
      <SectionAnchor id="weddings" />
      <Section id="meetings" style={{ padding: "120px 0", background: "var(--espresso)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow" style={{ color: "var(--gold-light)" }}>Experiences</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 58px)", fontWeight: 300, lineHeight: 1.1, color: "var(--cream)", marginTop: 14, maxWidth: 560 }}>
            Signature Facilities
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginTop: 72, border: "1px solid rgba(212,184,150,0.12)" }}>
            {copy.features?.map((exp, i) => (
              <div key={exp.id}
                style={{ padding: "48px 44px", borderRight: i % 2 === 0 ? "1px solid rgba(212,184,150,0.12)" : "none", borderBottom: "1px solid rgba(212,184,150,0.12)", transition: "background 0.35s", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(184,146,74,0.06)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, color: "rgba(184,146,74,0.2)", lineHeight: 1, marginBottom: 20 }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: "var(--sand)", marginBottom: 12 }}>{exp.title}</h3>
                <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(212,184,150,0.65)", lineHeight: 1.75 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" style={{ padding: "120px 0", background: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow">Exclusives</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 58px)", fontWeight: 400, lineHeight: 1.1, color: "var(--espresso)", marginTop: 14, marginBottom: 56 }}>
            Special Offers
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {copy.offers?.map((offer) => (
              <div key={offer.id} style={{ padding: 40, border: "1px solid var(--parchment-dark)", borderLeft: "2px solid var(--gold)", background: "var(--parchment)", transition: "box-shadow 0.3s" }}>
                <span style={{ display: "inline-block", fontSize: 9, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>{offer.badge || "PROMO"}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: "var(--espresso)", marginBottom: 12 }}>{offer.title}</h3>
                <p style={{ fontSize: 14, fontWeight: 300, color: "var(--mist)", lineHeight: 1.75 }}>{offer.subtitle}</p>
                <a href="#contact" style={{ display: "inline-block", marginTop: 24, fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", textDecoration: "none", borderBottom: "1px solid var(--gold)", paddingBottom: 2 }}>
                  Redeem →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" style={{ padding: "120px 0", background: "var(--parchment-dark)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <p className="eyebrow">Membership</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.1, color: "var(--espresso)", marginTop: 14 }}>
                {copy.membership?.headline || "Elite Member Circle"}
              </h2>
              <p style={{ fontSize: 15, fontWeight: 300, color: "var(--mist)", lineHeight: 1.8, marginTop: 16, marginBottom: 32 }}>
                {copy.membership?.description || "Join our community."}
              </p>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {copy.membership?.tiers[0]?.benefits.map((b) => (
                  <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 14, fontWeight: 300, color: "var(--bark)", lineHeight: 1.65 }}>
                    <span style={{ color: "var(--gold)", marginTop: 2 }}>◆</span>
                    {b}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="we-cta" style={{ display: "inline-block", marginTop: 40 }}>Join Now</a>
            </div>
            <div style={{ background: "var(--espresso)", padding: 56, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p className="eyebrow" style={{ color: "var(--gold-light)", marginBottom: 20 }}>Member Circle</p>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: "var(--cream)", lineHeight: 1.1, marginBottom: 24 }}>
                {copy.membership?.headline || "Become a Member"}
              </h3>
              <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(212,184,150,0.7)", lineHeight: 1.8 }}>
                {copy.membership?.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <SectionAnchor id="whistleblowing" />
      <Section id="contact" style={{ padding: "140px 0", background: "var(--parchment)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>
            <div>
              <p className="eyebrow">Contact Us</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: "var(--espresso)", letterSpacing: "-0.01em", margin: "14px 0 20px" }}>
                Get in Touch
              </h2>
              <p style={{ fontSize: 15, fontWeight: 300, color: "var(--mist)", lineHeight: 1.8, marginBottom: 40 }}>
                {copy.contact?.footer_tagline || "We look forward to serving you."}
              </p>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--sand)" }}>
                {[
                  { label: "Phone", val: copy.contact?.phone },
                  { label: "Email", val: copy.contact?.email },
                  { label: "Address", val: copy.contact?.address },
                ].map((row, i) => (
                  row.val && (
                    <div key={i} style={{ display: "flex", gap: 16, alignItems: "baseline", width: "100%" }}>
                      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", minWidth: 80 }}>{row.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 300, color: "var(--bark)" }}>{row.val}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
            <div style={{ background: "var(--espresso)", padding: 48 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: "var(--sand)", marginBottom: 32 }}>Send a Message</p>
              <form style={{ display: "flex", flexDirection: "column", gap: 20 }} onSubmit={e => e.preventDefault()}>
                {["Full Name", "Email", "Phone"].map(field => (
                  <div key={field}>
                    <label style={{ display: "block", fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>{field}</label>
                    <input type={field === "Email" ? "email" : "text"} placeholder={field}
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: "var(--espresso)", background: "var(--cream)", border: "1px solid var(--sand)", padding: "14px 16px", outline: "none", width: "100%", transition: "border-color 0.25s", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>Message</label>
                  <textarea rows={4} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: "var(--espresso)", background: "var(--cream)", border: "1px solid var(--sand)", padding: "14px 16px", outline: "none", width: "100%", resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <button type="submit" className="we-cta" style={{ width: "100%", textAlign: "center" }}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1C1007", padding: "60px 40px 32px", maxWidth: "100%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(184,146,74,0.15)", paddingTop: 32 }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 400, color: "var(--sand)" }}>Bumikarsa Bidakara Hotels Management</p>
          <p style={{ fontSize: 11, fontWeight: 300, color: "rgba(212,184,150,0.45)", letterSpacing: "0.1em" }}>© 2026 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

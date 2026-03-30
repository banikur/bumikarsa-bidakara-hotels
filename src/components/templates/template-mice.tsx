"use client";

import Link from "next/link";
import { UniversalContent } from "@/types/cms.types";

const VENUES = [
  { name: "Birawa Assembly Hall", desc: "Column-free Grand Ballroom, Ground Floor", area: "2,025", theatre: "3,000", classroom: "1,500", banquet: "1,200" },
  { name: "Binakarna Auditorium", desc: "Tiered seating, acoustic optimized", area: "1,100", theatre: "1,200", classroom: "600", banquet: "500" },
  { name: "Cendrawasih Room", desc: "Divisible into 3 breakout rooms", area: "800", theatre: "800", classroom: "400", banquet: "300" },
  { name: "Executive Boardrooms (x8)", desc: "Premium tech, private lounge access", area: "60 - 120", theatre: "-", classroom: "20 - 40", banquet: "-" },
];

export function TemplateMice({ copy }: { copy: UniversalContent }) {
  // If CMS has venues defined in features, use them instead of hardcoded
  const activeVenues = copy.features && copy.features.length > 0 
    ? copy.features.map(f => ({
        name: f.title,
        desc: f.description,
        area: "-",
        theatre: f.capacity?.toString() || "-",
        classroom: "-",
        banquet: "-"
      }))
    : VENUES;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FAFAFC", color: "#1a1a1a", WebkitFontSmoothing: "antialiased" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .mice-heading { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; letter-spacing: -0.02em; }
        .mice-btn { background:#0A192F; color:white; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); position:relative; overflow:hidden; z-index:1; cursor:pointer; display:inline-block; text-decoration:none; border:none; }
        .mice-btn::before { content:''; position:absolute; top:0;left:0;right:0;bottom:0; background:#C9A96E; z-index:-1; transform:scaleX(0); transform-origin:left; transition:transform 0.3s ease-in-out; }
        .mice-btn:hover::before { transform:scaleX(1); }
        .mice-btn:hover { transform:scale(1.02); color:#0A192F; box-shadow:0 10px 15px -3px rgba(10,25,47,0.3); }
        .mice-outline { border:1px solid #0A192F; color:#0A192F; transition:all 0.3s ease; display:inline-block; text-decoration:none; cursor:pointer; }
        .mice-outline:hover { background:#0A192F; color:white; }
        .mice-th { background:#0A192F; color:white; font-weight:500; text-transform:uppercase; font-size:12px; letter-spacing:0.05em; padding:16px; }
        .mice-td { padding:16px; border-bottom:1px solid #e2e8f0; font-size:14px; color:#4a5568; }
        .mice-tr:hover .mice-td { background:#f8fafc; }
        .mice-hero-overlay { background: linear-gradient(90deg, rgba(10,25,47,0.9) 0%, rgba(10,25,47,0.4) 100%); }
        .mice-card { transition:transform 0.3s,box-shadow 0.3s; }
        .mice-card:hover { transform:translateY(-4px); box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); }
        .mice-card img { transition:filter 0.5s,transform 0.5s; filter:grayscale(100%); }
        .mice-card:hover img { filter:grayscale(0%); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 80 }}>
            <Link href="/" style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}>
              <span className="mice-heading" style={{ fontWeight: 700, color: "#0A192F", fontSize: 20, lineHeight: 1 }}>BUMIKARSA</span>
              <span style={{ color: "#C9A96E", fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>Hotels Management</span>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
              {[{ href: "#venues", label: "Venues" }, { href: "#properties", label: "Properties" }, { href: "#why-us", label: "Why Us" }].map(l => (
                <a key={l.href} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: "#4B5563", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#0A192F"} onMouseLeave={e => e.currentTarget.style.color = "#4B5563"}>
                  {l.label}
                </a>
              ))}
              <div style={{ height: 16, width: 1, background: "#d1d5db" }} />
              <a href="#contact" className="mice-btn" style={{ padding: "10px 24px", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Book Meeting
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={copy.hero.background_image_url || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2698&auto=format&fit=crop"}
            alt="Grand Ballroom Corporate Event" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
          <div className="mice-hero-overlay" style={{ position: "absolute", inset: 0 }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "80px 32px", width: "100%", boxSizing: "border-box" }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ display: "inline-block", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)", padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ color: "#C9A96E", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Professional Corporate Events</span>
            </div>
            <h1 className="mice-heading" style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, color: "white", lineHeight: 1.15, marginBottom: 24 }}>
              {(copy.hero.headline || "Indonesia's Premier").split(" ").slice(0, -2).join(" ")} <br />
              <span style={{ color: "#C9A96E" }}>{(copy.hero.headline || "MICE Destination").split(" ").slice(-2).join(" ")}</span>
            </h1>
            <p style={{ color: "#d1d5db", fontSize: 18, fontWeight: 300, maxWidth: 560, marginBottom: 48, lineHeight: 1.7 }}>
              {copy.hero.subtitle || copy.hero.description}
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#contact" className="mice-btn" style={{ padding: "16px 32px", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 8 }}>
                {copy.hero.cta_primary || "Get Custom Quote →"}
              </a>
              <a href="#venues" className="mice-outline" style={{ padding: "16px 32px", fontSize: 14, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", background: "transparent", borderColor: "white", color: "white" }}>
                {copy.hero.cta_secondary || "Explore Venues"}
              </a>
            </div>
          </div>
        </div>

        {/* Enquiry Bar */}
        <div id="contact" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", transform: "translateY(50%)", zIndex: 20, display: "flex", justifyContent: "center", padding: "0 32px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: 1280, width: "100%", background: "white", boxShadow: "0 25px 60px rgba(0,0,0,0.15)", borderTop: "4px solid #0A192F" }}>
            <form style={{ display: "flex", alignItems: "stretch", width: "100%" }} onSubmit={e => e.preventDefault()}>
              {[{ l: "Event Date", t: "date" }, { l: "Attendees (Pax)", t: "number", p: "e.g. 500" }].map(f => (
                <div key={f.l} style={{ flex: 1, padding: "16px 24px", borderRight: "1px solid #e5e7eb" }}>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4 }}>{f.l}</label>
                  <input type={f.t} placeholder={(f as any).p} style={{ width: "100%", fontSize: 14, fontWeight: 500, color: "#0A192F", border: "none", outline: "none", background: "transparent" }} />
                </div>
              ))}
              <div style={{ flex: 1, padding: "16px 24px", borderRight: "1px solid #e5e7eb" }}>
                <label style={{ display: "block", fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 4 }}>Venue Type</label>
                <select style={{ width: "100%", fontSize: 14, fontWeight: 500, color: "#0A192F", border: "none", outline: "none", background: "transparent", cursor: "pointer" }}>
                  <option value="" disabled>Select Format</option>
                  <option>Convention / Exhibition</option>
                  <option>Corporate Meeting</option>
                  <option>Gala Dinner / Banquet</option>
                  <option>Training / Seminar</option>
                </select>
              </div>
              <div style={{ width: 200 }}>
                <button type="submit" className="mice-btn" style={{ width: "100%", height: "100%", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Check Availability
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* VENUE SPECS TABLE */}
      <section id="venues" style={{ padding: "192px 32px 96px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, borderBottom: "1px solid #e5e7eb", paddingBottom: 24, gap: 24 }}>
            <div>
              <h2 className="mice-heading" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#0A192F", marginBottom: 16 }}>Venue Specifications</h2>
              <p style={{ color: "#4B5563" }}>High-capacity halls and versatile meeting spaces for scale, acoustics, and seamless execution.</p>
            </div>
            <a href="#" className="mice-outline" style={{ padding: "8px 24px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 8 }}>
              ↓ Brochure (PDF)
            </a>
          </div>

          <div style={{ background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Venue Name / Profile", "Area (m²)", "Theatre", "Classroom", "Banquet", "Action"].map((h, i) => (
                      <th key={h} className="mice-th" style={{ textAlign: i === 5 ? "right" : "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeVenues.map((v) => (
                    <tr key={v.name} className="mice-tr">
                      <td className="mice-td">
                        <div style={{ fontWeight: 600, color: "#0A192F" }}>{v.name}</div>
                        <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>{v.desc}</div>
                      </td>
                      <td className="mice-td" style={{ fontFamily: "monospace", fontSize: 12 }}>{v.area}</td>
                      <td className="mice-td" style={{ fontWeight: 600 }}>{v.theatre}</td>
                      <td className="mice-td">{v.classroom}</td>
                      <td className="mice-td">{v.banquet}</td>
                      <td className="mice-td" style={{ textAlign: "right" }}>
                        <a href="#contact" style={{ color: "#C9A96E", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", transition: "color 0.3s" }}>
                          Request Quote →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ background: "#f8fafc", padding: 16, borderTop: "1px solid #e5e7eb", textAlign: "center", display: "flex", justifyContent: "center", gap: 48, fontSize: 12, color: "#6b7280" }}>
              {["High-Speed Wi-Fi Included", "Loading Dock Access", "On-site AV Tech Team"].map(f => (
                <span key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0A192F", flexShrink: 0 }} />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTIES */}
      <section id="properties" style={{ padding: "96px 32px", background: "white", borderTop: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 className="mice-heading" style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#0A192F", marginBottom: 16 }}>Strategic Business Locations</h2>
            <p style={{ color: "#4B5563", maxWidth: 600, margin: "0 auto" }}>Unmatched hospitality tailored for seamless events across major cities and key business hubs.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {copy.properties.map((hotel, i) => (
              <div key={hotel.id} className="mice-card" style={{ background: "white", border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ height: 192, overflow: "hidden", position: "relative" }}>
                  <img src={hotel.image_url || "https://images.unsplash.com/photo-1555899434-94d1368d7dd6?q=80&w=800&auto=format&fit=crop"} alt={hotel.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 16, left: 16, background: "#0A192F", color: "white", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "4px 12px" }}>
                    PROPERI
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 className="mice-heading" style={{ fontSize: 20, fontWeight: 700, color: "#0A192F", marginBottom: 4 }}>{hotel.name}</h3>
                  <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 16, display: "flex", alignItems: "center", gap: 4 }}>
                    📍 {hotel.location}
                  </p>
                  <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 16, marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
                      <span style={{ color: "#9ca3af" }}>Summary</span>
                      <span style={{ fontWeight: 600, color: "#0A192F", textAlign: "right", maxWidth: "60%" }}>{hotel.abstract}</span>
                    </div>
                  </div>
                  <Link href={`/our-hotels/${hotel.id}`} className="mice-outline" style={{ display: "block", textAlign: "center", padding: "8px", fontSize: 14, fontWeight: 600 }}>
                    View Factsheet
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#FAFAFC", paddingTop: 80, paddingBottom: 40, borderTop: "1px solid #e5e7eb", marginTop: 80 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 48, marginBottom: 64, flexWrap: "wrap" }}>
            <div>
              <span className="mice-heading" style={{ fontWeight: 700, color: "#0A192F", fontSize: 20, display: "block", marginBottom: 8 }}>BUMIKARSA</span>
              <p style={{ fontSize: 14, color: "#9ca3af" }}>Corporate hospitality built on trust and Indonesian values.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: "#0A192F", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: 14, marginBottom: 16 }}>Contact Sales</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 14, color: "#4B5563" }}>
                <li><strong>T:</strong> {copy.contact?.phone || "(+62) 021 8379 3555"}</li>
                <li><strong>E:</strong> {copy.contact?.email || "reservation@bumikarsa-bidakarahotels.com"}</li>
                <li style={{ marginTop: 8 }}>{copy.contact?.address || "Jl. Jend. Gatot Subroto Kav. 71-73, Jakarta Selatan 12870"}</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: "#0A192F", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: 14, marginBottom: 16 }}>Company</h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "#4B5563" }}>
                {["About Us", "Portfolio", "Careers", "Whistleblowing"].map(l => (
                  <li key={l}><a href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#0A192F"} onMouseLeave={e => e.currentTarget.style.color = "#4B5563"}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: "#0A192F", textTransform: "uppercase", letterSpacing: "0.05em", fontSize: 14, marginBottom: 16 }}>Corporate Updates</h4>
              <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 16 }}>Subscribe to factsheet updates and MICE promotions.</p>
              <form style={{ display: "flex" }} onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Corporate Email" style={{ flex: 1, border: "1px solid #d1d5db", padding: "8px 12px", fontSize: 14, outline: "none" }} />
                <button type="submit" className="mice-btn" style={{ padding: "8px 16px", fontSize: 14, fontWeight: 700 }}>JOIN</button>
              </form>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #d1d5db", paddingTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16, fontSize: 12, color: "#9ca3af" }}>
            <p>© 2026 Bumikarsa Bidakara Hotels Management. All rights reserved.</p>
            <div style={{ display: "flex", gap: 16 }}>
              {["Privacy Policy", "Terms of Service"].map(l => (
                <a key={l} href="#" style={{ color: "inherit", textDecoration: "none", transition: "color 0.3s" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

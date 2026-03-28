/**
 * seed-site-config.mjs
 * Seeds the site_config table with default content from home.ts
 * Run: node scripts/seed-site-config.mjs
 */
import { createClient } from '@insforge/sdk';

const OSS_HOST = "https://jtsdbcb5.ap-southeast.insforge.app";
const API_KEY = "ik_a7452b4b6efbe2b8e9c247cfcd2fa4da";

const insforge = createClient({
  baseUrl: OSS_HOST,
  anonKey: API_KEY
});

const content_id = {
  hero: {
    title: "Hospitalitas Indonesia untuk Perjalanan Bisnis & Stay yang Berkelas",
    subtitle: "Stays yang tenang, pelayanan hangat, dan eksekusi rapi—untuk eksekutif, tim, dan tamu yang menghargai detail.",
    description: "",
    localeLabel: "Beranda · Indonesia",
  },
  hotels: {
    heading: "Destinasi Bumikarsa",
    description: "Tiga kota. Satu standar layanan yang konsisten—untuk agenda bisnis, jeda singkat, dan momen spesial.",
    items: [
      { name: "Hotel Bidakara Jakarta", location: "Jakarta · Business District", summary: "Flagship MICE dengan ballroom besar, ruang rapat modular, dan akses strategis.", tag: "Flagship", slug: "hotel-bidakara-jakarta" },
      { name: "Hotel Bumikarsa Bandung", location: "Bandung · Elevated Retreat", summary: "Retreat sejuk untuk reset dan sesi strategi—udara pegunungan, suasana hijau.", tag: "Executive Retreat", slug: "hotel-bumikarsa-bandung" },
      { name: "BIDAKARA Heritage Yogyakarta", location: "Yogyakarta · Cultural Axis", summary: "Modern yang diselaraskan dengan detail heritage—ideal untuk konferensi dan perayaan.", tag: "New 2026", slug: "bidakara-heritage-yogyakarta" },
    ],
  },
  experiences: {
    heading: "Pengalaman, Tersusun dengan Niat",
    description: "Untuk rapat, perayaan, dining, dan pemulihan—tanpa terasa ramai.",
    items: [
      { id: "meetings", title: "Meetings", description: "Ruang siap eksekusi, tim MICE responsif, alur rapat rapi." },
      { id: "weddings", title: "Weddings", description: "Dari akad hingga resepsi—detail halus, pacing tenang." },
      { id: "dining", title: "Dining", description: "Rasa Nusantara yang refined, hangat, dan modern." },
      { id: "wellness", title: "Wellness", description: "Ritual istirahat yang pelan—spa, pool, dan ruang hening." },
    ],
  },
  offers: {
    heading: "Penawaran yang Kurasi",
    description: "Paket yang memberi nilai, bukan sekadar diskon.",
    highlights: [
      { title: "Corporate Retreat 2 Malam", label: "Business Stay", description: "Meeting room, coffee break, dan upgrade terpilih untuk leader." },
      { title: "Intimate Wedding Soirée", label: "Wedding", description: "150 tamu, menu tailor-made, dan golden hour photo." },
      { title: "Weekend Slow Living", label: "Leisure", description: "Sarapan panjang, pool time, dan late check-out." },
    ],
  },
  membership: {
    heading: "Bumikarsa Member Circle 2.0",
    description: "Benefit berlapis untuk ritme perjalanan Anda.",
    content: {
      title: "Lebih Dari Sekadar Poin",
      subtitle: "Upgrade, akses lounge, dan privilese yang terasa personal.",
      bullets: [
        "Tier yang mengikuti ritme perjalanan Anda.",
        "Benefit untuk MICE planners & group stays.",
        "Penawaran kurasi, bukan mass-blast.",
      ],
    },
  },
  stories: {
    heading: "Kisah dari Jantung Nusantara",
    description: "Jurnal singkat: kota, manusia, dan momen kecil.",
    items: [
      { title: "Ritual Kopi Pagi di Lobby Jakarta", category: "City Stories", summary: "Ritual kopi yang rapi untuk jeda 12 menit sebelum sesi pertama.", slug: "ritual-kopi-pagi-di-lobby-jakarta" },
      { title: "Di Balik Sebuah Wedding yang Tenang", category: "Wedding Notes", summary: "Menyelaraskan tradisi dan estetika modern tanpa kehilangan makna.", slug: "di-balik-sebuah-wedding-yang-tenang" },
      { title: "Menemukan Hening di Tengah Kota", category: "Wellness", summary: "Ruang hening untuk jeda, refleksi, dan reset ritme.", slug: "menemukan-hening-di-tengah-kota" },
    ],
  },
  contactTeaser: {
    title: "Satu Tim Terpusat untuk Seluruh Portofolio",
    description: "Reservasi terpusat untuk individual, grup, dan MICE.",
    primaryCta: "Hubungi Kami",
    secondaryCta: "Lihat Lokasi",
  },
};

const content_en = {
  hero: {
    title: "Indonesian Hospitality for Executive Stays & Quiet Luxury",
    subtitle: "Calm stays, warm service, and precise execution—for leaders, teams, and guests who value detail.",
    description: "",
    localeLabel: "Home · English",
  },
  hotels: {
    heading: "Bumikarsa Destinations",
    description: "Three cities. One consistent standard—built for business, resets, and celebrations.",
    items: [
      { name: "Hotel Bidakara Jakarta", location: "Jakarta · Business District", summary: "A flagship MICE landmark with a grand ballroom and modular meeting suites.", tag: "Flagship", slug: "hotel-bidakara-jakarta" },
      { name: "Hotel Bumikarsa Bandung", location: "Bandung · Elevated Retreat", summary: "A cool retreat for reset and strategy—fresh air, leafy calm.", tag: "Executive Retreat", slug: "hotel-bumikarsa-bandung" },
      { name: "BIDAKARA Heritage Yogyakarta", location: "Yogyakarta · Cultural Axis", summary: "Modern lines softened by heritage details—ideal for conferences and celebrations.", tag: "New 2026", slug: "bidakara-heritage-yogyakarta" },
    ],
  },
  experiences: {
    heading: "Experiences, Curated with Intention",
    description: "Meetings, weddings, dining, wellness—kept composed.",
    items: [
      { id: "meetings", title: "Meetings", description: "High-spec rooms, agile MICE team, smooth run-of-show." },
      { id: "weddings", title: "Weddings", description: "Ceremony to reception—soft details, steady pacing." },
      { id: "dining", title: "Dining", description: "Refined Nusantara flavors with modern warmth." },
      { id: "wellness", title: "Wellness", description: "Slow rituals—spa, pool, and quiet corners." },
    ],
  },
  offers: {
    heading: "Offers with Intention",
    description: "Packages designed for value, not noise.",
    highlights: [
      { title: "Two-Night Corporate Retreat", label: "Business Stay", description: "Meeting rooms, coffee breaks, and curated upgrades for leaders." },
      { title: "Intimate Evening Wedding", label: "Wedding", description: "150 guests, tailored menus, and a golden-hour photo session." },
      { title: "Weekend Slow Living Escape", label: "Leisure", description: "Lingering breakfast, pool time, and late check-out." },
    ],
  },
  membership: {
    heading: "Bumikarsa Member Circle 2.0",
    description: "Layered benefits for your travel rhythm.",
    content: {
      title: "Beyond Points and Status",
      subtitle: "Upgrades, lounge access, and privileges that feel personal.",
      bullets: [
        "Tiers that move with how you actually travel.",
        "Benefits for MICE planners & group stays.",
        "Curated offers, not broadcasts.",
      ],
    },
  },
  stories: {
    heading: "Stories from the Archipelago",
    description: "Short journals on people, cities, and quiet moments.",
    items: [
      { title: "Morning Coffee Rituals in Jakarta", category: "City Stories", summary: "A 12-minute coffee ritual designed for conference pacing.", slug: "morning-coffee-rituals-in-jakarta" },
      { title: "Behind a Serene Wedding", category: "Wedding Notes", summary: "Balancing classical tradition with a modern visual language.", slug: "behind-a-serene-wedding" },
      { title: "Finding Stillness in the City", category: "Wellness", summary: "Small spaces designed for pause, reflection, and reset.", slug: "finding-stillness-in-the-city" },
    ],
  },
  contactTeaser: {
    title: "One Central Team for Every Stay",
    description: "Central reservations for individual, group, and MICE.",
    primaryCta: "Contact Us",
    secondaryCta: "View Locations",
  },
};

async function seed() {
  const payload = {
    active_template: "warm_earthy",
    locale: "id",
    content_id,
    content_en,
  };

  const { data, error } = await insforge.database
    .from('site_config')
    .insert([payload])
    .select();

  if (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }

  console.log("✅ site_config seeded successfully!");
  console.log("   ID:", data[0]?.id);
  console.log("   Template:", data[0]?.active_template);
  console.log("   Locale:", data[0]?.locale);
}

seed();

/**
 * seed-site-config.mjs
 * Seeds the site_config table with default content matching UniversalContent schema
 * Run: node scripts/seed-site-config.mjs
 */
import { createClient } from '@insforge/sdk';

const OSS_HOST = "https://jtsdbcb5.ap-southeast.insforge.app";
const API_KEY = "ik_a7452b4b6efbe2b8e9c247cfcd2fa4da";

const insforge = createClient({
  baseUrl: OSS_HOST,
  anonKey: API_KEY
});

// Helper to generate UUIDs (since we can't use gen_random_uuid() in client-side insert)
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

const content_id = {
  hero: {
    headline: "Hospitalitas Indonesia untuk Perjalanan Bisnis & Stay yang Berkelas",
    subtitle: "Stays yang tenang, pelayanan hangat, dan eksekusi rapi—untuk eksekutif, tim, dan tamu yang menghargai detail.",
    description: "",
    cta_primary: "Jelajahi Hotel",
    cta_secondary: "Hubungi Kami",
    background_image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80",
  },
  properties: [
    {
      id: uuid(),
      name: "Hotel Bidakara Jakarta",
      location: "Jakarta · Business District",
      abstract: "Flagship MICE dengan ballroom besar, ruang rapat modular, dan akses strategis.",
      image_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
    },
    {
      id: uuid(),
      name: "Hotel Bumikarsa Bandung",
      location: "Bandung · Elevated Retreat",
      abstract: "Retreat sejuk untuk reset dan sesi strategi—udara pegunungan, suasana hijau.",
      image_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
    },
    {
      id: uuid(),
      name: "BIDAKARA Heritage Yogyakarta",
      location: "Yogyakarta · Cultural Axis",
      abstract: "Modern yang diselaraskan dengan detail heritage—ideal untuk konferensi dan perayaan.",
      image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
    },
  ],
  features: [
    {
      id: uuid(),
      title: "Meetings",
      description: "Ruang siap eksekusi, tim MICE responsif, alur rapat rapi.",
      capacity: 3000,
      image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80"
    },
    {
      id: uuid(),
      title: "Weddings",
      description: "Dari akad hingga resepsi—detail halus, pacing tenang.",
      image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
    },
    {
      id: uuid(),
      title: "Dining",
      description: "Rasa Nusantara yang refined, hangat, dan modern.",
      image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
    },
    {
      id: uuid(),
      title: "Wellness",
      description: "Ritual istirahat yang pelan—spa, pool, dan ruang hening.",
      image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&q=80"
    },
  ],
  offers: [
    {
      id: uuid(),
      title: "Corporate Retreat 2 Malam",
      subtitle: "Meeting room, coffee break, dan upgrade terpilih untuk leader.",
      badge: "Business Stay",
      image_url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80"
    },
    {
      id: uuid(),
      title: "Intimate Wedding Soirée",
      subtitle: "150 tamu, menu tailor-made, dan golden hour photo.",
      badge: "Wedding",
      image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
    },
    {
      id: uuid(),
      title: "Weekend Slow Living",
      subtitle: "Sarapan panjang, pool time, dan late check-out.",
      badge: "Leisure",
      image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
    },
  ],
  membership: {
    headline: "Bumikarsa Member Circle 2.0",
    description: "Benefit berlapis untuk ritme perjalanan Anda.",
    tiers: [
      {
        id: uuid(),
        name: "BMC Silver",
        benefits: ["10% diskon kamar", "15% diskon F&B", "Voucher selamat datang IDR 500.000", "Sarapan ulang tahun", "Penawaran bulanan"]
      },
      {
        id: uuid(),
        name: "BMC Gold",
        benefits: ["20% diskon kamar", "25% diskon F&B", "Voucher selamat datang IDR 1.000.000", "Antar-jemput bandara 1x/bulan", "Prioritas upgrade kamar"]
      },
      {
        id: uuid(),
        name: "BMC Platinum",
        benefits: ["Semua benefit Gold", "Voucher tahunan IDR 2.000.000", "Upgrade suite terjamin", "Concierge pribadi 24/7", "3 malam gratis/tahun"]
      },
    ],
  },
  contact: {
    phone: "+62 21 1234 5678",
    email: "reservations@bumikarsa.co.id",
    address: "Jl. Jend. Sudirman Kav. 72-73, Jakarta Selatan 12190",
    maps_url: "https://maps.google.com/?q=Bumikarsa+Bidakara+Hotels",
    footer_tagline: "Soulful Indonesian Hospitality",
  },
  pages: {
    ourHotels: {
      title: "Tiga Kota, Satu Tim Terpadu",
      description: "Portofolio hotel kami mencakup Jakarta, Bandung, dan Yogyakarta—dengan satu standar layanan yang konsisten untuk eksekutif, tim MICE, dan tamu yang menghargai detail.",
    },
    experiences: {
      title: "Empat Pilar Pengalaman Bumikarsa",
      description: "Dari rapat eksekutif hingga perayaan pernikahan, dari kuliner Nusantara hingga ritual pemulihan—setiap pengalaman dirancang dengan niat.",
    },
    offers: {
      title: "Paket yang Dapat Disesuaikan",
      description: "Penawaran yang memberi nilai, bukan sekadar diskon. Semua paket dapat dikurasi sesuai kebutuhan Anda.",
    },
    membership: {
      title: "Bumikarsa Member Circle 2.0",
      description: "Benefit berlapis untuk ritme perjalanan Anda. Dari diskon kamar hingga akses lounge dan privilese personal.",
    },
    stories: {
      title: "Catatan dari Jantung Nusantara",
      description: "Jurnal singkat tentang kota, manusia, dan momen kecil yang membuat perjalanan Anda bermakna.",
    },
    contact: {
      title: "Satu Tim Terpusat untuk Seluruh Portofolio",
      description: "Reservasi terpusat untuk individual, grup, dan MICE. Satu panggilan, seluruh hotel kami siap melayani.",
    },
  },
};

const content_en = {
  hero: {
    headline: "Indonesian Hospitality for Executive Stays & Quiet Luxury",
    subtitle: "Calm stays, warm service, and precise execution—for leaders, teams, and guests who value detail.",
    description: "",
    cta_primary: "Explore Hotels",
    cta_secondary: "Contact Us",
    background_image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=80",
  },
  properties: [
    {
      id: uuid(),
      name: "Hotel Bidakara Jakarta",
      location: "Jakarta · Business District",
      abstract: "A flagship MICE landmark with a grand ballroom and modular meeting suites.",
      image_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
    },
    {
      id: uuid(),
      name: "Hotel Bumikarsa Bandung",
      location: "Bandung · Elevated Retreat",
      abstract: "A cool retreat for reset and strategy—fresh air, leafy calm.",
      image_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
    },
    {
      id: uuid(),
      name: "BIDAKARA Heritage Yogyakarta",
      location: "Yogyakarta · Cultural Axis",
      abstract: "Modern lines softened by heritage details—ideal for conferences and celebrations.",
      image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
    },
  ],
  features: [
    {
      id: uuid(),
      title: "Meetings",
      description: "High-spec rooms, agile MICE team, smooth run-of-show.",
      capacity: 3000,
      image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80"
    },
    {
      id: uuid(),
      title: "Weddings",
      description: "Ceremony to reception—soft details, steady pacing.",
      image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
    },
    {
      id: uuid(),
      title: "Dining",
      description: "Refined Nusantara flavors with modern warmth.",
      image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
    },
    {
      id: uuid(),
      title: "Wellness",
      description: "Slow rituals—spa, pool, and quiet corners.",
      image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&q=80"
    },
  ],
  offers: [
    {
      id: uuid(),
      title: "Two-Night Corporate Retreat",
      subtitle: "Meeting rooms, coffee breaks, and curated upgrades for leaders.",
      badge: "Business Stay",
      image_url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80"
    },
    {
      id: uuid(),
      title: "Intimate Evening Wedding",
      subtitle: "150 guests, tailored menus, and a golden-hour photo session.",
      badge: "Wedding",
      image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
    },
    {
      id: uuid(),
      title: "Weekend Slow Living Escape",
      subtitle: "Lingering breakfast, pool time, and late check-out.",
      badge: "Leisure",
      image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
    },
  ],
  membership: {
    headline: "Bumikarsa Member Circle 2.0",
    description: "Layered benefits for your travel rhythm.",
    tiers: [
      {
        id: uuid(),
        name: "BMC Silver",
        benefits: ["10% room discount", "15% F&B discount", "Welcome voucher IDR 500,000", "Birthday complimentary breakfast", "Monthly offers newsletter"]
      },
      {
        id: uuid(),
        name: "BMC Gold",
        benefits: ["20% room discount", "25% F&B discount", "IDR 1,000,000 welcome vouchers", "Free airport transfer 1x/month", "Room upgrade priority", "Anniversary free night"]
      },
      {
        id: uuid(),
        name: "BMC Platinum",
        benefits: ["All Gold benefits included", "IDR 2,000,000 annual vouchers", "Guaranteed suite upgrade", "Dedicated personal concierge 24/7", "Private networking events", "3 free nights / year"]
      },
    ],
  },
  contact: {
    phone: "+62 21 1234 5678",
    email: "reservations@bumikarsa.co.id",
    address: "Jl. Jend. Sudirman Kav. 72-73, Jakarta Selatan 12190",
    maps_url: "https://maps.google.com/?q=Bumikarsa+Bidakara+Hotels",
    footer_tagline: "Soulful Indonesian Hospitality",
  },
  pages: {
    ourHotels: {
      title: "Three Cities, One Seamless Team",
      description: "Our portfolio spans Jakarta, Bandung, and Yogyakarta—with one consistent standard of service for executives, MICE teams, and detail-oriented guests.",
    },
    experiences: {
      title: "Four Pillars of Bumikarsa Experiences",
      description: "From executive meetings to wedding celebrations, from Nusantara cuisine to wellness rituals—every experience is crafted with intention.",
    },
    offers: {
      title: "Packages Ready to be Tailored",
      description: "Offers designed for value, not noise. Every package can be curated to your specific needs.",
    },
    membership: {
      title: "Bumikarsa Member Circle 2.0",
      description: "Layered benefits for your travel rhythm. From room discounts to lounge access and personal privileges.",
    },
    stories: {
      title: "Notes from Across the Archipelago",
      description: "Short journals on cities, people, and quiet moments that make your journey meaningful.",
    },
    contact: {
      title: "One Central Team for Every Stay",
      description: "Centralized reservations for individuals, groups, and MICE. One call, all our hotels ready to serve.",
    },
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

import { UniversalContent } from "@/types/cms.types";

export const DEFAULT_CONTENT: UniversalContent = {
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
      id: "prop-jakarta",
      name: "Hotel Bidakara Jakarta",
      location: "Jakarta · Business District",
      abstract: "A flagship MICE landmark with a grand ballroom and modular meeting suites.",
      image_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
    },
    {
      id: "prop-bandung",
      name: "Hotel Bumikarsa Bandung",
      location: "Bandung · Elevated Retreat",
      abstract: "A cool retreat for reset and strategy—fresh air, leafy calm.",
      image_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
    },
    {
      id: "prop-yogyakarta",
      name: "BIDAKARA Heritage Yogyakarta",
      location: "Yogyakarta · Cultural Axis",
      abstract: "Modern lines softened by heritage details—ideal for conferences and celebrations.",
      image_url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
    },
  ],
  features: [
    {
      id: "feat-meetings",
      title: "Meetings",
      description: "High-spec rooms, agile MICE team, smooth run-of-show.",
      capacity: 3000,
      image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80"
    },
    {
      id: "feat-weddings",
      title: "Weddings",
      description: "Ceremony to reception—soft details, steady pacing.",
      image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
    },
    {
      id: "feat-dining",
      title: "Dining",
      description: "Refined Nusantara flavors with modern warmth.",
      image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
    },
    {
      id: "feat-wellness",
      title: "Wellness",
      description: "Slow rituals—spa, pool, and quiet corners.",
      image_url: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&q=80"
    },
  ],
  offers: [
    {
      id: "offer-corporate",
      title: "Two-Night Corporate Retreat",
      subtitle: "Meeting rooms, coffee breaks, and curated upgrades for leaders.",
      badge: "Business Stay",
      image_url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80"
    },
    {
      id: "offer-wedding",
      title: "Intimate Evening Wedding",
      subtitle: "150 guests, tailored menus, and a golden-hour photo session.",
      badge: "Wedding",
      image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
    },
    {
      id: "offer-weekend",
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
        id: "tier-silver",
        name: "BMC Silver",
        benefits: ["10% room discount", "15% F&B discount", "Welcome voucher IDR 500,000", "Birthday complimentary breakfast", "Monthly offers newsletter"]
      },
      {
        id: "tier-gold",
        name: "BMC Gold",
        benefits: ["20% room discount", "25% F&B discount", "IDR 1,000,000 welcome vouchers", "Free airport transfer 1x/month", "Room upgrade priority", "Anniversary free night"]
      },
      {
        id: "tier-platinum",
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
      title: "Our Destinations",
      description: "Discover our portfolio of business hotels, conference venues, and elevated retreats across Indonesia."
    },
    experiences: {
      title: "Signature Experiences",
      description: "Explore our curated facilities from grand ballrooms to quiet wellness spaces."
    },
    offers: {
      title: "Exclusive Offers",
      description: "Special packages designed for your business and leisure needs."
    },
    membership: {
      title: "Member Circle",
      description: "Unlock privileged rates, dedicated service, and exclusive upgrades."
    },
    contact: {
      title: "Get In Touch",
      description: "From individual bookings to large-scale events, our central team is ready to assist you."
    },
    stories: {
      title: "Stories & News",
      description: "Latest updates, press releases, and stories from Bumikarsa Bidakara."
    }
  }
};

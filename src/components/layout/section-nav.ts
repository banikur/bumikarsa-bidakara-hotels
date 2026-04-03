export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const PRIMARY_NAV: NavItem[] = [
  { id: "about", label: "About Us", href: "#about" },
  { id: "properties", label: "Our Hotels", href: "#properties" },
  { id: "services", label: "Our Services", href: "#services" },
  { id: "offers", label: "Special Offers", href: "#offers" },
  { id: "membership", label: "Membership", href: "#membership" },
  { id: "contact", label: "Contact Us", href: "#contact" },
  { id: "whistleblowing", label: "Whistleblowing", href: "#whistleblowing" },
];

export const SERVICE_SUBLINKS: NavItem[] = [
  { id: "meetings", label: "Meetings", href: "#meetings" },
  { id: "weddings", label: "Weddings", href: "#weddings" }
];

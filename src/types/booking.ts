export type BookingAudience =
  | "leisure"
  | "corporate"
  | "mice"
  | "wedding"
  | "group";

export type BookingAction =
  | "book-stay"
  | "check-availability"
  | "plan-event"
  | "request-proposal";

export type BookingContext = {
  hotelSlug?: string;
  offerTitle?: string;
  experienceType?: "meetings" | "weddings" | "dining" | "wellness";
  audience?: BookingAudience;
};


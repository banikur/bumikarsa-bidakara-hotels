export type InquiryKind =
  | "general"
  | "hotel"
  | "meetings"
  | "weddings"
  | "membership";

export type BaseInquiryPayload = {
  fullName: string;
  email: string;
  phone?: string;
  message?: string;
};

export type HotelInquiryPayload = BaseInquiryPayload & {
  hotelSlug?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
};

export type EventInquiryPayload = BaseInquiryPayload & {
  hotelSlug?: string;
  eventDate?: string;
  attendees?: number;
  budgetRange?: string;
};


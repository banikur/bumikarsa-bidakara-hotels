import { homeCopy, type Locale } from "./home";

export function getHotels(locale: Locale) {
  return homeCopy[locale].hotels.items;
}

export function getHotelBySlug(locale: Locale, slug: string) {
  return getHotels(locale).find((hotel) => hotel.slug === slug);
}

export function getExperiences(locale: Locale) {
  return homeCopy[locale].experiences.items;
}

export function getExperienceById(
  locale: Locale,
  id: "meetings" | "weddings" | "dining" | "wellness",
) {
  return getExperiences(locale).find((exp) => exp.id === id);
}

export function getOffers(locale: Locale) {
  return homeCopy[locale].offers.highlights;
}

export function getMembership(locale: Locale) {
  return homeCopy[locale].membership;
}

export function getStories(locale: Locale) {
  return homeCopy[locale].stories.items;
}

export function getStoryBySlug(locale: Locale, slug: string) {
  return getStories(locale).find((story) => story.slug === slug);
}

export function getContactTeaser(locale: Locale) {
  return homeCopy[locale].contactTeaser;
}


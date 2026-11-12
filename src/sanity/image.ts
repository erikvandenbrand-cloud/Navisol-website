import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

export type Bi = { nl?: string; en?: string } | null | undefined;
export type Photo = { image?: { asset?: { _ref?: string } }; url?: string } | null | undefined;

const builder = createImageUrlBuilder({ projectId, dataset });

/** URL van een foto: eerst de upload, anders het pad of de link. */
export function photoSrc(photo: Photo, width = 2400): string {
  if (photo?.image?.asset?._ref) {
    return builder.image(photo.image).width(width).auto("format").url();
  }
  return photo?.url || "";
}

/** Tekst in de gekozen taal; valt terug op Nederlands. */
export function pick(value: Bi, lang: "nl" | "en"): string {
  return value?.[lang] || value?.nl || "";
}

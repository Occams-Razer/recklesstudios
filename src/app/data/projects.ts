/**
 * Selected work.
 *
 * Titles and years are derived from the source filenames and Mux upload
 * dates. Edit this file to give each piece its real title, year, and any
 * extra metadata; the Work section renders whatever is here.
 */
import type { Asset } from "next-video/dist/assets.js";
import carShow from "/videos/car-show.mp4";
import football from "/videos/football.mp4";
import sunsetVideo from "/videos/sunset-video.mp4";

export type FilmProject = {
  kind: "film";
  slug: string;
  index: string;
  title: string;
  year: string;
  asset: Asset;
  /** Aspect ratio of the frame in the layout (not the source). */
  ratio: "16/9" | "4/5" | "3/2";
};

export type PosterProject = {
  kind: "poster";
  slug: string;
  index: string;
  title: string;
  year: string;
  production: string;
  byline: string;
  cast: string[];
  image: { src: string; width: number; height: number; alt: string };
};

export type Project = FilmProject | PosterProject;

export const featured: PosterProject = {
  kind: "poster",
  slug: "one-last-shot",
  index: "01",
  title: "One Last Shot.",
  year: "2025",
  production: "A Reckless Studios production",
  byline: "Original series by Ranger Howard and Mazi Dossa",
  cast: [
    "Daveed Musombwa",
    "Mirabelle Niebauer",
    "Isabella Berthelon",
    "Miles Hayward",
    "Addison Bean",
    "Adam Brown",
    "Ari Marckel",
    "Kai Marckel",
    "Lexi Schmitz",
  ],
  image: {
    src: "/work/one-last-shot.webp",
    width: 1600,
    height: 2390,
    alt: "A still from One Last Shot: a young man drinks from a glass while friends' hands cross the foreground.",
  },
};

export const films: FilmProject[] = [
  {
    kind: "film",
    slug: "car-show",
    index: "02",
    title: "Car Show",
    year: "2025",
    asset: carShow,
    ratio: "16/9",
  },
  {
    kind: "film",
    slug: "football",
    index: "03",
    title: "Football",
    year: "2025",
    asset: football,
    ratio: "4/5",
  },
  {
    kind: "film",
    slug: "sunset",
    index: "04",
    title: "Sunset",
    year: "2025",
    asset: sunsetVideo,
    ratio: "3/2",
  },
];

export const projectCount = films.length + 1;

export function playbackId(asset: Asset): string | undefined {
  return asset.providerMetadata?.mux?.playbackId as string | undefined;
}

export function posterUrl(asset: Asset, width = 1280, time = 1): string | undefined {
  const id = playbackId(asset);
  return id ? `https://image.mux.com/${id}/thumbnail.webp?width=${width}&time=${time}` : asset.poster;
}

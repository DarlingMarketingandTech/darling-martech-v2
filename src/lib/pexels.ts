export type PexelsPhoto = {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
  };
  alt: string;
  photographer: string;
};

type PexelsPhotoSearchResponse = {
  photos: PexelsPhoto[];
};

export type PexelsVideoFile = {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  link: string;
};

export type PexelsVideo = {
  id: number;
  image: string;
  duration: number;
  video_files: PexelsVideoFile[];
  user: { name: string; url: string };
};

type PexelsVideoSearchResponse = {
  videos: PexelsVideo[];
};

function pexelsHeaders(): HeadersInit {
  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    throw new Error("PEXELS_API_KEY is not configured");
  }
  return { Authorization: key };
}

/**
 * Server-only: call from Server Components or Route Handlers.
 * Respect Pexels API limits and attribution rules.
 */
export async function searchPexelsPhotos(
  query: string,
  perPage: number = 10
): Promise<PexelsPhoto[]> {
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(perPage));

  const response = await fetch(url.toString(), {
    headers: pexelsHeaders(),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Pexels photos request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as PexelsPhotoSearchResponse;
  return data.photos;
}

/**
 * Server-only: video backgrounds / motion plates.
 * Prefer the highest-resolution `video_files` entry appropriate for web delivery.
 */
export async function searchPexelsVideos(
  query: string,
  perPage: number = 10
): Promise<PexelsVideo[]> {
  const url = new URL("https://api.pexels.com/videos/search");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(perPage));

  const response = await fetch(url.toString(), {
    headers: pexelsHeaders(),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Pexels videos request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as PexelsVideoSearchResponse;
  return data.videos;
}

export type UnsplashImage = {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  user: {
    name: string;
    username: string;
  };
};

type UnsplashSearchResponse = {
  results: UnsplashImage[];
};

/**
 * Server-only: call from Server Components or Route Handlers.
 * Requires `UNSPLASH_ACCESS_KEY` in server env (never `NEXT_PUBLIC_`).
 */
export async function searchUnsplash(
  query: string,
  perPage: number = 10
): Promise<UnsplashImage[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    throw new Error("UNSPLASH_ACCESS_KEY is not configured");
  }

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("client_id", key);

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Unsplash request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as UnsplashSearchResponse;
  return data.results;
}

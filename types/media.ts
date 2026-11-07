export type MediaReview = {
  link?: string | null;
  spoiler?: boolean;
  content?: string | null;
  author?: string | null;
  avatar?: string | null;
  rating?: number | null;
  opinion?: string | null;
};

export type MediaResult = {
  review?: MediaReview | null;
  name: string;
  subname?: string | null;
  description?: string | null;
  storyline?: string | null;
  background?: string | null;
  background_image?: string | null;
  cover?: string | null;
  id?: number | string | null;
  rating?: number | null;
  genres?: (string | null)[] | null;
  demographics?: string[] | null;
  link: string | null;
  status?: string | null;
  type: string;
  typeData?: string;
  date: string | null;
  totalEpisode?: number | string | null;
  season?: string | null;
  runtime?: string | null;
  volumes?: number | string | null;
  chapters?: number | string | null;
  publishing?: boolean | null;
  totalSeason?: number | string | null;
  pages?: number | null;
  tagline?: string | null;
  time?: string | null;
  artist?: { name: string | null; image?: string | null; link?: string | null };
  album?: { name: string | null; image?: string | null };
  vote_count?: number | null;
  budget?: number | null;
  budgetNumber?: number | null;
  revenue?: number | null;
  revenueNumber?: number | null;
  game_type?: string | null;
  game_modes?: (string | null)[] | null;
  platforms?: (string | null)[] | null;
  themes?: (string | null)[] | null;
  language?: {
    languages?: (string | null)[];
    nativeLanguages?: (string | null)[];
    locale?: (string | null)[];
  } | null;
  recommendations?: string[] | null;
  keywords?: string[] | null;
  similar?: string[] | null;
  age_rating?: string | null;
  source?: string | null;
  infoSource?: string | null;
  is_free?: boolean;
  price?: string | null;
  categories?: (string | null)[] | null;
  developers?: string | null;
  recoms?: string[] | null;
  votes?: number | null;
  authors?: { name?: string | null; link?: string | null }[] | null;
  episode_runtime?: string | null;
  duration?: string | null;
  favorite?: boolean;
};

export type DetailedMediaResult = MediaResult & {
  budgetNumber?: number | null;
};

export type SearchData = [string[], ...MediaResult[]];

export type Filters = Partial<
  Record<"anime" | "manga" | "game" | "book" | "serie" | "movie" | "music", boolean>
>;

export type Favorite = {
  name: string;
  type: string;
  image: string | null;
};

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
  background?: string | null;
  background_image?: string | null;
  cover?: string | null;
  id?: string | null;
  rating?: number | null;
  genres?: string[] | null;
  demographics: string[] | null;
  link: string;
  status?: string | null;
  type: string;
  date: string | null;
  totalEpisode?: string;
  season?: string | null;
  runtime?: string | null;
  volumes?: string | null;
  chapters?: string | null;
  publishing?: boolean | null;
  totalSeason?: string | null;
  pages?: string | null;
  tagline?: string | null;
  time?: string;
  artist?: { name: string };
  album?: { name: string };
  vote_count?: number;
  budget?: number;
  budgetNumber?: number;
  revenue?: number;
  revenueNumber?: number;
  game_type?: string;
  game_modes?: string[];
  platforms?: string[];
  themes?: string[];
  language?: { languages?: string[] };
  recommendations?: string[];
  keywords?: string[];
  similar?: string[];
  age_rating?: string;
  typeData: string;
  source?: string;
  duration?: string;
  recoms?: string[];
  votes?: number;
  authors?: { name?: string; link?: string }[];
  episode_runtime?: string;
};

export type DetailedMediaResult = MediaResult & {
  budgetNumber?: number;
};

export type SearchData = [string[], ...MediaResult[]];


export type Filters = Record<string, boolean>;

export type Favorite = {
  name: string;
  type: string;
  image: string;
};

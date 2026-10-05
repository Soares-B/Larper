export type Result = {
  review: {
    [key: string]: any;
  };
  name: string;
  subname?: string | null;
  description?: string | null;
  background?: string | null;
  cover?: string | null;
  id?: string | null;
  rating?: number | null;
  genres?: string[] | null;
  link: string;
  status?: string | null;
  type: string;
  date: string | null;

  totalEpisode?: string;
  season?: string | null;
  runtime?: string | null;
  volumes?: string | null;
  chapters?: string | null;
  totalSeason?: string | null;
  pages?: string | null;
  tagline?: string | null;

  time?: string;
  artist?: {
    name: string;
  };
  album?: {
    name: string;
  };
  vote_count?: number;
  budget?: number;
  budgetNumber: number;
  revenue?: number;
  revenueNumber?: number;

  game_type?: string;
  game_modes?: string[]
  platforms?: string[]
  themes?: string[]
  language?: {
    languages?: string[]
  }

  recommendations?: string[];
  keywords?: string[];
  similar?: string[];

  typeData?: string;
  source?: string;
  duration?: string;
  recoms?: string[];
  votes?: number

  authors?: {
    name?: string;
    link?: string;
  }[];

  episode_runtime?: string;
};

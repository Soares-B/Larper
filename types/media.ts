export type MediaResult = {
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
};

export type SearchData = [string[], ...MediaResult[]];

export type Suggestion = {
  name: string;
  type: string;
};

export type Filters = Record<string, boolean>;

export type Favorite = {
  name: string;
  type: string;
  image: string;
};

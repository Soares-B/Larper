type TenraiShape = {
    info: {
        title_japanese: string,
        title?: string | null,
        synopsis?: string | null,
        background?: string | null,
        images?: {
            jpg?: {
                large_image_url?: string | null
            }
        }
        mal_id: number,
        score?: number | null,
        genres?: [{
            name: string
        }]
        url: string,
        status: string | null

    }
    infoReview?: {
        is_spoiler: boolean,
        user: {
            username: string,
        }
        score: number,
        tags: string[],
        review: string
    }
}

type AnimeShape = TenraiShape & {
    info: {
        aired?: {
            from: string | null,
            to?: string | null,
        } | null,
        episodes?: number | null,
        season?: string | null,
        airing?: boolean | null,
        rating?: string | null,
        source?: string | null
    }
};

type MangaShape = TenraiShape & {
    info: {
        published?: {
            from: string | null,
            to?: string | null,
        } | null,
        chapters?: number | null,
        volumes?: number | null,
        publishing?: boolean | null
    }
}

type IGDBShape = {
    info: {
        id: number,
        name: string | null,
        summary: string | null,
        storyline: string | null,
        age_ratings: {
            synopsis: string | null,
        }[]
        cover: {
            url: string | null,
        },
        game_modes: {
            name: string | null,
        }[],
        genres: {
        id: number;
        name: string | null;
        }[]
        platforms: {
            id: number;
            name: string | null;
        }[]
        themes: {
            id: number;
            name: string | null;
        }[],
        rating: number | null;
        release_dates: {
            human: string | null;
        }[]
        url: string | null;
        game_type: {
            type: string | null;
        }

    },
    languagesData: [
        {
            id: number | null;
            name: string | null;
            native_name: string | null;
            locale: string | null;
        }
    ]
}

type BookShape = {
    info: {
        title: string,
        subtitle: string | null,
        authors: string[] | null,
        description: string | null,
        averageRating: number | null,
        categories: [
            {
                genre: string | null,
            }
        ] | null,
        imageLinks: {
            thumbnail: string | null,
    },
        pageCount: number | null,
        publishedDate: string | null,
        language: string | null,
        infoLink: string | null,
    }
}

type TMDBShape = {
    info: {
        overview?: string | null,
        poster_path?: string | null,
        backdrop_path?: string | null
        id: number,
        vote_average?: number | null
    },
    dataDetails: {
        genres?: [
            {name?: string | null}
        ] | null
        tagline: string | null,
    },
    infoReview?: {
        author?: string | null,
        author_details?: {
            rating?: number | null,
        } | null,
        content?: string | null
    }
}

type SerieShape = TMDBShape & {
    info: {
        original_name: string,
        name: string | null,
        first_air_date: string | null,
    },
    dataDetails: {
        number_of_episodes: number | null,
        number_of_seasons: number | null,
    }
}

type MovieShape = TMDBShape & {
    info: {
        original_title: string,
        title: string | null,
        release_date: string | null,
    },
    dataDetails: {
        runtime: number | null,

    }
}

type MusicShape = {
    info: {
        title: string,
        preview: string | null,
        md5_image: string | null,
        link: string | null,
        duration: number | null,
        id: number,
        
        artist: {
            name: string | null,
            picture_big: string | null,
            link: string | null,
        },
        album: {
            title: string | null,
            cover_big: string | null
        }
    },
}

class Tenrai{
    
    name: string;
    subname: string | null;
    description: string | null;
    background: string | null;
    cover: string | null;
    id: number;
    rating: number | null;
    genres: string[] | null;
    link: string;
    status: string | null;
    background_image: string | null
    
    review: {
        spoiler: boolean;
        author: string;
        rating: number;
        opinion: string;
        content: string
    } | object


    constructor(obj: TenraiShape){
        this.review = {};
        this.name = obj.info.title_japanese;
        this.subname = obj.info.title ?? null;
        this.description = textShortener(obj.info.synopsis ?? null);
        this.background = textShortener(obj.info.background ?? null);
        this.cover = obj.info.images?.jpg?.large_image_url ?? null;
        this.background_image = this.cover
        this.id = obj.info.mal_id;
        this.rating = obj.info.score ?? null;
        this.genres = obj.info.genres?.map(g => g.name) ?? null;
        this.link = obj.info.url;
        this.status = obj.info.status ?? null;   
        
        if (obj.infoReview){
            this.review = {
                spoiler: obj.infoReview.is_spoiler,
                author: obj.infoReview.user.username,
                rating: obj.infoReview.score,
                opinion: obj.infoReview.tags[0] ?? "",
                content: textShortener(obj.infoReview.review)
            };
        }
    }
}

class Anime extends Tenrai{

    date: string | null | undefined;
    type: string;
    totalEpisode: number | null;
    season: string | null;
    airing: boolean | null;
    age_rating: string | null;
    source: string | null

    constructor(obj: AnimeShape){
        super(obj)
        this.date = obj.info.aired ? obj.info.aired["from"]?.slice(0, 10) : null;
        this.type = 'anime';
        this.totalEpisode = obj.info.episodes ?? null;
        this.season = obj.info.season ?? null;
        this.airing = obj.info.airing ?? null;
        this.age_rating = obj.info.rating ?? null;
        this.source = obj.info.source ?? null;
    }
}

class Manga extends Tenrai{

    date: string | null | undefined;
    type: string;
    chapters: number | null;
    volumes: number | null;
    publishing: boolean | null;

    constructor(obj: MangaShape){
        super(obj)
        this.date = obj.info.published? obj.info.published["from"]?.slice(0, 10) : null;
        this.type = 'manga';
        this.chapters = obj.info.chapters ?? null;
        this.volumes = obj.info.volumes ?? null;
        this.publishing = obj.info.publishing ?? null;
    }
}

class Game{

    id: number;
    name: string | null;
    description: string | null;
    storyline: string | null;
    age_rating: string | null;
    cover: string | null;
    game_modes: (string | null)[];
    genres: (string | null)[];
    platforms: (string | null)[];
    themes: (string | null)[];
    rating: number | null;
    date: string | null;
    link: string | null;
    game_type: string | null;
    type: string;
    background: string | null;

    language: {
        languages: (string | null)[]
        nativeLanguages: (string | null)[]
        locale: (string | null)[]
    } | null;

    constructor(obj: IGDBShape) {
        
        this.id = obj.info.id;
        this.name = obj.info.name;
        this.description = textShortener(obj.info.summary);
        this.storyline = obj.info.storyline ?? null;
        this.age_rating = obj.info.age_ratings ? obj.info.age_ratings.find(age => age.synopsis)?.synopsis ?? null : null;
        this.cover = obj.info.cover?.url ? `https:${obj.info.cover.url}` : null;
        this.background = this.cover
        this.game_modes = obj.info.game_modes?.map(gm => gm.name) ?? null;
        this.genres = obj.info.genres?.map(g => g.name) ?? null;
        this.platforms = obj.info.platforms?.map(p => p.name) ?? null;
        this.themes = obj.info.themes?.map(t => t.name) ?? null;
        this.rating = obj.info.rating ? Number((obj.info.rating / 10).toFixed(1)) : null;
        this.date = obj.info.release_dates ? obj.info.release_dates[0].human : null;
        this.link = obj.info.url;
        this.game_type = obj.info.game_type?.type ?? null;
        this.type = 'game'

        if (obj.languagesData){
            this.language = {
                languages: obj.languagesData.map(l => l.name),
                nativeLanguages: obj.languagesData.map(l => l.native_name),
                locale: obj.languagesData.map(l => l.locale)
            } 
        } else {
            this.language = null;
        }      
    }
}

class Book{

    name: string;
    subname?: string | null;
    author: string[] | null;
    description: string | null;
    rating?: number | null;
    genres: {
        genre: string | null,
    }[] | null;
    cover: string | null;
    language: string | null;
    pages: number | null;
    date: string | null;
    link: string | null;
    type: string;
    background: string | null;

    constructor(obj: BookShape){
        this.name = obj.info.title;
        this.subname = obj.info.subtitle;
        this.author = obj.info.authors;
        this.description = textShortener(obj.info.description);
        this.rating = obj.info.averageRating ? obj.info.averageRating * 2 : null;
        this.genres = obj.info.categories?.map(genre => genre) ?? null;
        this.cover = obj.info.imageLinks?.["thumbnail"];
        this.background = this.cover
        this.language = obj.info.language;
        this.pages = obj.info.pageCount;
        this.date = obj.info.publishedDate;
        this.link = obj.info.infoLink;
        this.type = 'book';
    }
}

class TMDB{

    description: string | null;
    cover: string | null;
    background: string | null;
    id: number;
    rating: number | null;
    genres: any[] | null;
    tagline: string | null;

    review: {
        author: string | null;
        rating: number | null;
        content: string | null;
    } | null


    constructor(obj: TMDBShape){
        this.description = obj.info.overview ? obj.info.overview : null;
        this.cover = `https://image.tmdb.org/t/p/w500${obj.info.poster_path}`;
        this.background = `https://image.tmdb.org/t/p/w500${obj.info.backdrop_path}`;
        this.id = obj.info.id;
        this.rating = Number(obj.info.vote_average?.toFixed(2)) ?? null;
        this.genres = obj.dataDetails.genres?.map(g => g.name) ?? null;
        this.tagline = obj.dataDetails.tagline ? obj.dataDetails.tagline : null;

        if (obj.infoReview) {
            this.review = {
                author: obj.infoReview.author ?? null,
                rating: Number(obj.infoReview.author_details?.rating?.toFixed(1)) ?? null,
                content: textShortener(obj.infoReview.content ?? null)
            };
        } else {
            this.review = null;
        }
    }
}

class Serie extends TMDB{

    name: string;
    subname: string | null;
    date: string | null;
    type: string;
    totalEpisode: number | null;
    totalSeason: number | null;
    link: string | null;

    constructor(obj: SerieShape){
        super(obj)
        this.name = obj.info.original_name;
        this.subname = obj.info.name;
        this.date = obj.info.first_air_date;       
        this.type = 'serie'
        this.totalEpisode = obj.dataDetails.number_of_episodes;
        this.totalSeason = obj.dataDetails.number_of_seasons;
        this.link = `https://www.themoviedb.org/tv/${obj.info.id}`;
    }
}

class Movie extends TMDB{

    name: string;
    subname: string | null;
    date: string | null;
    type: string;
    runtime: String | null;
    link: string | null;


    constructor (obj: MovieShape){
        super(obj)
        this.name = obj.info.original_title;
        this.subname = obj.info.title;
        this.date = obj.info.release_date;
        this.type = 'movie';
        this.runtime = `${Math.floor((obj.dataDetails.runtime ?? 0) / 60)}h${(obj.dataDetails.runtime ?? 0) % 60}m`;
        this.link = `https://www.themoviedb.org/movie/${obj.info.id}`;
    }
}

class Music{

    name: string;
    preview: string | null;
    cover: string | null;
    link: string | null;
    time: string | null;
    id: number;
    type: string;
    background: string | null;

    artist: {
        name: string | null;
        image: string | null;
        link: string | null;
    };
    album: {
        name: string | null;
        image: string | null;
    }

    constructor(obj: MusicShape){

        this.name = obj.info.title;
        this.preview = obj.info.preview ? obj.info.preview : null;
        this.cover = `https://e-cdns-images.dzcdn.net/images/cover/${obj.info.md5_image}/750x750.jpg`
        this.background = this.cover
        this.link = obj.info.link
        const duration = obj.info.duration ?? 0;

        this.time = `${Math.floor(duration / 60)}m${String(duration % 60).padStart(2, "0")}s`;
        this.id = obj.info.id;
        this.type = 'music';

        this.artist = {
            name: obj.info.artist?.name ?? null,
            image: obj.info.artist?.picture_big ?? null,
            link: obj.info.artist?.link ?? null

        }
        this.album = {
            name: obj.info.album?.title ?? null,
            image: obj.info.album?.cover_big ?? null,
        }
    }
}

function textShortener(desc: string | null) {
  if (!desc) return null;

  const MAX_LENGTH = 200;

  if (desc.length <= MAX_LENGTH) {
    return desc;
  }

  const firstPeriod = desc.indexOf(".");
  
  if (firstPeriod === -1 || firstPeriod >= MAX_LENGTH) {
    return "Very long text :(";
  }

  const secondPeriod = desc.indexOf(".", firstPeriod + 1);

  if (secondPeriod === -1 || secondPeriod >= MAX_LENGTH) {
    return desc.slice(0, firstPeriod + 1);
  }

  return desc.slice(0, secondPeriod + 1);
}


export default function Restructure(media: any, type: string){
    if (type === "anime"){
        const data = new Anime(media)

        return data

    } else if (type === "manga"){
        const data = new Manga(media)

        return data

    }

    else if (type === "game"){
        const data = new Game(media)

        return data

    }

    else if (type === "book"){
        const data = new Book(media)

        return data

    }

    else if (type === "serie"){
        const data = new Serie(media)

        return data

    }

    else if (type === "movie"){
        const data = new Movie(media)

        return data

    }

    else if (type === "music"){
        const data = new Music(media)

        return data

    }
}
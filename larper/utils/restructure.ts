import { NextResponse } from "next/server"

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

function textShortener(desc: string | null){
    if (desc == null){
        return null
    }

    const firstIndex = desc.indexOf('.');
    const secondIndex = desc.indexOf('.', firstIndex + 1);

    if (secondIndex < 100){
        const thirdIndex = desc.indexOf('.', secondIndex + 1);

        if (thirdIndex > 200){
            return desc.slice(0, secondIndex + 1)
        }else{
           return desc.slice(0, thirdIndex + 1); 
        }

    }else{
        return desc.slice(0, secondIndex + 1)
    }
}

export default function Restructure(media: any, type: string){
    if (type === "anime"){
        const data = new Anime(media)

        return NextResponse.json(data)

    } else if (type === "manga"){
        const data = new Manga(media)

        return NextResponse.json(data)

    }
}
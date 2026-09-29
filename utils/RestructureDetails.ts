import Restructure from "./Restructure";

type AnimeShape = {
    info: {
        scored_by: number | null
    },
    infoFull: {
        type: string | null,
        source: string | null,
        duration: string | null,
    },
    infoRecoms: {
        entry: {
            title: string | null
        }
    }[]
}

type MangaShape = {
    info: {
        scored_by: number | null
    },
    infoFull: {
        type: string | null,
        status: string | null,
        authors: {
            name: string | null;
            link: string | null;
        }[]
    },
    infoRecoms: {
        entry: {
            title: string | null
        }
    }[]
}

type SerieShape = {
    info: {
        vote_count: number | null,
        original_language: string | null,
    },
    dataDetails: {
        episode_run_time: (number | null)[],
        last_episode_to_air: {
            runtime: number | null
        }
    },
    infoRecommendations: {
        name: string
    }[],
    infoKeywords: {
        name: string
    }[],
    infoSimilar: {
        name: string
    }[]
}

type MovieShape = {
    info: {
        vote_count: number | null,
        original_language: string | null,
    },
    dataDetails: {
        budget: number | null,
        revenue: number | null,
    },
    infoRecommendations: {
        title: string
    }[],
    infoKeywords: {
        name: string
    }[],
    infoSimilar: {
        title: string
    }[]
}

class Anime {
    typeData: string | null;
    votes: number | null;
    source: string | null;
    duration: string | null;
    recoms: (string | null)[] | null;

    constructor(obj: AnimeShape) {
        this.typeData = obj.infoFull?.type ?? null;
        this.votes = obj.info?.scored_by ?? null;
        this.source = obj.infoFull?.source ?? null;
        this.duration = obj.infoFull?.duration ?? null;
        this.recoms =
            obj.infoRecoms?.map(r => r.entry.title) ?? null;
    }
}

class Manga {
    typeData: string | null;
    votes: number | null;
    status: string | null;
    authors: ({
        name: string | null,
        link: string | null,
    } | null)[] | null;
    recoms: (string | null)[] | string;

    constructor(obj: MangaShape) {
        this.typeData = obj.infoFull?.type ?? null;
        this.votes = obj.info?.scored_by ?? null;
        this.status = obj.infoFull?.status ?? null;
        this.authors =
            obj.infoFull?.authors?.map(a => ({name: a.name, link: a.link})) ?? null;
        this.recoms =
            obj.infoRecoms?.map(r => r.entry.title) ?? 'No data ∘ ∘ ∘ ( °ヮ° ) ?';
    }
}

class Game{

    constructor(obj: any){

    }
}

class Serie{
    vote_count: number | null;
    original_language: string | null;
    episode_runtime: string | null
    recommendations: string[] | null;
    keywords: string[] | null;
    similar: string[] | null;

    constructor(obj: SerieShape){
        this.vote_count = obj.info.vote_count ?? null;
        this.original_language = obj.info.original_language ?? null;

        if (obj.dataDetails.episode_run_time?.length > 0){
            this.episode_runtime = `${obj.dataDetails.episode_run_time} minutes`;
        }else if (obj.dataDetails.last_episode_to_air.runtime){
            this.episode_runtime = `${obj.dataDetails.last_episode_to_air.runtime} minutes`;
        }else{
            this.episode_runtime = 'No data (ㆆࡇㆆ")';
        }
        this.recommendations = obj.infoRecommendations?.map(r => r.name) ?? null;
        this.keywords = obj.infoKeywords?.map(k => k.name) ?? null;
        this.similar = obj.infoSimilar?.map(s => s.name) ?? null;
    }
}

class Movie{
    vote_count: number | null;
    original_language: string | null;
    budget: string | null;
    budgetNumber: number | null;
    revenue: string | null;
    revenueNumber: number | null;
    recommendations: string[] | null;
    keywords: string[] | null;
    similar: string[] | null;

    constructor(obj: MovieShape){
        this.vote_count = obj.info.vote_count ?? null;
        this.original_language = obj.info.original_language ?? null;
        this.budget = obj.dataDetails.budget?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
            }) ?? null;
        this.budgetNumber = obj.dataDetails.budget ?? null;
        this.revenue = obj.dataDetails.revenue?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
            }) ?? null;
        this.revenueNumber = obj.dataDetails.revenue ?? null;
        this.recommendations = obj.infoRecommendations?.map(r => r.title) ?? null;
        this.keywords = obj.infoKeywords?.map(k => k.name) ?? null;
        this.similar = obj.infoSimilar?.map(s => s.title) ?? null;
    }
}

function insertData(data: any, obj: any){
    const entry = Object.entries(data)

    for (let i = 0; i < entry.length; i++){
        obj[entry[i][0]] = entry[i][1];
    }

    return obj
}

export default function RestructureDetails(media: any, type: string){

    switch (type){
        case 'anime':
            return insertData(
                new Anime(media),
                Restructure(media, 'anime', 'detailed')
            );
        case 'manga':
            return insertData(
                new Manga(media),
                Restructure(media, 'manga', 'detailed')
            );
        case 'game':
            return insertData(
                new Game(media),
                Restructure(media, 'game', 'detailed')
            );
        case 'serie':
            return insertData(
                new Serie(media),
                Restructure(media, 'serie', 'detailed')
            );
        case 'movie':
            return insertData(
                new Movie(media),
                Restructure(media, 'movie', 'detailed')
            );
    }
}
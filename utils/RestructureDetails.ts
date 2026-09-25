import Restructure from "./Restructure";

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

class Movie{
    vote_count: number | null;
    original_language: string | null;
    budget: string | null;
    revenue: string | null;
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
        this.revenue = obj.dataDetails.revenue?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
            }) ?? null;
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
    if (type === 'movie'){
        const data = new Movie(media)
        const restructure = Restructure(media, 'movie')

        const dataFinal = insertData(data, restructure)

        return dataFinal
    }
}
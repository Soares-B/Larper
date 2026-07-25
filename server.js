import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server inicialized in port: ${PORT}`);
}); 

import { searchMovie, searchSerie } from "./Apis/TMDB.js";
import { searchAnime, searchManga } from "./Apis/Tenrai.js";
import { searchBook } from "./Apis/GoogleBooks.js";
import { searchGame } from "./Apis/IGDB.js";
import { searchMusic } from "./Apis/Deezer.js";

class MediaTenrai{
    
    constructor(obj){
        this.review = {};
        this.name = obj.info.title_japanese;
        this.subname = obj.info.title;
        this.description = textShortener(obj.info.synopsis);
        this.background = textShortener(obj.info.background);
        this.cover = obj.info.images?.jpg?.large_image_url ?? null;
        this.id = obj.info.mal_id;
        this.rating = obj.info.score;
        this.genres = obj.info.genres?.map(g => g.name) ?? null;
        this.link = obj.info.url;
        this.status = obj.info.status;

        if (obj.infoReview){
            this.review.spoiler = obj.infoReview.is_spoiler;
            this.review.author = obj.infoReview.user.username;
            this.review.rating = obj.infoReview.score;
            this.review.opinion = obj.infoReview.tags[0];
            this.review.content = textShortener(obj.infoReview.review);
        }        
    }
}

class Anime extends MediaTenrai{

    constructor(obj){
        super(obj)
        this.date = obj.info.aired["from"].slice(0, 10);
        this.type = 'anime';
        this.totalEpisode = obj.info.episodes;
        this.season = obj.info.season;
        this.airing = obj.info.airing;
        this.age_rating = obj.info.rating;
        this.source = obj.info.source;
    }
}

class Manga extends MediaTenrai{
    
    constructor(obj){
        super(obj)
        this.date = obj.info.published["from"].slice(0, 10);
        this.type = 'manga';
        this.chapters = obj.info.chapters;
        this.volumes = obj.info.volumes;
        this.publishing = obj.info.publishing;
    }
}

class Game {
    constructor(obj) {
        this.language = {};
        
        this.id = obj.info.id;
        this.name = obj.info.name;
        this.description = textShortener(obj.info.summary);
        this.storyline = obj.info.storyline ?? null;
        this.age_rating = obj.info.age_ratings ? obj.info.age_ratings.find(age => age.synopsis)?.synopsis ?? null : null;
        this.cover = obj.info.cover?.url ?? null;
        this.game_modes = obj.info.game_modes?.map(gm => gm.name) ?? null;
        this.genres = obj.info.genres?.map(g => g.name) ?? null;
        this.platforms = obj.info.platforms?.map(p => p.name) ?? null;
        this.themes = obj.info.themes?.map(t => t.name) ?? null;
        this.rating = obj.info.rating ? (obj.info.rating / 10).toFixed(1) : null;
        this.date = obj.info.release_dates ? obj.info.release_dates[0].human : null;
        this.link = obj.info.url;
        this.game_type = obj.info.game_type?.type ?? null;
        this.type = 'game'

        if (obj.languagesData){
            this.language.languages = obj.languagesData.map(l => l.name);
            this.language.nativeLanguages = obj.languagesData.map(l => l.native_name);
            this.language.locale = obj.languagesData.map(l => l.locale);
        }      
    }
}

class Book{

    constructor(obj){
        this.name = obj.title;
        this.subname = obj.subtitle;
        this.author = obj.authors;
        this.description = textShortener(obj.description);
        this.rating = obj.averageRating * 2;
        this.genres = obj.categories?.map(genre => genre) ?? null;
        this.cover = obj.imageLinks["thumbnail"];
        this.language = obj.language;
        this.pages = obj.pageCount;
        this.date = obj.publishedDate;
        this.url = obj.infoLink;
        this.type = 'book';
    }
}

class MediaTMDB{

    constructor(obj){
        this.review = {};
        this.description = obj.info.overview ? obj.info.overview : null;
        this.cover = `https://image.tmdb.org/t/p/w500${obj.info.poster_path}`;
        this.background = `https://image.tmdb.org/t/p/w500${obj.info.backdrop_path}`;
        this.id = obj.info.id;
        this.rating = obj.info.vote_average?.toFixed(2) ?? null;
        this.genres = obj.dataDetails.genres?.map(g => g.name) ?? null;
        this.tagline = obj.dataDetails.tagline ? obj.dataDetails.tagline : null;

        if (obj.infoReview) {
            this.review.author = obj.infoReview.author;
            this.review.rating = obj.infoReview.author_details.rating?.toFixed(1) ?? null;
            this.review.content = textShortener(obj.infoReview.content);
        }
    }
}

class Serie extends MediaTMDB{

    constructor(obj){
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

class Movie extends MediaTMDB{

    constructor(obj){
        super(obj)
        this.name = obj.info.original_title;
        this.subname = obj.info.title;
        this.date = obj.info.release_date;
        this.type = 'movie';
        this.runtime = Math.trunc(obj.dataDetails.runtime / 60) + 'h' + obj.dataDetails.runtime % 60 + 'm';
        this.link = `https://www.themoviedb.org/movie/${obj.info.id}`;
    }

}

class Music{

    constructor(obj){
        this.artist = {};
        this.album = {};

        this.name = obj.title;
        this.preview = obj.preview ? obj.preview : null;
        this.cover = `https://e-cdns-images.dzcdn.net/images/cover/${obj.md5_image}/750x750.jpg`
        this.link = obj.link
        this.time = `${Math.trunc(obj.duration / 60)}m${(((obj.duration / 60) % 1).toFixed(1) * 10) * 6}s`
        this.id = obj.id;
        this.type = 'music';

        this.artist.name = obj.artist?.name ?? null;
        this.artist.image = obj.artist?.picture_big ?? null;
        this.artist.link = obj.artist?.link ?? null;

        this.album.name = obj.album?.title ?? null;
        this.album.image = obj.album?.cover_big ?? null;
    }
}

function textShortener(desc){
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

app.get("/search", async (req, res) =>{
    try {
        const query = req.query.q;

        let anime, manga, game, book, music, serie, movie = null;

        serie = await searchSerie(query);
        movie = await searchMovie(query);
        anime = await searchAnime(query);
        manga = await searchManga(query);
        book = await searchBook(query);
        game = await searchGame(query);
        music = await searchMusic(query);

        let response = [[]]

        if (anime !== null){
            anime = new Anime(anime)
            response.push(anime)
            response[0].push('anime')
        }
        if (manga !== null){
            manga = new Manga(manga)
            response.push(manga)
            response[0].push('manga')
        }
        if (game !== null){
            game = new Game(game)
            response.push(game)
            response[0].push('game')
        }
        if (book !== null){
            book = new Book(book)
            response.push(book)
            response[0].push('book')
        }
        if (serie !== null){
            serie = new Serie(serie)
            response.push(serie)
            response[0].push('serie')
        }
        if (movie !== null){
            movie = new Movie(movie)
            response.push(movie)
            response[0].push('movie')
        }
        if (music !== null){
            music = new Music(music)
            response.push(music)
            response[0].push('music')
        }    

        res.json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})
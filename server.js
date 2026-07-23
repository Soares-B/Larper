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

class MediaTenrai{
    
    constructor(obj){
        this.name = obj.info.title_japanese;
        this.subname = obj.info.title;
        this.description = obj.info.synopsis;
        this.cover = obj.info.images["jpg"].large_image_url;
        this.id = obj.info.mal_id;
        this.rating = obj.info.score
        this.genres = obj.info.genres.map(g => g.name);
        this.link = obj.info.url

        if (obj.infoReview){
            this.review_spoiler = obj.infoReview.is_spoiler;
            this.review_author = obj.infoReview.user.username;
            this.review_rating = obj.infoReview.score;
            this.review_opinion = obj.infoReview.tags[0];
            this.review_content = obj.infoReview.review;
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
    }
}

class Manga extends MediaTenrai{
    
    constructor(obj){
        super(obj)
        this.date = obj.info.published["from"].slice(0, 10);
        this.type = 'manga';
        this.chapters = obj.info.chapters;
        this.volumes = obj.info.volumes;
    }
}

class Game {
    constructor(obj) {
        const ageRating = obj.info.age_ratings?.find(age => age.synopsis) ?? null;
        this.language = {};
        
        this.id = obj.info.id;
        this.name = obj.info.name;
        this.description = obj.info.summary;
        this.storyline = obj.info.storyline;
        this.age_rating = ageRating?.synopsis ?? null;
        this.cover = obj.info.cover.url;
        this.game_modes = obj.info.game_modes.map(gm => gm.name);
        this.genres = obj.info.genres.map(g => g.name);
        this.platforms = obj.info.platforms.map(p => p.name);
        this.themes = obj.info.themes.map(t => t.name);
        this.rating = (obj.info.rating / 10).toFixed(1);
        this.date = obj.info.release_dates[0].human;
        this.link = obj.info.url;
        this.game_type = obj.info.game_type.type;
        this.type = 'game'

        this.language.languages = obj.languagesData.map(l => l.name);
        this.language.nativeLanguages = obj.languagesData.map(l => l.native_name);
        this.language.locale = obj.languagesData.map(l => l.locale);
    }
}

class Book{

    constructor(obj){
        this.name = obj.title
        this.subtitle = obj.subtitle;
        this.author = obj.authors;
        this.description = obj.description;
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
        this.description = obj.info.overview;
        this.cover = `https://image.tmdb.org/t/p/w500${obj.info.poster_path}`;
        this.background = `https://image.tmdb.org/t/p/w500${obj.info.backdrop_path}`;
        this.id = obj.info.id;
        this.rating = obj.info.vote_average.toFixed(2);
        this.genres = obj.dataDetails.genres.map(g => g.name);
        this.tagline = obj.dataDetails.tagline;

        if (obj.infoReview) {
            this.review_author = obj.infoReview.author;
            this.review_rating = obj.infoReview.author_details.rating?.toFixed(1) ?? null;
            this.review_content = obj.infoReview.content;
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

app.get("/search", async (req, res) =>{
    try {
        const query = req.query.q;

        let anime, manga, game, book, serie, movie = null;

        serie = await searchSerie(query);
        movie = await searchMovie(query);
        anime = await searchAnime(query);
        manga = await searchManga(query);
        book = await searchBook(query);
        game = await searchGame(query);

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

        res.json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})
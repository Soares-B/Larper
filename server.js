require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server inicialized in port: ${PORT}`);
}); 

const { searchMovie } = require("./Apis/TMDB");
const { searchSerie } = require("./Apis/TMDB");
const { searchAnime } = require("./Apis/Jikan");
const { searchBook } = require("./Apis/OpenLibrary")

function structure(media, type){
    let serie = {
        review: {}
    }
    let movie = {
        review: {}
    }
    if (type === 'serie'){
        serie.name = media.info.original_name;
        serie.subname = media.info.name;
        serie.description = media.info.overview;
        serie.cover = `https://image.tmdb.org/t/p/w500${media.info.poster_path}`;
        serie.background = `https://image.tmdb.org/t/p/w500${media.info.backdrop_path}`;
        serie.id = media.info.id;
        serie.date = media.info.first_air_date;
        serie.rating = media.info.vote_average.toFixed(2);
        serie.type = 'serie'

        serie.genres = media.dataDetails.genres.map(g => g.name);
        serie.totalEpisode = media.dataDetails.number_of_episodes;
        serie.totalSeason = media.dataDetails.number_of_seasons;
        serie.tagline = media.dataDetails.tagline;

        if (media.infoReviews) {
            serie.review.author = media.infoReviews.author;
            serie.review.rating = media.infoReviews.author_details.rating.toFixed(1);
            serie.review.content = media.infoReviews.content;
        }

        serie.link = `https://www.themoviedb.org/tv/${media.info.id}`;

        return serie
    }else if (type === 'movie'){
        movie.name = media.info.original_title;
        movie.subname = null;
        movie.description = media.info.overview;
        movie.cover = `https://image.tmdb.org/t/p/w500${media.info.poster_path}`;
        movie.background = `https://image.tmdb.org/t/p/w500${media.info.backdrop_path}`;
        movie.id = media.info.id;
        movie.date = media.info.release_date;
        movie.rating = media.info.vote_average.toFixed(2);
        movie.type = 'movie';

        movie.genres = media.dataDetails.genres.map(g => g.name);
        movie.runtime = Math.trunc(media.dataDetails.runtime / 60) + 'h' + media.dataDetails.runtime % 60 + 'm'
        movie.tagline = media.dataDetails.tagline;

        if (media.infoReviews) {
            movie.review.author = media.infoReviews.author;
            movie.review.rating = media.infoReviews.author_details.rating.toFixed(1);
            movie.review.content = media.infoReviews.content;
        }

        movie.link = `https://www.themoviedb.org/movie/${media.info.id}`;

        return movie
    }
}

app.get("/search", async (req, res) =>{
    try {
        const query = req.query.q;

        let serie = movie = anime = book = null;

        serie = await searchSerie(query);
        movie = await searchMovie(query);
        anime = await searchAnime(query);
        book = await searchBook(query);

        let response = [[]]

        console.log(book)
        
        if (!Object.hasOwn(anime, 'errorMessage')){
            if (anime !== null){
                anime = structure(anime, 'anime');
                response.push(anime)
                response[0].push('anime')
            }            
        }
        
        response.push(book)

        if (serie !== null){
            serie = structure(serie, 'serie');
            response.push(serie)
            response[0].push('serie')
        }
        if (movie !== null){
            movie = structure(movie, 'movie')
            response.push(movie)
            response[0].push('movie')
        }
         
        
        

        res.json(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
})
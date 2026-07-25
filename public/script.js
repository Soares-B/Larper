const conteudo = document.querySelector('#content');
const form = document.querySelector('#form');
const mediaInput = document.querySelector('#media-input');
const searchButton = document.querySelector('#search');
const list = document.querySelector("#suggestions");

searchButton.disabled = true;

let timeout;

mediaInput.addEventListener('input', () => {
    searchButton.disabled = mediaInput.value.trim() === '';
    clearTimeout(timeout);
    timeout = setTimeout(async () => {

        if (mediaInput.value.trim() === ''){
            list.innerHTML = '';
            return;
        }

        const data = await search(mediaInput.value);
        list.innerHTML = '';
        if (!data) return;
        // data.forEach(media => {
        //     if (!media) return;
        //     const li = document.createElement('li');
        //     const title = media.name
        //     const type = media.type
        //     li.textContent = `${title} (${type})`;
        //     li.dataset.type = type;
        //     li.addEventListener('click', async () => {
        //         const result = await search(title);
        //         addElements(result, type);
        //         conteudo.classList.add('show');
        //         mediaInput.value = '';
        //         list.innerHTML = '';
        //     });
        //     list.appendChild(li);
        // });
    }, 1000);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (mediaInput.value.trim() === '') return;

    const data = await search(mediaInput.value);
    addElements(data, data[0][0]);
    conteudo.classList.add('show');
    list.innerHTML = ''
    mediaInput.value = ''
});

async function search(media) {
    const response = await fetch(`/search?q=${encodeURIComponent(media)}`);
    return await response.json();
}

function addElements(data, type) {
    //Order: Anime, Manga, Game, Book, Serie, Movie, Music 

    const cover = document.querySelector('#cover');
    const title = document.querySelector('#title')
    const name = document.querySelector('#name');
    const subname = document.querySelector('#subname')
    const description = document.querySelector('#description');
    const items = document.querySelector('#items');
    const timeContent = document.querySelector('#timeContent');
    const ratingContent = document.querySelector('#ratingContent');
    const genresContent = document.querySelector('#genreContent');
    const dateContent = document.querySelector('#dateContent');
    const reviewContent = document.querySelector('#reviewContent')
    const reviewAuthor = document.querySelector('#reviewAuthor') 
    const tagline = document.querySelector('#tagline')
    const link = document.querySelector('a')


    list.innerHTML = '';
    
    name.textContent = data[1].name;

    if (data[1].subname != null){
        subname.textContent = data[1].subname;
    }else{
        description.textContent = '';
    }

    cover.src = data[1].cover;
    link.href = data[1].link; 
    if (data[1].description != null){
        description.textContent = data[1].description;
    }else{
        description.textContent = '';
    }

    if (type === 'anime'){
        timeContent.textContent = `Episodes: ${data[1].totalEpisode}`;
        timeContent.style.fontSize = '20px';
        timeContent.style.bottom = '40%';
    }

    if (data[1].rating != null){
        ratingContent.textContent = data[1].rating;
    }else{
        ratingContent.textContent = 'No score :/'
    }
    
    genresContent.textContent = data[1].genres.join(', ')
    dateContent.textContent = data[1].date;

    if (data[1].review != null){
        reviewContent.textContent = data[1].review.content;

        const span = document.createElement('span')
        span.setAttribute('id', 'reviewRating')
        span.textContent = data[1].review.rating?.toFixed(1) ?? ''

        if (data[1].rating >= 7.5){
            span.style.color = '#19ff11'
        }else if (data[1].rating >= 5){
            span.style.color = '#fffb11'
        }else{
            span.style.color = '#ff1111'
        }
        reviewAuthor.innerHTML = ''
        reviewAuthor.append(span, ' - ', data[1].review.author);
    }else{
        reviewContent.textContent = 'No reviews avaliabe :('
    }

    if (data[1].rating >= 7.5){
        ratingContent.style.color = '#19ff11'
    }else if (data[1].rating >= 5){
        ratingContent.style.color = '#fffb11'
    }else{
        ratingContent.style.color = '#ff1111'
    }

    if (type === 'movie' || type === 'serie'){
        tagline.textContent = data[1].tagline;
    }else if (type === 'anime'){
        tagline.textContent = data[1].season;
    }
    
    console.log(data, type)

    items.classList.add("show");
    title.classList.add("show");
    name.classList.add("show");
    cover.classList.add("show");
    tagline.classList.add("show");
}
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
        data.forEach(media => {
            if (!media) return;
            const li = document.createElement('li');
            const title = media.name
            const type = media.type
            li.textContent = `${title} (${type})`;
            li.dataset.type = type;
            li.addEventListener('click', async () => {
                const result = await search(title);
                addElements(result, type);
                conteudo.classList.add('show');
                mediaInput.value = '';
                list.innerHTML = '';
            });
            list.appendChild(li);
        });
    }, 1000);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (mediaInput.value.trim() === '') return;

    const data = await search(mediaInput.value);
    const type = data[1] ? "serie" : "movie";
    addElements(data, type);
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
    const name = document.querySelector('#name');
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
    let typenumber = null;

    if (type === 'serie') {
        typenumber = 0
    } else if (type === 'movie'){
        typenumber = 1;
    }

    if (typenumber === null) return;
    console.log(data)

    name.textContent = data[1].name;

    const oneOcurrancy = data[1].description.indexOf('.');
    const twoOcurrancy = data[1].description.indexOf('.', oneOcurrancy + 1);

    description.textContent = data[1].description.slice(0, twoOcurrancy + 1);

    cover.src = data[1].cover;
    
    link.href = data[1].link;
    link.target = '_blank'
    link.rel = 'nofollow'

    if (typenumber === 1){
        timeContent.textContent = data[1].runtime;
        timeContent.style.fontSize = '36px';
        timeContent.style.left = '5%';
        timeContent.style.bottom = '10%';
    }else if (typenumber === 0){
        timeContent.textContent = '';
        const br = document.createElement('br');
        
        timeContent.append(`Episodes: ${data[1].totalEpisode}`, br, `Seasons: ${data[1].totalSeason}`);
        timeContent.style.fontSize = '16px';
        timeContent.style.left = '5%';
        timeContent.style.bottom = '25%';
    }
    
    ratingContent.textContent = data[1].rating;
    dateContent.textContent = data[1].date;
    genresContent.textContent = data[1].genres.join(', ');

    if (data[1].review.author){
        const firstOcurrancy = data[1].review.content.indexOf('.');
        const secondOcurrancy = data[1].review.content.indexOf('.', firstOcurrancy + 1);

        if (secondOcurrancy < 100){
            const thirdOcurrancy = data[1].review.content.indexOf('.', secondOcurrancy + 1);
            reviewContent.textContent = `"${data[1].review.content.slice(0, thirdOcurrancy)}..."`;
        }else{
            reviewContent.textContent = `"${data[1].review.content.slice(0, secondOcurrancy)}..."`;
        }
    
        reviewAuthor.textContent = '';

        let span = document.createElement('span');
        span.innerHTML = data[1].review.rating;

        reviewAuthor.append(span, ' - ' + data[1].review.author);

        if (data[1].review.rating > 7.5){
            span.style.color = '#25ff25';
        }else if (data[1].review.rating > 5){
            span.style.color = '#ffe925';
        }else{
            span.style.color = '#ff1010';
        }
    }else{
        reviewContent.textContent = 'No available reviews :/'
        reviewAuthor.innerHTML = ''
    }

    tagline.textContent = data[1].tagline

    if (data[1].rating > 7.5){
        ratingContent.style.color = '#25ff25';
    }else if (data[1].rating > 5){
        ratingContent.style.color = '#ffe925';
    }else{
        ratingContent.style.color = '#ff1010';
    }

    items.classList.add("show");
    name.classList.add("show");
    cover.classList.add("show");
    tagline.classList.add("show");
}
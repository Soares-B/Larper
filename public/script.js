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
    }, 10);
});

searchButton.addEventListener('click', async () => {
    if (mediaInput.value.trim() === '') return;

    const data = await search(mediaInput.value);
    const type = data[0] ? "serie" : "movie";
    addElements(data, type);
    conteudo.classList.add('show');
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (mediaInput.value.trim() === '') return;

    const data = await search(mediaInput.value);
    const type = data[0] ? "serie" : "movie";
    addElements(data, type);
    conteudo.classList.add('show');
});

async function search(media) {
    const response = await fetch(`/search?q=${encodeURIComponent(media)}`);
    return await response.json();
}

function addElements(data, type) {
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

    name.textContent = data[typenumber].name;

    const oneOcurrancy = data[typenumber].description.indexOf('.');
    const twoOcurrancy = data[typenumber].description.indexOf('.', oneOcurrancy + 1);

    description.textContent = data[typenumber].description.slice(0, twoOcurrancy + 1);

    cover.src = data[typenumber].cover;
    
    link.href = data[typenumber].link;
    link.target = '_blank'
    link.rel = 'nofollow'

    if (typenumber === 1){
        timeContent.textContent = data[typenumber].runtime;
        timeContent.style.fontSize = '36px';
        timeContent.style.left = '5%';
        timeContent.style.bottom = '10%';
    }else if (typenumber === 0){
        timeContent.textContent = '';
        const br = document.createElement('br');
        
        timeContent.append(`Episodes: ${data[typenumber].totalEpisode}`, br, `Seasons: ${data[typenumber].totalSeason}`);
        timeContent.style.fontSize = '16px';
        timeContent.style.left = '5%';
        timeContent.style.bottom = '25%';
    }
    
    ratingContent.textContent = data[typenumber].rating;
    dateContent.textContent = data[typenumber].date;
    genresContent.textContent = data[typenumber].genres.join(', ');

    if (data[typenumber].review.author){
        const firstOcurrancy = data[typenumber].review.content.indexOf('.');
        const secondOcurrancy = data[typenumber].review.content.indexOf('.', firstOcurrancy + 1);

        if (secondOcurrancy < 100){
            const thirdOcurrancy = data[typenumber].review.content.indexOf('.', secondOcurrancy + 1);
            reviewContent.textContent = `"${data[typenumber].review.content.slice(0, thirdOcurrancy)}..."`;
        }else{
            reviewContent.textContent = `"${data[typenumber].review.content.slice(0, secondOcurrancy)}..."`;
        }
    
        reviewAuthor.textContent = '';

        let span = document.createElement('span');
        span.innerHTML = data[typenumber].review.rating;

        reviewAuthor.append(span, ' - ' + data[typenumber].review.author);

        if (data[typenumber].review.rating > 7.5){
            span.style.color = '#25ff25';
        }else if (data[typenumber].review.rating > 5){
            span.style.color = '#ffe925';
        }else{
            span.style.color = '#ff1010';
        }
    }else{
        reviewContent.textContent = 'No available reviews :/'
        reviewAuthor.innerHTML = ''
    }

    tagline.textContent = data[typenumber].tagline

    if (data[typenumber].rating > 7.5){
        ratingContent.style.color = '#25ff25';
    }else if (data[typenumber].rating > 5){
        ratingContent.style.color = '#ffe925';
    }else{
        ratingContent.style.color = '#ff1010';
    }

    items.classList.add("show");
    name.classList.add("show");
    cover.classList.add("show");
    tagline.classList.add("show");

    console.log(data);
}
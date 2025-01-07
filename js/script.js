const BAERER_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDE0OWU3MDE1ZTM2MjI5ZWE5MWQ1MmM4MWQzZGE4YiIsIm5iZiI6MTczNDQyNzQ2NC4wOCwic3ViIjoiNjc2MTQzNDgzN2VlMDEzYmRjMTg5YWVjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hCmbRiHu1Pc3OrViPE51Nqlsx8UMKeBByccZt99Mi8A';

const topRatedButton = document.getElementById("top-rated-button");

const popularButton = document.getElementById("popular-button");

const form = document.getElementById('search-form');

const searchInput = document.getElementById('search-bar');

// Jag fick hjälp av chatgpt för att hitta basURLn

const BASE_URL = 'https://api.themoviedb.org/3';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500'

const imgContainer = document.getElementById("img-container");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BAERER_KEY}`
    }
};


topRatedButton.addEventListener('click', event => {
    event.preventDefault();

    const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

    fetch(url, options)
        .then(res => res.json())
        .then(displayTopRatedMovies)
        .catch(err => console.error('error:' + err));
});

function displayTopRatedMovies(topRatedObj) {
    imgContainer.innerHTML = '';

    for (const result of topRatedObj.results) {

        let indexNumber = topRatedObj.results.indexOf(result);

        if (indexNumber <= 9) {
            console.log(result);

            const movieImgDiv = document.createElement('div');
            movieImgDiv.className = "movie-img-div";

            imgContainer.append(movieImgDiv);

            const imgElement = document.createElement('img');
            imgElement.src = `${BASE_IMG_URL}${result.poster_path}`;
            imgElement.alt = result.title;
            movieImgDiv.append(imgElement);


            anime({
                targets: 'img',
                scale: 1.1,
                easing: 'easeInOutQuad',
                duration: 350,
                direction: 'alternate',
            })


            console.log(`${BASE_IMG_URL}${result.poster_path}`);

            const movieTitle = document.createElement('h3');
            movieTitle.innerText = result.original_title;

            movieImgDiv.append(movieTitle);

            const releaseDate = document.createElement('p');
            releaseDate.innerText = result.release_date;

            movieImgDiv.append(releaseDate);

        }

    }

};

popularButton.addEventListener('click', event => {
    event.preventDefault();


    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

    fetch(url, options)
        .then(res => res.json())
        .then(displayPopularMovies)
        .catch(err => console.error('error:' + err));
});

function displayPopularMovies(popularObj) {
    imgContainer.innerHTML = '';

    for (const result of popularObj.results) {

        let indexNumber = popularObj.results.indexOf(result);

        if (indexNumber <= 9) {
            console.log(result);

            const movieImgDiv = document.createElement('div');
            movieImgDiv.className = "movie-img-div";

            imgContainer.append(movieImgDiv);

            const imgElement = document.createElement('img');
            imgElement.src = `${BASE_IMG_URL}${result.poster_path}`;
            imgElement.alt = result.title;
            movieImgDiv.append(imgElement);


            anime({
                targets: 'img',
                scale: 1.1,
                easing: 'easeInOutQuad',
                duration: 350,
                direction: 'alternate',
            })

            const movieTitle = document.createElement('h3');
            movieTitle.innerText = result.original_title;

            movieImgDiv.append(movieTitle);

            const releaseDate = document.createElement('p');
            releaseDate.innerText = result.release_date;

            movieImgDiv.append(releaseDate);

        }

    }

};

form.addEventListener('submit', event => {
    event.preventDefault();

    const movieName = searchInput.value;

    const url = `https://api.themoviedb.org/3/search/multi?query=${movieName}&include_adult=false&language=en-US&page=1`;



    event.preventDefault();

    fetch(url, options)
    .then(res => res.json())
    .then(displaySearchResult)
    .catch(err => {

        console.error('Error:', err.message);  
        const errorText = document.createElement('p');
        errorText.innerText = "No search results found, try searching for something else!";
        document.body.append(errorText);  
    });
});

function displaySearchResult(searchObj) {

    const movieName = searchInput.value;
    imgContainer.innerHTML = '';

//chatgpt 
    if (!searchObj.results || searchObj.results.length === 0) {
        throw new Error('No search results found');
        
    }

    for (const result of searchObj.results) {

        console.log(result);

        if (result.media_type === 'movie') {
            const movieImgDiv = document.createElement('div');
            movieImgDiv.className = "movie-img-div";

            imgContainer.append(movieImgDiv);

            const imgElement = document.createElement('img');
            imgElement.src = `${BASE_IMG_URL}${result.poster_path}`;
            imgElement.alt = result.title;
            movieImgDiv.append(imgElement);


            anime({
                targets: 'img',
                scale: 1.1,
                easing: 'easeInOutQuad',
                duration: 350,
                direction: 'alternate',
            })

            const movieTitle = document.createElement('h3');
            movieTitle.innerText = result.title;

            movieImgDiv.append(movieTitle);

            const releaseDate = document.createElement('p');
            releaseDate.innerText = result.release_date;

            movieImgDiv.append(releaseDate);

            const description = document.createElement('p');
            description.innerText = result.overview;

            movieImgDiv.append(description);

            if (result.poster_path === null) {
                imgElement.src = "./images/image-error.jpg";

            }
        }
        else if (result.media_type === 'person') {
            const movieImgDiv = document.createElement('div');
            movieImgDiv.className = "movie-img-div";

            imgContainer.append(movieImgDiv);

            const imgElement = document.createElement('img');
            imgElement.src = `${BASE_IMG_URL}${result.profile_path}`;
            imgElement.alt = result.name;
            movieImgDiv.append(imgElement);

            const actorName = document.createElement('h3');
            actorName.innerText = result.name;

            movieImgDiv.append(actorName);

            const knownFor = document.createElement('p');
            knownFor.innerText = `Department: ${result.known_for_department}`;

            movieImgDiv.append(knownFor);

            const tvAndMovies = document.createElement('ul');
            tvAndMovies.innerText = "TV & Movies:";

            movieImgDiv.append(tvAndMovies);

            result.known_for.forEach(object => {

                const list = document.createElement('li');
                tvAndMovies.append(list);

                if (object.media_type === 'movie') {

                    list.innerText = `Movie: ${object.title}`;

                }
                else if (object.media_type === 'tv') {
                  
                    list.innerText = `TV: ${object.name}`;
                }
            });

            if (result.profile_path === null) {
                imgElement.src = "./images/image-error.jpg";

            }

        }
        else if (result.media_type === 'tv') {

            const movieImgDiv = document.createElement('div');
            movieImgDiv.className = "movie-img-div";

            imgContainer.append(movieImgDiv);

            movieImgDiv.remove();


        }
    }
}

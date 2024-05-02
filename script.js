const API_KEY = '527433f85c04959fdf15e2e588f9122d'
const image_path = `https://image.tmdb.org/t/p/w1280`

// selecting the dom elements for manipulation
const input= document.querySelector('#searchInput');
const searchButton= document.querySelector('#searchButton');
const main_grid_title = document.querySelector('.favorites h1')
const main_grid = document.querySelector('.favorites .movies-grid')
const trending_el = document.querySelector('.trending .movies-grid')

const popup_container = document.querySelector('.popup-container')

// search movies

// test cases
// searchedMovies('527433f85c04959fdf15e2e588f9122d', 'game')
//     .then(results => console.log('Movie Results:', results))
//     .catch(error => console.error('Failed to fetch movies:', error));
// test case

// Searches for movies on TMDb using an API key and a user-provided search term,
async function searchedMovies(API_KEY, searchTerm) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`;
// encodeURIComponent on the searchTerm to ensure that any special characters are correctly encoded in the URL, for preventing errors in the URL when the search term includes characters like spaces
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results; // Returns an array of movie results
    } catch (error) {
        console.error('Error searching for movies:', error);
        return [];
    }
}
// adding a click event listener to the search button
searchButton.addEventListener('click', add_searched_movies_to_dom)

// function to add the searched item to the dom
async function add_searched_movies_to_dom() {
    // console.log("Search Button Clicked");  // Check if the function is triggered
    console.log("Search Term:", input.value);  // Verify that the input value is read correctly

    const data = await searchedMovies(API_KEY, input.value);
    // console.log(data);  // Check what data is returned from the API

    // Updating Main Grid Title from main_grid_title to "Search Results..
    main_grid_title.innerText = `Search Results...`
    // map() function is being used to iterate over each item in the data array. 
    main_grid.innerHTML = data.map(e => {
        // displaying the titles
        // console.log(e.title);
        return `
        <div class="card" data-id="${e.id}">
                <div class="img">
                    <img src="${image_path + e.poster_path}">
                </div>
                <div class="info">
                    <h2>${e.title}</h2>
                    <div class="single-info">
                        <span>Rate: </span>
                        <span>${e.vote_average} / 10</span>
                    </div>
                    <div class="single-info">
                        <span>Release Date: </span>
                        <span>${e.release_date}</span>
                    </div>
                </div>
            </div>
    `
    // Join all HTML strings into one to set as innerHTML of  main grid    
    }).join('');

    // we want to ensure that when we click the card, a pop should display
    const cards = document.querySelectorAll('.card')
    addClickEffectToCard(cards)
}

// FUNCTION TO ADD THE CLICK EFFECT TO THE CARD
function addClickEffectToCard (cards) {
    cards.forEach(card => {
        card.addEventListener('click', () => show_popup(card))
    })
}

// search the movies by id
// Fetches a movie from TMDb by its ID
async function getMovieById(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Successfully returns the movie data
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        return null; // Gracefully handle errors by returning null
    }
}
// ENSURING THAT THE getMovieById FUNCTION IS WORKING
// getMovieById('527433f85c04959fdf15e2e588f9122d', 550)
//     .then(result => console.log(result))
//     .catch(error => console.error(error));


// Fetches a movie from TMDb by its trailer
async function getMovieByTrailer(id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const respData = await response.json();

        // Check if there are any videos
        if (respData.results && respData.results.length > 0) {
            // Optionally filter for trailers if necessary; assuming the first video is acceptable otherwise
            const trailer = respData.results.find(video => video.type === "Trailer");
            return trailer ? trailer.key : null; // Return the key of the trailer, or null if no trailer found
        } else {
            return null; // Return null if no videos available
        }
    } catch (error) {
        console.error('Error fetching movie trailer:', error);
        return null; // Return null to indicate failure
    }
}
// Usage example to check if the function works
// getMovieByTrailer(500)  // Replace 500 with a valid movie ID known to have trailers
//     .then(trailerKey => {
//         if (trailerKey) {
//             console.log('Trailer Key:', trailerKey);
//         } else {
//             console.log('No valid trailer key found.');
//         }
//     })
//     .catch(error => console.error('Failed to fetch movie trailer:', error));
// // NOT WORKING

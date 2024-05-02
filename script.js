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

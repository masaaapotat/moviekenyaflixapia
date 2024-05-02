const API_KEY = '527433f85c04959fdf15e2e588f9122d'
const image_path = `https://image.tmdb.org/t/p/w1280`

// selecting the dom elements for manipulation
const input= document.querySelector('#searchInput');
const searchButton= document.querySelector('#searchButton');
const main_grid_title = document.querySelector('.favorites h1')
const main_grid = document.querySelector('.favorites .movies-grid')
const trending_el = document.querySelector('.trending .movies-grid')

const popup_container = document.querySelector('.popup-container')
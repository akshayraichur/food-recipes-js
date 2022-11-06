export const formContainer = document.querySelector('.form-container');
export const searchInput = document.querySelector('.search-input');
export const searchBtn = document.querySelector('.submit-btn');
export const randomBtn = document.querySelector('.random-btn');
export const clearInputBtn = document.querySelector('.close-btn');
export const resultContainer = document.querySelector('.result-container');
export const loader = document.querySelector('.loader');
export const resultTitle = document.querySelector('.result-heading');
export const mealsContainer = document.querySelector('.meals');
export const mealCard = document.querySelector('.meal');
export const mealTitle = document.querySelector('.meal-title');
export const singleMeal = document.querySelector('.single-meal');
export const errorMessage = document.querySelector('.error-message');
export const modalContainer = document.querySelector('.modal-container');
export const modalEl = document.querySelector('.modal');
export const modalCloseBtn = document.querySelector('.modal-close-btn');

export const SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php';
export const SEARCH_QUERY_KEY = '?s=';

export const RANDOM_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

export const LOOKUP_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php';
export const LOOKUP_QUERY_KEY = '?i=';

export const SEARCH = 'SEARCH';
export const RANDOM = 'RANDOM';

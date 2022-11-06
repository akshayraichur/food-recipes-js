import {
  clearInputBtn,
  errorMessage,
  mealsContainer,
  modalEl,
  resultTitle,
  searchInput,
} from './constants.js';

export const buildURLString = (url, queryParam, value) =>
  `${url}${queryParam ?? ''}${value ?? ''}`;

export const fetchData = async (url, queryParam, value) => {
  let endpoint = buildURLString(url, queryParam, value);

  let data = await fetch(endpoint);
  let response = await data.json();

  return response;
};

export const createMealCard = (data, type) => {
  const mealElement = document.createElement(type);
  mealElement.classList.add('meal');
  mealElement.setAttribute('data-meal-id', data.idMeal);
  mealElement.innerHTML = `
    <div class="img-container" data-meal-id="${data.idMeal}">
      <img src="${data.strMealThumb}" alt="dish-image" class="meal-img" loading="lazy" data-meal-id="${data.idMeal}" />
    </div>

    <div class="meal-info" data-meal-id="${data.idMeal}">
      <h3 class="meal-title" data-meal-id="${data.idMeal}">${data.strMeal}</h3>
      <p class="meal-area">Area : ${data.strArea}</p>
      <p class="meal-category">Category : ${data.strCategory}</p>

      <a href="${data.strYoutube}" target="_blank"><button class="meal-button">Youtube</button></a>
      <a href="${data.strSource}" target="_blank"><button class="meal-button">Source</button></a>
      
    </div>

  `;

  return mealElement;
};

export const clearSearchInput = () => {
  searchInput.value = '';
  clearInputBtn.classList.remove('show');
  resultTitle.textContent = '';
  searchInput.focus();
  mealsContainer.innerHTML = '';
};

export const showClearBtn = (e) => {
  if (e.target.value) {
    clearInputBtn.classList.add('show');
    errorMessage.textContent = '';
  } else {
    clearInputBtn.classList.remove('show');
  }
};

export const updateModalContents = (data) => {
  const titleEl = modalEl.querySelector('.modal-title');
  titleEl.textContent = data.strMeal;

  const modalThumbnail = modalEl.querySelector('img');
  const modalArea = modalEl.querySelector('.modal-area');
  const modalCategory = modalEl.querySelector('.modal-category');
  const modalTags = modalEl.querySelector('.modal-tags');
  const modalIngredients = modalEl.querySelector('.modal-ingredients');
  const modalInstructions = modalEl.querySelector('.modal-instructions');
  const ytBtn = modalEl.querySelector('.modal-btn-yt');
  const srcBtn = modalEl.querySelector('.modal-btn-src');

  modalArea.textContent = `Area : ${data.strArea}`;
  modalCategory.textContent = `Category : ${data.strCategory}`;
  modalTags.textContent = `Tags : ${data.strTags}`;
  modalInstructions.textContent = `Instructions : ${data.strInstructions}`;
  modalThumbnail.src = data.strMealThumb;
  ytBtn.href = data.strYoutube;
  srcBtn.href = data.strSource;

  const allKeys = Object.keys(data);
  let ingredientsData = [];
  let measurementsData = [];

  allKeys.forEach((key) => {
    if (key.includes('Ingredient')) {
      ingredientsData.push(data[key]);
    }
    if (key.includes('Measure')) {
      measurementsData.push(data[key]);
    }
  });

  ingredientsData.forEach((value, index) => {
    const eachEl = document.createElement('p');
    eachEl.classList.add('modal-ingredients-data');
    if (value !== '') {
      eachEl.textContent = `${value} : ${measurementsData[index]}`;
      modalIngredients.appendChild(eachEl);
    }
  });
};

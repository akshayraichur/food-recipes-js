import {
  formContainer,
  loader,
  searchInput,
  randomBtn,
  resultTitle,
  mealsContainer,
  singleMeal,
  clearInputBtn,
  SEARCH_URL,
  SEARCH_QUERY_KEY,
  errorMessage,
  SEARCH,
  RANDOM,
  RANDOM_URL,
  modalCloseBtn,
  modalContainer,
  LOOKUP_URL,
  LOOKUP_QUERY_KEY,
} from './constants.js';
import {
  clearSearchInput,
  createMealCard,
  fetchData,
  showClearBtn,
  updateModalContents,
} from './HelperFunctions.js';

const displayMealData = async (urlDetails, type) => {
  const { url, param } = urlDetails;
  loader.classList.add('show');

  // clear everything
  singleMeal.innerHTML = '';
  mealsContainer.innerHTML = '';
  errorMessage.textContent = '';
  resultTitle.textContent = '';

  // get search term
  const searchTerm = searchInput.value;

  if (type === SEARCH) {
    if (searchTerm.trim()) {
      const response = await fetchData(url, param, searchTerm);
      loader.classList.remove('show');

      resultTitle.textContent = `Search results for ${searchTerm} :`;

      if (response?.meals) {
        let result = response?.meals;
        result.map((eachMeal) => {
          mealsContainer.appendChild(createMealCard(eachMeal, 'div'));
        });
      } else {
        resultTitle.textContent += ' No content found!';
      }
    } else {
      errorMessage.textContent = 'Please type something...';
      loader.classList.remove('show');
    }
  }

  if (type === RANDOM) {
    clearSearchInput();
    const response = await fetchData(url);

    loader.classList.remove('show');

    resultTitle.textContent = `Search results for ${response?.meals[0].strMeal} :`;

    if (response?.meals) {
      let result = response?.meals;
      result.map((eachMeal) => {
        mealsContainer.appendChild(createMealCard(eachMeal, 'div'));
      });
    }
  }
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  let endpointDetails = {
    url: SEARCH_URL,
    param: SEARCH_QUERY_KEY,
  };
  displayMealData(endpointDetails, SEARCH);
};

const fetchRandomMeal = () => {
  let endpointDetails = {
    url: RANDOM_URL,
    key: undefined,
  };
  displayMealData(endpointDetails, RANDOM);
};

const fetchMealDetails = async (e) => {
  let mealChild = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal');
    } else return false;
  });

  modalContainer.classList.add('show');
  let selectedMealID = mealChild.getAttribute('data-meal-id');

  let data = await fetchData(LOOKUP_URL, LOOKUP_QUERY_KEY, selectedMealID);

  updateModalContents(data?.meals[0]);
};

const App = () => {
  // event listeners
  formContainer.addEventListener('submit', handleFormSubmit);
  searchInput.addEventListener('input', showClearBtn);
  clearInputBtn.addEventListener('click', clearSearchInput);
  randomBtn.addEventListener('click', fetchRandomMeal);
  modalCloseBtn.addEventListener('click', () =>
    modalContainer.classList.remove('show')
  );

  mealsContainer.addEventListener('click', fetchMealDetails);
};

App();

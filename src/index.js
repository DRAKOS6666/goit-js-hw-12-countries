import './styles.css';
import fetchCountries from './fetchCountries';
import countryList from './templates/countryList.hbs';
import countryItem from './templates/countryItem.hbs';
const debounce = require('lodash.debounce');

const refs = {
  input: document.getElementById('input-search'),
  result: document.querySelector('.search-result'),
};

const handleInput = event => {
  fetchCountries(event.target.value).then(items => {
    refs.result.innerHTML = '';

    if (items.length === 1) {
      console.log(items);
      const template = countryItem(items[0]);
      refs.result.innerHTML = template;
    }

  });
};

refs.input.addEventListener('input', debounce(handleInput, 500));

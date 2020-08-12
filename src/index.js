import './styles.css';
import fetchCountries from './modules/fetchCountries';
import notify from './modules/notifier';
import countryList from './templates/countryList.hbs';
import countryItem from './templates/countryItem.hbs';
const debounce = require('lodash.debounce');

const refs = {
  input: document.getElementById('input-search'),
  result: document.querySelector('.search-result'),
};

const handleInput = event => {
  fetchCountries(event.target.value)
    .then(items => {
      console.log(items);

      markupResult('');

      if (items.length === 1) {
        correctItemValue(items[0]);
        notify('isEmpty', false);
        markupResult(countryItem(items[0]));
        return;
      }
      if (items.length > 10) {
        notify('isToMany', true);
        return;
      }
      if (items.length <= 10) {
        notify('isToMany', false);
        const nameArr = items.map(item => item.name);
        markupResult(countryList(nameArr));

        if (refs.result.firstElementChild.nodeName === 'UL') {
          ChooseFromList(items);
        }
        return;
      }
      if (items instanceof Object) {
        notify('isError', true);
        markupResult('<h3>Nothing found</h3>');
        return;
      }
    })
    .catch(err => {
      notify('isError');
      console.log(err);
    });
};

function ChooseFromList(items) {
  refs.founded = document.querySelector('.item-list');
  refs.founded.addEventListener('click', event => {
    if (event.target.nodeName === 'LI') {
      const foundedName = items.find(item => item.name === handleClick(event));
      correctItemValue(foundedName);
      markupResult(countryItem(foundedName));
    }
  });
}

const handleClick = event => {
  return event.target.textContent;
};

const correctItemValue = itemProp => {
  itemProp.population = new Intl.NumberFormat('ru-RU').format(
    itemProp.population,
  );
};

const markupResult = string => {
  refs.result.innerHTML = string;
};

refs.input.addEventListener('input', debounce(handleInput, 500));
refs.input.addEventListener('keypress', event => {
  if (event.key === 'Enter' && event.target.value === '') {
    notify('isEmpty', true);
  }
});

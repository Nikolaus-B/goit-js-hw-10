import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { getCats, fetchCatByBreed } from './js/cat-api';

let appState = {
  cats: [],
  loading: true,
  currentCat: {},
  selectedCat: '',
};
const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

let placeholder = document.createElement('option');
placeholder.innerHTML = 'Select your option';

getCats()
  .then(res => {
    populateSelect(res);
    refs.select.classList.remove('visually-hidden');

    refs.loader.classList.add('visually-hidden');
    // console.log(res);
    return res;
  })
  .catch(err => {
    refs.loader.classList.add('visually-hidden');
    // refs.error.classList.remove('visually-hidden');
    Report.failure(
      '',
      'Oops! Something went wrong! Try reloading the page!',
      'I know',
      {
        width: '360px',
        svgSize: '120px',
      }
    );
  });

function populateSelect(cats) {
  let select = refs.select;
  select.append(placeholder);
  for (let i = 0; i < cats.length; i++) {
    let option = document.createElement('option');
    option.value = cats[i].id;
    option.innerHTML = cats[i].name;
    select.appendChild(option);
  }
}

refs.select.addEventListener('change', onSelectChange);

function onSelectChange(e) {
  refs.loader.classList.remove('visually-hidden');
  // console.log(e.target.value);
  refs.catInfo.innerHTML = '';
  placeholder.remove();

  fetchCatByBreed(e.target.value)
    .then(res => {
      let img = document.createElement('img');
      let details = document.createElement('div');
      let name = document.createElement('h1');
      let description = document.createElement('p');
      let temperament = document.createElement('p');

      img.src = res[0].url;
      name.textContent = res[0].breeds[0].name;
      description.textContent = res[0].breeds[0].description;
      temperament.innerHTML = `<b>Temperament:</b> ${res[0].breeds[0].temperament}`;

      details.append(name, description, temperament);
      refs.catInfo.append(img, details);
      refs.loader.classList.add('visually-hidden');
    })
    .catch(err => {
      Report.failure(
        '',
        'Oops! Something went wrong! Try to choose anouther breed!',
        'Ok',
        {
          width: '360px',
          svgSize: '120px',
        }
      );
    });
}

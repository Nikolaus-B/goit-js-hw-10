import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_sJepLfrjcmelOlUgXDEHb0ROry0lUID39Uip2Evy13S8zonWeuQd0SEfpyFiMhL9';

axios.defaults.baseURL = 'https://api.thecatapi.com';

async function getCats() {
  return await axios
    .get('/v1/breeds')
    .then(response => response.data)
    .catch(err => {
      console.log(err);
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
}
async function fetchCatByBreed(breedId) {
  return await axios
    .get(`v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(err => {
      console.log(err);
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
}
export { getCats, fetchCatByBreed };

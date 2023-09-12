import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_sJepLfrjcmelOlUgXDEHb0ROry0lUID39Uip2Evy13S8zonWeuQd0SEfpyFiMhL9';

axios.defaults.baseURL = 'https://api.thecatapi.com';

async function getCats() {
  return await axios
    .get('/v1/breeds')
    .then(response => response.data)
    .catch(err => console.log(err));
}
async function fetchCatByBreed(breedId) {
  return await axios
    .get(`v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(err => console.log(err));
}
export { getCats, fetchCatByBreed };

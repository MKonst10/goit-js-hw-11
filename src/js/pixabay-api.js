import { createGallery } from './render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const loader = document.querySelector('.loader');

export const fetchPhotos = searchedValue => {
  const fetchParams = new URLSearchParams({
    q: searchedValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    key: '45532957-9c3fb9f5acbf0ac0bdba7e21a',
  });

  loader.classList.remove('is-hidden');
  return fetch(`https://pixabay.com/api/?${fetchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data.hits);
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          close: 'true',
          position: 'topRight',
          color: '#ef4040',
          messageColor: 'white',
        });
      }
      createGallery(data);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
};

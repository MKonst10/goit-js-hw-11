import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotos } from './js/pixabay-api';
import { createGallery } from './js/render-functions';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.form');
const requestInput = document.querySelector('.search-input');
const loader = document.querySelector('.loader');

let searchedValue;

const onFormSubmit = event => {
  event.preventDefault();
  if (requestInput.value === '') {
    iziToast.error({
      message: 'Enter your request',
      close: 'true',
      position: 'topRight',
      color: '#ef4040',
      messageColor: 'white',
    });
  } else {
    searchedValue = requestInput.value;
    loader.classList.remove('is-hidden');
    fetchPhotos(searchedValue)
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
        iziToast.error({
          message: `An error ${error} occurred`,
          close: 'true',
          position: 'topRight',
          color: '#ef4040',
          messageColor: 'white',
        });
      })
      .finally(() => {
        loader.classList.add('is-hidden');
      });
  }
  searchForm.reset();
  gallery.innerHTML = '';
};

searchForm.addEventListener('submit', onFormSubmit);

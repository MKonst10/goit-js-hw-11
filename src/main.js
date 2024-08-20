import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotos } from './js/pixabay-api';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.form');
const requestInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
let searchedValue;

const onBtnClick = event => {
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
    fetchPhotos(searchedValue);
  }
  searchForm.reset();
  gallery.innerHTML = '';
};

searchBtn.addEventListener('click', onBtnClick);

gallery.addEventListener('click', event => event.preventDefault());

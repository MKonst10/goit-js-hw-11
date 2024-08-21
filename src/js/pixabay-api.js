import 'izitoast/dist/css/iziToast.min.css';

export const fetchPhotos = searchedValue => {
  const fetchParams = new URLSearchParams({
    q: searchedValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    key: '45532957-9c3fb9f5acbf0ac0bdba7e21a',
  });

  return fetch(`https://pixabay.com/api/?${fetchParams}`);
};

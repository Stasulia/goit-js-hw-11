import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './js/refs';
import { fetchImages } from './js/api';
import { createMarkup } from './js/markup';
import { renderMarkup } from './js/markup';

let page = 1;
const perPage = 8;
let query = '';

//refs.buttonLoadMoreEl.classList.add('is-hidden');

function showLoader(loader) {
  refs.buttonLoadMoreEl.classList.remove('is-hidden');
}

function hideLoader(loader) {
  refs.buttonLoadMoreEl.classList.add('is-hidden');
}

refs.formEl.addEventListener('submit', handlerSearchImages);
refs.buttonLoadMoreEl.addEventListener('click', loadMore);

const instance = new SimpleLightbox('.gallery a', {
  captionDelay: '250',
});

// async function handlerSearchImages(event) {
//   event.preventDefault();
//   refs.galleryEl.innerHTML = '';
//    clearMarkup(refs.galleryEl, refs.buttonLoadMoreEl);
//   query = event.currentTarget.elements.searchQuery.value.trim().toLowerCase();
//   if (!query || query === ' ') {
//     hideLoader();
//     return Notiflix.Notify.info(`Sorry, write your request`);
//     hideLoader();
//     refs.buttonLoadMoreEl.classList.remove('is-hidden');
//   }
//   page = 1;
//   showLoader();
//   const response = await fetchImages(query, page, perPage)
//     .then(images => {
//       refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(images.hits));
//       const images = response.data.hits;
//       totalHits = response.data.totalHits;
//       console.log(response);

//       images.totalHits > 0 && images.hits.length > 0
//         ? Notiflix.Notify.success(
//             `Hooray! We found ${images.totalHits} images.`
//           )
//         : Notiflix.Notify.failure(
//             `Sorry, there are no images matching your search query. Please try again`
//           );

//       if (images.totalHits > perPage && images.hits.length > 0) {
//         refs.buttonLoadMoreEl.classList.remove('is-hidden');
//       }
//       instance.refresh();
//     })
//     .catch(error => {
//       Notiflix.Notify.failure(
//         `Oops, something went wrong. Please try again later.`
//       );
//     })
//     .finally(refs.formEl.reset(), hideLoader());
// }

async function handlerSearchImages(event) {
  event.preventDefault();
  refs.galleryEl.innerHTML = '';
  //  clearMarkup(refs.galleryEl, refs.buttonLoadMoreEl);
  query = event.currentTarget.elements.searchQuery.value.trim().toLowerCase();
  if (!query || query === ' ') {
    hideLoader();
    return Notiflix.Notify.info(`Sorry, write your request`);
    // hideLoader();
    // refs.buttonLoadMoreEl.classList.remove('is-hidden');
  }
  page = 1;
  showLoader();
  const response = await fetchImages(query, page, perPage)
    .then(images => {
      renderMarkup(images.hits);
      // const images = response.data.hits;
      // totalHits = response.data.totalHits;
      //console.log(response);

      images.totalHits > 0 && images.hits.length > 0
        ? Notiflix.Notify.success(
            `Hooray! We found ${images.totalHits} images.`
          )
        : Notiflix.Notify.failure(
            `Sorry, there are no images matching your search query. Please try again`
          );

      if (images.totalHits > perPage && images.hits.length > 0) {
        refs.buttonLoadMoreEl.classList.remove('is-hidden');
      }
      instance.refresh();
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `Oops, something went wrong. Please try again later.`
      );
    })
    .finally(refs.formEl.reset(), hideLoader());
}
function clearMarkup(gallery) {
  refs.galleryEl.innerHTML = ' ';
  refs.buttonLoadMoreEl.classList.add('is-hidden');
}

// async function loadMore() {
//   page += 1;
//   let query = refs.formEl.elements.searchQuery.value.trim().toLowerCase();
//   const firstChild = refs.galleryEl.firstElementChild;
//   if (!firstChild) {
//     return;
//   }
//   await fetchImages(query, page, perPage).then(images => {
//     refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(images.hits));
//     instance.refresh();

//     if (images.hits.length * page >= images.totalHits) {
//       //if (images.totalHits - page * perPage <= 0) {
//       hideLoader();
//     }
//   });
// }

async function loadMore() {
  page += 1;
  let query = refs.formEl.elements.searchQuery.value.trim().toLowerCase();

  try {
    const response = await fetchImages(query, page, perPage);
    let showPage = response.data.hits.length * page;

    if (showPage >= response.data.totalHits) {
      hideLoader();
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    renderMarkup(response.data.hits);
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  instance.refresh();
}

// async function loadMore() {
//   page += 1;
//   let query = refs.formEl.elements.searchQuery.value.trim().toLowerCase();
//   let firstChild = refs.galleryEl.firstElementChild;
//   if () {}
// }

function renderMarkup(images) {
  refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(images));
}

console.log('HELLO');

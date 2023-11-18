import Notiflix from 'notiflix';
import { refs } from './js/refs';
import { fetchImages } from './js/api';
import { createMarkup } from './js/markup';
import { query, page, showLoader, perPage, totalHits, instance } from '.';

// async function handlerSearchImages(event) {
//   event.preventDefault();
//   //  clearMarkup(refs.galleryEl, refs.buttonLoadMoreEl);
//   query = event.currentTarget.elements.searchQuery.value.trim().toLowerCase();
//   if (!query || query === ' ') {
//     return Notiflix.Notify.info(
//       `Sorry, there are no images matching your search query. Please try again`
//     );
//     //hideLoader();
//     //refs.buttonLoadMoreEl.classList.remove('is-hidden');
//   }
//   page = 1;
//   showLoader();
//   await fetchImages(query, page, perPage)
//     .then(images => {
//       refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(images.hits));
//       images.totalHits > 0 && images.hits.length > 0
//         ? alert(`Hooray! We found ${totalHits} images`)
//         : Notiflix.Notify.failure(
//             `Sorry, there are no images matching your search query. Please try again`
//           );
//       if (images.totalHits > perPage && images.hits.length > 0) {
//         refs.buttonLoadMoreEl.classList.remove('is-hidden');
//       }
//       instance.refresh();
//     })
//     .catch(error => {
//       Notiflix.Notify.failure(`Hooray! We found ${totalHits} images`);
//     })
//     .finally();
// // }
// export async function handlerSearchImages(event) {
//   event.preventDefault();
//   //  clearMarkup(refs.galleryEl, refs.buttonLoadMoreEl);
//   query = event.currentTarget.elements.searchQuery.value.trim().toLowerCase();
//   page = 1;
//   showLoader();
//   if (!query || query === ' ') {
//     return Notiflix.Notify.info(
//       `Sorry, there are no images matching your search query. Please try again`
//     );
//     //hideLoader();
//     //refs.buttonLoadMoreEl.classList.remove('is-hidden');
//   }
//   try {
//   } finally {
//   }
//   await fetchImages(query, page, perPage)
//     .then(images => {
//       refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(images.hits));

//       images.totalHits > 0 && images.hits.length > 0
//         ? alert(`Hooray! We found ${totalHits} images`)
//         : Notiflix.Notify.failure(
//             `Sorry, there are no images matching your search query. Please try again`
//           );

//       if (images.totalHits > perPage && images.hits.length > 0) {
//         refs.buttonLoadMoreEl.classList.remove('is-hidden');
//       }
//       instance.refresh();
//     })
//     .catch(error => {
//       Notiflix.Notify.failure(`Hooray! We found ${totalHits} images`);
//     })
//     .finally();
// }

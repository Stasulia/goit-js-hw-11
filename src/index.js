import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './js/refs';
import { fetchImages } from './js/api';
import { createMarkup } from './js/markup';
import { renderMarkup } from './js/markup';

let page = 1;
const perPage = 40;
//let query = '';

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

async function handlerSearchImages(event) {
  event.preventDefault();
  refs.galleryEl.innerHTML = '';
  //  clearMarkup(refs.galleryEl, refs.buttonLoadMoreEl);
  let query = event.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  if (!query || query === ' ') {
    hideLoader();
    return Notiflix.Notify.info(`Sorry, write your request`);
    // hideLoader();
    // refs.buttonLoadMoreEl.classList.remove('is-hidden');
  }
  let page = 1;
  showLoader();

  const response = await fetchImages(query, page, perPage)
    .then(images => {
      console.log(images);
      renderMarkup(images.hits);

      images.totalHits > 0 && images.hits.length > 0
        ? Notiflix.Notify.success(
            `Hooray! We found ${images.totalHits} images.`
          )
        : Notiflix.Notify.failure(
            `Sorry, there are no images matching your search query. Please try again`
          );

      if (images.totalHits > perPage && images.hits.length > 0) {
        showLoader();
      }
      if (images.totalHits < perPage) {
        hideLoader();
        refs.formEl.reset();
      }
      instance.refresh();
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `Oops, something went wrong. Please try again later.`
      );
    })
    .finally(hideLoader());
}

function clearMarkup(gallery) {
  refs.galleryEl.innerHTML = ' ';
}

async function loadMore() {
  page += 1;
  let query = refs.formEl.elements.searchQuery.value.trim().toLowerCase();
  const response = await fetchImages(query, page, perPage);
  let showPage = response.totalHits / perPage;

  if (showPage <= page) {
    hideLoader();
    refs.formEl.reset(),
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
  }
  await fetchImages(query, page, perPage).then(images => {
    console.log(images.hits);
    renderMarkup(images.hits);
    instance.refresh();
  });
}

function renderMarkup(images) {
  refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(images));
}

console.log('Соня коза');

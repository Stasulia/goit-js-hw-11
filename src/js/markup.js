import { refs } from './refs';

export function createMarkup(galleryItems) {
  return galleryItems
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
    <a class = "gallery__link" href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" width="400" loading="lazy" />
    </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${comments}
        </p>
        <p class="info-item">
             <b>Downloads</b>
             ${downloads}
        </p>
       </div>
 </div>`
    )
    .join('');
}

export function renderMarkup(images) {
  refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(images));
}

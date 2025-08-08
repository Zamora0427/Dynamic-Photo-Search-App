const API_KEY = "ozoWdZoWLSpW5KLKw5Gs505JteBq3vC4wk9Kxj0qeboT2sjhFzsdduov"; // Replace with your actual API key

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const photosDiv = document.getElementById('photos');

// Show curated photos on first load
window.addEventListener('DOMContentLoaded', () => {
  getCuratedPhotos();
});

// Handle search form
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const query = input.value.trim();
  if (query !== '') {
    searchPhotos(query);
  }
});

function getCuratedPhotos() {
  fetch(`https://api.pexels.com/v1/curated?per_page=12`, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displayPhotos(data.photos);
    })
    .catch((err) => {
      console.error('Curated fetch error:', err);
    });
}

function searchPhotos(query) {
  fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=12`, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displayPhotos(data.photos);
    })
    .catch((err) => {
      console.error('Search fetch error:', err);
    });
}

function displayPhotos(photos) {
  photosDiv.innerHTML = '';
  photos.forEach((photo) => {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');
    photoCard.innerHTML = `
      <a href="${photo.url}" target="_blank" title="View on Pexels">
        <div class="photo-thumb" style="background-color:${photo.avg_color};">
          <img src="${photo.src.large}" alt="${photo.alt || 'Pexels photo'}" />
        </div>
      </a>
      <p class="photographer">📸 <a href="${photo.photographer_url}" target="_blank">${photo.photographer}</a></p>
    `;
    photosDiv.appendChild(photoCard);
  });
}

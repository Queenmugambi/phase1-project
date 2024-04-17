// script.js
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const movieList = document.getElementById('movie-list');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = 5; // Number of items per page
    let currentPage = 1;
    let totalPages = 1;

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== '') {
            fetchMovies(searchTerm);
        }
    });

    function fetchMovies(query, page = 1) {
        const url = `http://localhost:3000/movies?q=${query}&_page=${page}&_limit=${itemsPerPage}`;
        fetch(url)
            .then(response => {
                const totalCount = response.headers.get('X-Total-Count');
                totalPages = Math.ceil(totalCount / itemsPerPage);
                updatePagination();
                return response.json();
            })
            .then(data => {
                displayMovies(data);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }

    function displayMovies(movies) {
        movieList.innerHTML = '';
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <h2>${movie.title} (${movie.year})</h2>
                <p>Director: ${movie.director}</p>
                <button class="details-button" data-id="${movie.id}">Show Details</button>
                <div class="details" style="display: none;">
                    <p>Genre: ${movie.genre}</p>
                    <p>Plot: ${movie.plot}</p>
                    <p>Rating: ${movie.rating}</p>
                </div>
            `;
            movieList.appendChild(movieElement);
        });
    }

    function updatePagination() {
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', function (event) {
                event.preventDefault();
                currentPage = i;
                fetchMovies(searchInput.value.trim(), currentPage);
            });
            pagination.appendChild(pageLink);
        }
    }

    movieList.addEventListener('click', function (event) {
        if (event.target.classList.contains('details-button')) {
            const details = event.target.nextElementSibling;
            details.style.display = details.style.display === 'none' ? 'block' : 'none';
        }
    });
});

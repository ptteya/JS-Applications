const url = 'http://localhost:3030/jsonstore';
const movieInput = document.getElementById('movie-input');
const addButton = document.getElementById('add-movie');
const loadButton = document.getElementById('load-movies');
const movieList = document.getElementById('movie-list');

loadButton.addEventListener('click', () => {
    fetch(`${url}/movies`)
        .then(res => res.json())
        .then(movies => {
            movieList.innerHTML = '';
            Object.values(movies).forEach(m => {
                let movieElement = document.createElement('li');
                movieElement.textContent = m.title;
                movieList.appendChild(movieElement);
            })
        })
        .catch(error => console.log(error));
});

addButton.addEventListener('click', () => {
    let title = movieInput.value;

    fetch(`${url}/movies`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ title })
    })
        .then(res => res.json())
        .then(m => {
            let movieElement = document.createElement('li');
            movieElement.textContent = m.title;
            movieList.appendChild(movieElement);
        })
})
import { searchAlbum } from "../api/data.js";
import { getUserData } from "../api/util.js";
import { html,nothing} from "../lib.js";

const searchTemplate = html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
</section>`;

const searchResultTemplate = (searchTemplate, albums,hasUser) => html`
${searchTemplate}
<div class="search-result">
    ${albums && albums.length > 0 
        ? albums.map(a => albumCard(a,hasUser)) 
        : html` <p class="no-result">No result.</p>
    `}
</div> -->`

const albumCard = (album,hasUser) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist:${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.date}</p>
        </div>
        ${hasUser 
        ? html`
        <div class="btn-group">
            <a href="/catalog/${album._id}" id="details">Details</a>
        </div>` 
        : nothing}
    </div>
</div>`

let context = null;

export function showSearch(ctx) {
    context = ctx;
    ctx.render(searchTemplate);
}

async function onSearch() {
    const searchInput = document.querySelector('#search-input');
    const query = searchInput.value;

    if (query == '') {
        return alert('All fields are required!');
    }
    
    const results = await searchAlbum(query);
    const user = getUserData();
    context.render(searchResultTemplate(searchTemplate, results,user));
}
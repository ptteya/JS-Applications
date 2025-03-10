import { getAll } from "../api/data.js";
import { getUserData } from "../api/util.js";
import { html,nothing } from "../lib.js";

const catalogTemplate = (albums, user) => html`
<section id="catalogPage">
    <h1>All Albums</h1>

    ${albums.length > 0 
    ? albums.map(album => html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist:${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseData}</p>
            </div>
            ${user 
                ? html`
            <div class="btn-group">
                <a href="/catalog/${album._id}" id="details">Details</a>
            </div>`
                : nothing}
        </div>
    </div>`)
    : html`<p>No Albums in Catalog!</p>`}

</section>`;

export async function showCatalog(ctx) {
    const albums = await getAll();
    const user = getUserData();

    ctx.render(catalogTemplate(albums, user));
}
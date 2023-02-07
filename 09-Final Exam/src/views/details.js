import { deleteById, getById } from "../api/data.js";
import { addLike, getAlbumLikes, getUserLikes } from "../api/likes.js";
import { getUserData } from "../api/util.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (album, user, isOwner, canLike, albumLikes, onDelete, onLike) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${albumLikes}</span></div>

        ${detailsButtons(album, user, isOwner, canLike, onDelete, onLike)}
    </div>
</section>`;

function detailsButtons(album, user, isOwner, canLike, onDelete, onLike) {
    if (!user) {
        return nothing;
    }

    if (isOwner) {
        return html`
        <div id="action-buttons">
            <a href="/edit/${album._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>`;
    }

    if (canLike) {
        return html`
    <div id="action-buttons">
        <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
    </div>`;
    }
}

export async function showDetails(ctx) {
    const id = ctx.params.id;

    const requests = [
        getById(id),
        getAlbumLikes(id)
    ]

    const user = getUserData();

    if (user) {
        requests.push(getUserLikes(id, user._id));
    }

    const [album, albumLikes, userAlbumLikes] = await Promise.all(requests);

    const isOwner = user && user._id == album._ownerId;
    const canLike = !isOwner && userAlbumLikes == 0;

    ctx.render(detailsTemplate(album, user, isOwner, canLike, albumLikes, onDelete, onLike));

    async function onDelete() {
        const confirmation = confirm('Do you want to delete this album?');

        if (confirmation) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onLike() {
        const likeButton = document.querySelector('#like-btn');
        await addLike(id);
        likeButton.style.display = 'none';
        ctx.page.redirect('/catalog/' + id);
    }
}
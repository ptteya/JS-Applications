import { getOwnMemes } from "../api/data.js";
import { getUserData } from "../api/util.js";
import { html } from "../lib.js";

const profileTemplate = (user, ownMemes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${ownMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">

        ${ownMemes.length > 0
        ? ownMemes.map(memeCard)
        : html` <p class="no-memes">No memes in database.</p>`}
    </div>
</section>`;

const memeCard = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/catalog/${meme._id}">Details</a>
</div>`;

export async function showProfile(ctx) {
    const user = await getUserData();
    const ownMemes = await getOwnMemes(user._id);

    ctx.render(profileTemplate(user, ownMemes));
}
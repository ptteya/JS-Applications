import { addComment, getComments } from "../api/comments.js";
import { deleteById, getById } from "../api/data.js";
import { createSubmitHandler, getUserData } from "../api/util.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (game, gameComments,canComment,isOwner, onDelete,onComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        ${comments(gameComments)}

        ${isOwner 
        ? html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
        </div>
        `
        : nothing}
    </div>

    ${canComment 
    ? html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${onComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>`
    : nothing}
</section>`;

function comments(gameComments){
    if(gameComments.length > 0){
        return html`
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                ${gameComments.map(c => html`
                <li class="comment">
                    <p>Content: ${c.comment}</p>
                </li>`)}
            </ul>
        </div>`;
    }

    return html`
    <div class="details-comments">
        <h2>Comments:</h2>
        <p class="no-comment">No comments.</p>
    </div>`;
}


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const game = await getById(id);

    const user = getUserData();
    const isOwner = user && user._id == game._ownerId;

    const gameComments = await getComments(id);
    const canComment = user && !isOwner;

    ctx.render(detailsTemplate(game,gameComments,canComment, isOwner, onDelete, createSubmitHandler(onComment)));

    async function onDelete() {
        const confirmation = confirm('Do you want to delete this game?');

        if (confirmation) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onComment({comment},form){
        if(!comment){
            return alert('Write a comment!');
        }
        await addComment(id,comment);
        form.reset();
        ctx.page.redirect('/catalog/' + id);
    }
}
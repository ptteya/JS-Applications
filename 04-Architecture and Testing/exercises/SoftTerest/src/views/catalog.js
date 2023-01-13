import { getAllIdeas } from "../api/data.js";
import { createHTML } from "../dom.js";

const section = document.querySelector('#dashboard-holder');
section.addEventListener('click', onDetails);
section.remove();

let ctx = null;

export async function showCatalogView(context) {
    ctx = context;

    context.showSection(section);
    const ideas = await getAllIdeas();

    if (ideas.length == 0) {
        const h1 = createHTML('h1', 'No ideas yet! Be the first one :)')
        section.replaceChildren(h1);
    } else {
        const allIdeas = ideas.map(createIdeaPreview);
        section.replaceChildren(...allIdeas);
    }
}

function createIdeaPreview(idea) {
    const element = createHTML('div', '', [['class', 'card overflow-hidden current-card details'], ['style', 'width: 20rem; height: 18rem;']]);

    const cardBodyDiv = createHTML('div', '', [['class', 'card-body']], element);
    const p = createHTML('p', idea.title, [['class', 'card-text']], cardBodyDiv);
    const img = createHTML('img', '', [['class', 'card-image'], ['src', idea.img], ['alt', 'Card image cap']], element);
    const a = createHTML('a', 'Details', [['data-id', idea._id], ['class', 'btn'], ['href', '/details']], element);

    return element;
}


function onDetails(event) {
    if (event.target.tagName == 'A') {
        event.preventDefault();
        const id = event.target.dataset.id;
        if (id) {
            ctx.goTo('/details', id);
        }
    }

}
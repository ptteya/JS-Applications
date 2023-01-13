import { deleteById, getIdeaById } from "../api/data.js";
import { createHTML } from "../dom.js";

const section = document.querySelector('#detailsPage');
section.remove();

export async function showDetailsView(context, id) {
    const idea = await getIdeaById(id);
    context.showSection(section);

    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = user && user._id == idea._ownerId;

    section.replaceChildren(createIdeaDetailsPreview(idea, isOwner));

    if (isOwner) {
        section.querySelector('#deleteBtn').addEventListener('click', async (event) => {
            event.preventDefault();
            const choice = confirm('Do you want to delete this idea?');

            if (choice) {
                await deleteById(id);
                context.goTo('/catalog');
            }
        })
    }
}


function createIdeaDetailsPreview(idea, isOwner) {
    const fragment = document.createDocumentFragment();
    const img = createHTML('img', '', [['class', 'det-img'], ['src', idea.img]], fragment);
    const descDiv = createHTML('div', '', [['class', 'desc']], fragment)
    const h2 = createHTML('h2', idea.title, [['class', 'display-5']], descDiv);
    const infoType = createHTML('p', 'Description', [['class', 'infoType']], descDiv);
    const ideaDescription = createHTML('p', idea.description, [['class', 'idea-description']], descDiv);


    if (isOwner) {
        const textCenterDiv = createHTML('div', '', [['class', 'text-center']], fragment);
        const a = createHTML('a', 'Delete', [['id', 'deleteBtn'], ['class', 'btn detb'], ['href', '']], textCenterDiv);
    }

    return fragment;
}

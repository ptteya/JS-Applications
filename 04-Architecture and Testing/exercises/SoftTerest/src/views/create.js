import { createIdea } from "../api/data.js";

const section = document.querySelector('#createPage');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showCreateView(context) {
    ctx = context;
    context.showSection(section);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const { title, description, imageURL } = Object.fromEntries(formData);

    if (title.length < 6 || description.length < 10 || imageURL.length < 5) {
        alert('The fields are not filled correctly');
        return;
    }

    createIdea({
        title,
        description,
        img: imageURL
    });

    form.reset();
    ctx.goTo('/catalog');
}

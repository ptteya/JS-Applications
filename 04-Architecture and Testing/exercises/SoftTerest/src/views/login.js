import { login } from '../api/users.js';

const section = document.querySelector('#loginPage');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showLoginView(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData);
    await login(email, password);

    form.reset();
    ctx.updateNav();
    ctx.goTo('/');
}
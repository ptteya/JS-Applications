import { register } from "../api/users.js";

const section = document.querySelector('#registerPage');
section.remove();

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let ctx = null;

export function showRegisterView(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const { email, password, repeatPassword } = Object.fromEntries(formData);

    if (email.length < 3 || password.length < 3 || password !== repeatPassword) {
        alert('The fields are not filled correctly');
        return;
    }

    await register(email, password, repeatPassword);

    form.reset();
    ctx.updateNav();
    ctx.goTo('/');
}

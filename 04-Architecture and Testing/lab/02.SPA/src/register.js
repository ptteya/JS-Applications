import { createSubmitHandler, setUserData } from './util.js';
import { post } from './api.js';
import { goto } from './app.js';

createSubmitHandler('register-form', onRegister);

const section = document.getElementById('register-view');
section.remove();
let ctx = null;

export function showRegisterView(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}

async function onRegister({ email, username, password, repass }) {
    if (password != repass) {
        return alert('Passwords don\'t match!');
    }

    const userData = await post('/users/register', { email, username, password });

    setUserData(userData);

    ctx.checkUserNav();
    ctx.goto('catalog-link');
}
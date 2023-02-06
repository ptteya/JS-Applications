import { register } from "../api/user.js";
import { createSubmitHandler } from "../api/util.js";
import { html } from "../lib.js";

const registerTemplate = (onRegister) => html`
<section id="register-page" class="content auth">
    <form @submit=${onRegister} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export function showRegister(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({ email, password, 'confirm-password': rePass }) {
        if (!email || !password || !rePass) {
            return alert('All fields are required!')
        }

        if (password !== rePass) {
            return alert('Passwords must match!');
        }

        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect('/');
    }
}
import { register } from "../api/user.js";
import { createSubmitHandler } from "../api/util.js";
import { html } from "../lib.js";

const registerTemplate = (onRegister) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onRegister} class="login-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="#">Login</a></p>
        </form>
    </div>
</section>`;

export function showRegister(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({ email, password, 're-password': rePass }) {
        if (!email || !password || !rePass) {
            return alert('All fields are required!');
        }

        if (password !== rePass) {
            return alert('Passwords must match!');
        }

        await register(email, password);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
}
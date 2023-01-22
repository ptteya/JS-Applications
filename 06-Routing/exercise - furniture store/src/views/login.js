import { html } from '../lib.js';
import { login } from '../api/users.js';

const loginTemplate = (ctx) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${getFormData.bind(null, ctx)}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`

export function showLogin(ctx) {
    ctx.render(loginTemplate(ctx));
}

async function getFormData(ctx, event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    if (email == '' || password == '') {
        alert('All fields are required!');
        return;
    }

    await login(email, password);
    event.target.reset();
    ctx.updateNav();
    ctx.page.redirect('/');
}
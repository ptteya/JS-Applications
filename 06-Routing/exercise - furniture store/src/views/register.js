import { html } from '../lib.js';
import { register } from '../api/users.js';

const registerTemplate = (ctx) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
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
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;


export function showRegister(ctx) {
    ctx.render(registerTemplate(ctx));
}

async function getFormData(ctx, event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password, rePass } = Object.fromEntries(formData);

    if (email == '' || password == '' || rePass == '') {
        alert('All fields are required!');
        return;
    }

    if (password !== rePass) {
        alert('Passwords don\'t match');
        return;
    }

    await register(email, password);
    event.target.reset();
    ctx.page.redirect('/');
}
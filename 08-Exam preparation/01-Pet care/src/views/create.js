import { html } from "../lib.js";
import { createSubmitHandler } from '../api/util.js'
import { create } from "../api/data.js";

const createTemplate = (onCreate) => html`
<section id="createPage">
    <form @submit=${onCreate} class="createForm">
        <img src="./images/cat-create.jpg">
        <div>
            <h2>Create PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" placeholder="Max">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" placeholder="2 years">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" placeholder="5kg">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
            </div>
            <button class="btn" type="submit">Create Pet</button>
        </div>
    </form>
</section>`;

export function showCreate(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate({ name, breed, age, weight, image }, form) {
        if ([name, breed, age, weight, image].some(e => e == '')) {
            return alert('All fields are required!');
        }

        await create({
            name,
            breed,
            age,
            weight,
            image
        });

        // form.reset();
        ctx.page.redirect('/');
    }
}
import { html } from '../lib.js';
import { repeat } from '../lib.js';
import { getAll } from '../data/recipes.js';

const catalogTemplate = (recipes) => html`
<h2>Catalog</h2>
<ul>
    ${repeat(recipes, r => r._id, recipeCardTemplate)}
</ul>`;

const recipeCardTemplate = (recipe) => html`<li><a href=${`/recipes/` + recipe._id}>${recipe.name}</a></li>`

export async function showCatalog(ctx) {
    //&hellip; is ... 
    ctx.render(html`<p>Loading &hellip;</p>`)
    const recipes = await getAll();
    ctx.render(catalogTemplate(recipes));
}

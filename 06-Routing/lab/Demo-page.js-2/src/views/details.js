import { html, until } from '../lib.js';
import { getById } from '../data/recipes.js';

const detailsTemplate = (recipe) => html`
<h2>Recipe Details</h2>
<h3>Ingredients</h3>
<ul>
    ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
</ul>
<h3>Preparation step</h3>
<ul>
    ${recipe.steps.map(s => html`<li>${s}</li>`)}
</ul>
`;

const recipeSkeleton = () => html`
<h2>Recipe Details</h2>
<h3>Ingredients</h3>
<ul>
    Loading &hellip;
</ul>
<h3>Preparation step</h3>
<ul>
    Loading &hellip;
</ul>
;`

export function showDetails(ctx) {
    const id = ctx.params.id;
    ctx.render(until(loadRecipe(id), recipeSkeleton()));
}

async function loadRecipe(id) {
    const recipe = await getById(id);
    return detailsTemplate(recipe);
}
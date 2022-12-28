let baseUrl = 'http://localhost:3030/jsonstore/cookbook';

window.addEventListener('load', () => {
    fetch(`${baseUrl}/recipes`)
        .then(res => res.json())
        .then(recipes => {
            renderRecipes(Object.values(recipes));
        })
})

function renderRecipes(recipes) {
    const mainElement = document.querySelector('main');

    recipes.forEach(r => {
        mainElement.appendChild(createPreview(r))
    });
}

function createPreview(recipe) {
    const articleEl = createEl('article', '', ['class', 'preview']);
    articleEl.addEventListener('click', onRecipeClick.bind(null, recipe._id));

    const divTitleEl = createEl('div', '', ['class', 'title']);
    const h2El = createEl('h2', recipe.name);
    const divSmallEl = createEl('div', '', ['class', 'small']);
    const img = createEl('img', '', ['src', recipe.img]);

    divTitleEl.appendChild(h2El);
    divSmallEl.appendChild(img);

    articleEl.appendChild(divTitleEl);
    articleEl.appendChild(divSmallEl);

    return articleEl;
}

function onRecipeClick(id, event) {
    let currentTarget = event.currentTarget;

    fetch(`${baseUrl}/details/${id}`)
        .then(res => res.json())
        .then(details => {
            currentTarget.replaceWith(createRecipeInfo(details));
        })
}

function createRecipeInfo(recipe) {
    const articleEl = createEl('article');
    const h2El = createEl('h2', recipe.name);
    const divBand = createEl('div', '', ['class', 'band']);
    const divThumb = createEl('div', '', ['class', 'thumb']);
    const img = createEl('img', '', ['src', recipe.img]);
    const divIngredients = createEl('div', '', ['class', 'ingredients']);
    const h3El = createEl('h3', 'Ingredients:');
    const ulEl = createEl('ul');
    const divDescription = createEl('div', '', ['class', 'description']);
    const h3Description = createEl('h3', 'Preparation:');

    divThumb.appendChild(img);
    divIngredients.appendChild(h3El);
    divIngredients.appendChild(ulEl);

    recipe.ingredients.forEach(i => {
        const liElement = createEl('li', i);
        ulEl.appendChild(liElement);
    });

    divBand.appendChild(divThumb);
    divBand.appendChild(divIngredients);

    divDescription.appendChild(h3Description);

    recipe.steps.forEach(s => {
        const pElement = createEl('p', s);
        divDescription.appendChild(pElement);
    });

    articleEl.appendChild(h2El);
    articleEl.appendChild(divBand);
    articleEl.appendChild(divDescription);

    return articleEl;
}

function createEl(type, content, attributes = []) {
    let element = document.createElement(type);

    if (content) {
        element.textContent = content;
    }

    if (attributes.length > 0) {
        element.setAttribute(attributes[0], attributes[1]);
    }

    return element;
}

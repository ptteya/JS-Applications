import { html, render, nothing } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const root = document.querySelector('#towns');
document.querySelector('button').addEventListener('click', search);
const result = document.querySelector('#result');

const template = (towns, input) => html`
   <ul>
      ${towns.map(town => createLi(town, input))}
   </ul>`;

const createLi = (town, input) => html`
   <li class=${town.includes(input) 
   ? "active" 
   : nothing
   }>${town}</li>`


update();

function update(input) {
   render(template(towns, input), root);
}

function search(event) {
   event.preventDefault();

   const inputElement = document.querySelector('#searchText');
   const input = inputElement.value;

   update(input);
   countMatches();
}

function countMatches() {
   const matches = document.querySelectorAll('.active');
   const showCount = matches ? html`<p>${matches.length} matches found</p>`: '';
   render(showCount,result);
}

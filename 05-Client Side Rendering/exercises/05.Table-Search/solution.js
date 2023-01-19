import { html, render } from './node_modules/lit-html/lit-html.js';

const root = document.querySelector('.container tbody');
document.querySelector('#searchBtn').addEventListener('click', onClick);

const tableRow = (personData) => html`
   <tr>
      <td>${personData.firstName} ${personData.lastName}</td>
      <td>${personData.email}</td>
      <td>${personData.course}</td>
   </tr>`;

getData();

async function getData() {
   const url = 'http://localhost:3030/jsonstore/advanced/table';
   const response = await fetch(url);
   const data = await response.json();
   update(data);
}

function update(data) {
   render(Object.values(data).map(tableRow), root);
}

function onClick(event) {
   event.preventDefault();

   const rowsList = root.children;
   const inputEl = document.querySelector('#searchField');
   const input = inputEl.value.toLowerCase();

   for (let row of rowsList) {
      const tdContent = row.textContent.toLowerCase();
      if (tdContent.includes(input)) {
         row.classList.add('select');
      } else if (row.classList.contains('select')) {
         row.classList.remove('select');
      }
   }

   inputEl.value = '';
}

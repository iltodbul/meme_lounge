import { html } from '../../node_modules/lit-html/lit-html.js';

import { getMemeById, deleteMeme } from '../api/data.js';

const memeTemplate = (meme, isOwner, onDelete) => html`
  <section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
      <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl} />
      </div>
      <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${meme.description}</p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${isOwner
          ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
              <button @click=${onDelete} class="button danger">Delete</button>`
          : ''}
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  let userId = sessionStorage.getItem('userId');
  let memeId = ctx.params.id;
  let meme = await getMemeById(memeId);

  let isOwner = userId === meme._ownerId;
  ctx.render(memeTemplate(meme, isOwner, onDelete));

  async function onDelete() {
    let confirmed = confirm('Are you sure!?');
    if (confirmed) {
      await deleteMeme(memeId);
      ctx.page.redirect('/catalog');
    }
  }
}

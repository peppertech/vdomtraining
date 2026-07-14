import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Obtain or create a layout to place inside the card. For example, get a profile card layout from Oracle JET Exchange.
  </li>
  <li>Put the component inside the oj-c-action-card</li>
</ol>`;

export const actionCardContentActionCardcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

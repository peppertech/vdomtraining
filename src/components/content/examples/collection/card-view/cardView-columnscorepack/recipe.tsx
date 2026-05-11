import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'cardViewCorepack', 'basic'); return false;">
      basic oj-c-card-view demo
    </a>
    for more information about configuring oj-c-card-view.  
  </li>
  <li>
    Create an observable for the number of columns and bind that to the
    <code>columns</code>
    attribute.
  </li>
  <li>
    Specify the card and its content in the itemTemplate slot.
  </li>
</ul>`;

export const cardViewColumnscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

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
    Set the size of the gutter using the
    <code>gutterSize</code>
    attribute.
  </li>
  <li>
    Specify the card and its content in the itemTemplate slot.
  </li>
</ul>`;

export const cardViewGutterSizecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

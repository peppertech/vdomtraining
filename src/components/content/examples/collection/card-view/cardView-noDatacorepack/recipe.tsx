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
      Use the
      <code>noData</code>
      slot to specify the content to show when there is no data.
    </li>
    <li>
    To adhere to Redwood design for list items, use the
    <code>oj-sp-empty-state</code>
    component in the noData slot.
  </li>
  </ul>`;

export const cardViewNoDatacorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

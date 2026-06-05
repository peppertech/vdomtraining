import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>Construct an MutableArrayDataProvider with the array data.</li>
  <li>Use the oj-c-tab-bar tag to create a JET Tabbar.</li>
  <li>
    Use the data attribute to bind the MutableArrayDataProvider you created previously as input.
  </li>
  <li>
    Bind
    <code class="prettyprint">selection</code>
    to observable to keep track of selected item.
  </li>
</ol>`;

export const tabBarDataProvidercorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

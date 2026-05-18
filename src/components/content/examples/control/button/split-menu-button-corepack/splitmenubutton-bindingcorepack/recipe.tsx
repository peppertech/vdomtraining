import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an 
    <code class="prettyprint">oj-c-split-menu-button</code>
    element.
  </li>
  <li>
    Bind the 
    <code class="prettyprint">label</code>
    attribute to specify the button label.
  </li>
  <li>
    Bind the 
    <code class="prettyprint">on-oj-action</code>
    attribute to specify the button action.
  </li>
  <li>
    Bind the 
    <code class="prettyprint">items</code>
    attribute to specify the menu items for the menu button.    
  </li>
</ul>`;

export const splitmenubuttonBindingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

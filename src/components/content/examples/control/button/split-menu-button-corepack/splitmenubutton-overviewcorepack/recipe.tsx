import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create
    <code class="prettyprint">oj-c-split-menu-button</code>
    element.
  </li>
  <li>
    Use the 
    <code class="prettyprint">label</code>
    attribute to specify the default action label, and on-OjAction to specify the default action.
  </li>
  <li>
    Use the 
    <code class="prettyprint">on-oj-action</code>
    attribute to specify the default action.
  </li>  
  <li>
    Use
    <code class="prettyprint">items</code>
    attribute to specify the menu items for the menu button.    
  </li>
  <li>
    Use
    <code class="prettyprint">disabled</code>
    attribute to disable button.
    <code>oj-c-split-menu-button</code>
    is enabled by default, set
    <code>disabled</code>
    for disabled button.
  </li>
  <li>
    Use
    <code class="prettyprint">chroming</code>
    attribute to define the button visual appearance. 
  </li>
  <li>
    Use
    <code class="prettyprint">size</code>
    attribute to modify the size of the button.
  </li>
  <li>
    Use
    <code class="prettyprint">tooltip</code>
    attribute to specify a tooltip.
  </li>
  <li>
    Use
    <code class="prettyprint">width</code>
    attribute to specify a button width.
  </li>
</ul>`;

export const splitmenubuttonOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

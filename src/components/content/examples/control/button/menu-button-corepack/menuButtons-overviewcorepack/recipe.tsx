import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    For the
    <code class="prettyprint">oj-c-menu-button</code>
    , use 
    <code class="prettyprint">label</code>
    attribute to create the menu button label.
  </li>
  <li>
    Use the 
    <code class="prettyprint">items</code>
    attribute to create the menu.
  </li>
  <li>
    Use
    <code class="prettyprint">display</code>
    attribute and
    <code class="prettyprint">slots</code>
    to create Icon menu button. 
  </li>
  <li>
    Use
    <code class="prettyprint">size</code>
    attribute to size the menu button.
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
  <li>
    Use
    <code class="prettyprint">disabled</code>
    attribute to disable menu button.
  </li>
  <li>
    Use
    <code class="prettyprint">chroming</code>
    attribute to define button chroming value. 
  </li>
  <li>
    Use
    <code class="prettyprint">label</code> and
    <code class="prettyprint">suffix</code>
    attributes to persist menu choices.
  </li>
</ol>`;

export const menuButtonsOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

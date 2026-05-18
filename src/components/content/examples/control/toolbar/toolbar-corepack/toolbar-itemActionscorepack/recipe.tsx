import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Individual toolbar items support an
    <code class="prettyprint">onAction</code>
    key as part of their data build for binding an action listener
    <ul>
      <li>
        When using
        <code class="prettyprint">{ type: 'split-menu-button' }</code>
        to create a split menu button as a toolbar item, an
        <code class="prettyprint">onMenuAction</code>
        action listener is available as well.
      </li>
    </ul>
  </li>
</ol>`;

export const toolbarItemActionscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

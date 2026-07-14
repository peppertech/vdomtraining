import 'preact';

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
  <li>
    To implement persistence:
    <ul>
      <li>The menu item action should modify the button label.</li>
      <li>Filter the items to remove any that matches the button label.</li>      
    </ul>
  </li>
</ul>`;

export const splitmenubuttonPersistentcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

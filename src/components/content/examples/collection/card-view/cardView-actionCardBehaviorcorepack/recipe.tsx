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
      Create an
      <code class="prettyprint">oj-c-action-card</code>
      element inside the
      <code>template</code>.
    </li>
    <li>
      Create a function to handle the action event.
    </li>
     <li>
      Bind the 
      <code>on-oj-action</code>
      attribute to the function.
    </li>
  </ul>`;

export const cardViewActionCardBehaviorcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

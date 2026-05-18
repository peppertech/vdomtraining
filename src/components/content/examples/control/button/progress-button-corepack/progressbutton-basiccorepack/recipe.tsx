import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>Configure a on-oj-action handler that turns on the is-loading property prior to the action, and turns it off after the action.</li>
  <li>The progress state reflects a user's brief interaction with a button.  It's followed by feedback for action 
    completion, such as an acknowledgement toast/message, timestamp update, button reset, confirmation icon, or other 
    accessible feedback. 
    <ul>
      <li>In this demo, once the action is complete, the state changes to loaded.</li>  
    </ul>
  </li>
</ul>`;

export const progressbuttonBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

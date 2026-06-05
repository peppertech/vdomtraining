import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Place an oj-defer as the immediate child of the oj-popup. Add a close button within the content
    of the deferred content. Bind the close button's label to a computed observable. Have the
    computed observable update another status observable indicating the computed observable was
    called.
  </li>
  <li>
    Bind the status observable to header text in the main page. The initial value of of this
    observable will indicate the button has not been rendered. If the button was not in a oj-defer
    component, it would initial render even thought it's not visible.
  </li>
  <li>
    Click the open popup button. The header text will change indicating the content of the popup is
    now rendered.
  </li>
</ol>`;

export const popupDeferRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

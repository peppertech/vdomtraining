import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Include an
    <code class="prettyprint">&lt;oj-c-message-toast></code>
    element in the page and set its 'data' property to a DataProvider. This demo uses an
    MutableArrayDataProvider wrapping a simple array of messages data.
  </li>
  <li>
    Set the 'severity', 'summary' and 'detail' attributes for each message data in the collection. Set the 'autoTimeout'
    property to 'on', 'off' or any other positive value in the format '1s', '2s', etc.,.
  </li>
  <li>
    The 'position' attribute of
    <code class="prettyprint">&lt;oj-c-message-toast></code>
    can be set to customize the location of the toasts. By default, it will in the bottom center
    of the window.
  </li>
  <li>
    Finally, bind a listener to listen to the
    <a target="_blank" href="jsdocs/oj-c.MessageToast.html#event:ojClose">ojClose</a>
    event using the
    <code class="prettyprint">on-oj-close</code>
    attribute. This listener will be called when one tries to close a message. Using the
    <code class="prettyprint">event.detail.key</code>
    property, remove the corresponding entry from the
    <code class="prettyprint">MutableArrayDataProvider</code>
    . This would in turn close the corresponding message in the UI. If the listener fails to remove
    the corresponding data from the
    <code class="prettyprint">MutableArrayDataProvider</code>
    , no action will be performed by the component and the message will stay open in the UI.
  </li>
</ol>`;

export const messagetoastAutoTimeoutcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

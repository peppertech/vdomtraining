import { h } from "preact";

const recipeHtmlText = String.raw`<p>Toast messages in page layout:</p>
<ul>
  <li>
    Include a page header and add an
    <code class="prettyprint">oj-c-message-toast</code>
    element.
  </li>
  <li>
    The 'position' attribute of
    <code class="prettyprint">&lt;oj-c-message-toast></code>
    can be set to customize the location of the toasts. This demo also offsets the toast layer so
    each position stays inside the demo container.
  </li>
</ul>

<p>Specifying message properties:</p>
<ul>
  <li>Set the 'closeAffordance' property to 'off' to not show the close icon in the message</li>
  <li>
    Set the 'summary' property to the text that needs to be shown in the message summary area.
  </li>
  <li>
    Set the 'detail' property to the text that needs to be shown in the message detail area. This
    property can be ignored if needed to show the message with no detail text.
  </li>
  <li>
    Set the 'severity' property to one the supported values ('error', 'warning', 'confirmation',
    'info', 'none'). By default, this is set to 'error'. The icon in the header is decided based on
    the 'severity'. Set the 'severity' to 'none' if no icon should be shown.
  </li>
  <li>Set the 'sound' attribute to 'default' to play a sound when the message is displayed.</li>
</ul>

<p>Closing the messages:</p>
<p>
  Bind a listener to listen to the
  <a target="_blank" href="jsdocs/oj-c.MessageToast.html#event:ojClose">ojClose</a>
  event using the
  <code class="prettyprint">on-oj-close</code>
  attribute. This listener will be called when one tries to close a message. Using the
  <code class="prettyprint">event.detail.key</code>
  property, remove the corresponding entry from the
  <code class="prettyprint">MutableArrayDataProvider</code>. This would in turn close the corresponding message in the UI. If the listener fails to remove
  the corresponding data from the
  <code class="prettyprint">MutableArrayDataProvider</code>, no action will be performed by the component and the message will stay open in the UI
</p>`;

export const messagetoastPageMessagescorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

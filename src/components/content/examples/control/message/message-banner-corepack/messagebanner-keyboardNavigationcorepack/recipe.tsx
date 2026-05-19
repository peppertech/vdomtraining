import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create three
    <code class="prettyprint">oj-c-message-banner</code>
    elements
  </li>
  <li>
    Create three
    <code class="prettyprint">MutableArrayDataProvider</code>
    consisting of an Array of messages data, one for each
    <code class="prettyprint">oj-c-message-banner</code>
    component and bind it to the
    <a target="_blank" href="jsdocs/oj-c.MessageBanner.html#data">data</a>
    attribute of each of the
    <code class="prettyprint">oj-c-message-banner</code>
    elements
  </li>
  <li>
    Use to the
    <a target="_blank" href="jsdocs/oj-c.MessageBanner.html#type">type</a>
    attribute to specify the type of Message Banner. They can be either
    <code class="prettyprint">page</code>
    or
    <code class="prettyprint">section</code>
    . Message Banner are
    <code class="prettyprint">section</code>
    by default. Set the top-most component to
    <code class="prettyprint">page</code>
    and rest of the components to
    <code class="prettyprint">section</code>
  </li>
  <li>
    Finally, bind listeners to listen to the
    <a target="_blank" href="jsdocs/oj-c.MessageBanner.html#event:ojClose">ojClose</a>
    event using the
    <code class="prettyprint">on-oj-close</code>
    attribute for each of the components. This listener will be called when one tries to close a
    message. Using the
    <code class="prettyprint">event.detail.key</code>
    property, remove the corresponding entry from the corresponding
    <code class="prettyprint">MutableArrayDataProvider</code>
    . This would in-turn close the corresponding message in the UI. If the listener fails to remove
    the corresponding data from the
    <code class="prettyprint">MutableArrayDataProvider</code>
    , no action will be performed by the component and the message will stay open in the UI
  </li>
  <li>
    See
    <a href="#" onclick="demoGoLink(event, 'messagebannerCorepack', 'pageMessages')">Page Messages</a>
    demo for various attributes that can be used for customizing the content of the messages.
  </li>
</ul>`;

export const messagebannerKeyboardNavigationcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

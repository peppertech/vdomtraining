import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Page level messages - shows the <code class="prettyprint">oj-c-message-banner</code>
    rendered as top level messages. See
    <a href="#" onclick="demoGoLink(event, 'messagebannerCorepack', 'pageMessages')">Page Messages</a>
    demo for various attributes that can be used for customizing the content of the messages.
  </li>
  <li>
    Section level messages - shows the <code class="prettyprint">oj-c-message-banner</code>
    rendered as section level messages. See
    <a href="#" onclick="demoGoLink(event, 'messagebannerCorepack', 'sectionMessages')">Section Messages</a>
    demo for various attributes that can be used for customizing the content of the messages.
  </li>
  <li>
    Custom detail - shows the <code class="prettyprint">oj-c-message-banner</code>
    with custom content for the detail of the message. See
    <a href="#" onclick="demoGoLink(event, 'messagebannerCorepack', 'detailActions')">Custom Detail Content</a>
    demo for more detailed information on customizing the detail content.
  </li>
  <li>
    Close icon - shows the <code class="prettyprint">oj-c-message-banner</code>
    with close icon. See
    <a href="#" onclick="demoGoLink(event, 'messagebannerCorepack', 'pageMessages')">Page Messages</a>
    demo for various attributes that can be used for customizing the content of the messages.
  </li>
  <li>
    Timestamp - shows the <code class="prettyprint">oj-c-message-banner</code>
    with timestamp. See
    <a href="#" onclick="demoGoLink(event, 'messagebannerCorepack', 'pageMessages')">Page Messages</a>
    demo for various attributes that can be used for customizing the content of the messages.
  </li>
</ul>`;

export const messagebannerOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

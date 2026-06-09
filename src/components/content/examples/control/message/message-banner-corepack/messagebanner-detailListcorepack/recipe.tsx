import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-message-banner</code>
    element
  </li>
  <li>
    Create a
    <code class="prettyprint">MutableArrayDataProvider</code>
    consisting of an Array of messages data and bind it to the
    <a target="_blank" href="jsdocs/oj-c.MessageBanner.html#data">data</a>
    attribute of the
    <code class="prettyprint">oj-c-message-banner</code>
    element
  </li>
  <li>
    Note that the data row consists of an additional property other than those specified in the
    <code class="prettyprint">MessageBannerItem</code>
    type:
    <code class="prettyprint">detailList</code>. This property will be used for populating the list of error messages in the detail area.
    The property name can be anything, and for the demo purposes we are using 'detailList' here.
  </li>
  <li>
    In the HTML, provide a named template slot for rendering a list of messages in the detail area.
    In this demo, we have the template slot named as
    <b>detailList</b>
    which renders a list of text. The name of the template slot can be anything,
    and for the demo purposes we are using 'detailList' here.
  </li>
  <li>
    Set the
    <a target="_blank" href="jsdocs/oj-c.MessageBanner.html#detailTemplateValue">
      detail-template-value
    </a>
    attribute to the name of the template slot be used, in this case, it is
    <b>detailList</b>. When this attribute is set to a string, the component will use the same template slot for rendering the
    detail content of all the messages.
  </li>
  <li>
    Now to include new items to the list, update the
    <code class="prettyprint">detailList</code>
    property of the same row to include the new item. This will update the same message and add the
    new item to the list shown in the detail area.
  </li>
  <li>
    See
    <a href="#" onclick="demoGoLink(event, 'messagebannerCorepack', 'pageMessages')">Page Messages</a>
    demo for various attributes that can be used for customizing the content of the messages.
  </li>
</ul>`;

export const messagebannerDetailListcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

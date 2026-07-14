import 'preact';

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
    Note that the data row consists of additional properties other than those specified in the
    <code class="prettyprint">MessageBannerItem</code>
    type. They are
    <code class="prettyprint">actions</code>
    and
    <code class="prettyprint">detailLink</code>. These properties will be used for customizing the detail content. These property names can be anything,
    and for the demo purposes we are using 'actions' and 'detailLink' here.
  </li>
  <li>
    In the HTML, provide named template slots for handling each customization. In this demo, we have
    two template slots:
    <b>actions</b>
    template for creating messages with action items and
    <b>detailLink</b>
    template for creating messages with a link appended to the detail text. The name of the template slots can be anything,
    and for the demo purposes we are using 'actions' and 'detailLink' here.
  </li>
  <li>
    Specify a function that can determine the name of the template slot to be used based on the
    message data and bind it to the
    <a target="_blank" href="jsdocs/oj-c.MessageBanner.html#detailTemplateValue">
      detail-template-value
    </a>
    attribute of the
    <code class="prettyprint">oj-c-message-banner</code>
    component
  </li>
  <li>
    See
    <a href="#" onclick="demoGoLink(event, 'messagebannerCorepack', 'pageMessages')">Page Messages</a>
    demo for various attributes that can be used for customizing the content of the messages.
  </li>
</ul>`;

export const messagebannerDetailActionscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-message-toast</code>
    element
  </li>
  <li>
    Create a
    <code class="prettyprint">MutableArrayDataProvider</code>
    consisting of an Array of messages data and bind it to the
    <a target="_blank" href="jsdocs/oj-c.MessageToast.html#data">data</a>
    attribute of the
    <code class="prettyprint">oj-c-message-toast</code>
    element
  </li>
  <li>
    Note that the data row consists of additional properties other than those specified in the
    <code class="prettyprint">MessageToastItem</code>
    type. They are
    <code class="prettyprint">action</code>
    and
    <code class="prettyprint">detailLink</code>. These properties will be used for customizing the detail content.
  </li>
  <li>
    In the HTML, provide named template slots for handling each customization. In this demo, we have
    two template slots:
    <b>action</b>
    template for creating messages with action item and
    <b>detailLink</b>
    template for creating messages with a link appended to the detail text.
  </li>
  <li>
    Specify a function that can determine the name of the template slot to be used based on the
    message data and bind it to the
    <a target="_blank" href="jsdocs/oj-c.MessageToast.html#detailTemplateValue">
      detail-template-value
    </a>
    attribute of the
    <code class="prettyprint">oj-c-message-toast</code>
    component
  </li>
  <li>
    See
    <a href="#" onclick="demoGoLink(event, 'messagetoast', 'pageMessages')">Page Messages</a>
    demo for various attributes that can be used for customizing the content of the messages.
  </li>
</ul>`;

export const messagetoastDetailActionscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

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
    Use the
    <a target="_blank" href="jsdocs/oj-c.MessageBanner.html#sorting">sorting</a>
    attribute to specify how to sort the messages:
    <ul>
      <li>
        <code class="prettyprint">severity</code> - This is the default value. The messages are sorted based on decreasing order of severity - error,
        warning,
        info, confirmation and then none. The messages of same severity are then sorted in reverse chronological order using
        the timestamp
        property of the messages.
      </li>
      <li>
        <code class="prettyprint">off</code> - The messages will not be sorted and the order is
        determined by the order of the data.
      </li>
    </ul>
  </li>
</ul>`;

export const messagebannerSortingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

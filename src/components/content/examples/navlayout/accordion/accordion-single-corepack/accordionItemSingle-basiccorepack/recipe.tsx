import 'preact';

export const accordionItemSingleBasiccorepackRecipe = (
  <>
    <ol>
      <li>
        Create an <code class="prettyprint">oj-c-accordion-item-single</code>{" "}
        element for each item in your accordion.
      </li>
      <li>
        Set the <code class="prettyprint">item-key</code> property on each{" "}
        <code class="prettyprint">oj-c-accordion-item-single</code> to uniquely
        identify each item.
      </li>
      <li>
        Bind the <code class="prettyprint">expanded-key</code> property to a
        state value to control which item is expanded.
      </li>
      <li>
        Update the <code class="prettyprint">expandedKey</code> state value to
        expand or collapse items programmatically.
      </li>
    </ol>
  </>
);

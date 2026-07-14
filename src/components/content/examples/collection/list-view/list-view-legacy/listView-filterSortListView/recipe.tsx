// @ts-nocheck
import 'preact';

export const listViewFilterSortListViewRecipe = (
  <>
    <ol>
      <li>
        Construct an ArrayDataProvider with the data as shown. Make sure to specify the 'keyAttributes'
        option.
      </li>
      <li>
        Use the oj-list-view tag to create a JET ListView and bind the ArrayDataProvider you created
        previously using the data attribute.
      </li>
      <li>
        Since oj-list-item-layout is used, which provides its own padding, remove the default item
        padding using the oj-listview-item-padding-off style class.
      </li>
      <li>
        Use the item.enter-key-focus-behavior attribute and set it to 'focusWithin' to allow access to
        focusable elements within the item using the enter key (in addition to F2 key).
      </li>
      <li>Apply the binding.</li>
      <li>
        Use the on-value-changed attribute to listen for value changes from the sort drop down. When the
        sort value changes, create a new ListDataProviderView with the appropriate sort criteria. This
        will cause ListView to refresh with the sorted data.
      </li>
      <li>
        Use the on-value-changed attribute to listen for value change from the filter check boxes. When
        the filter changes, create a new ListDataProviderView with the appropriate filter criteria. This
        will cause ListView to refresh with the filtered data.
      </li>
    </ol>
  </>
);

// @ts-nocheck
import { h } from 'preact';

export const listViewObservableNestedArrayListViewRecipe = (
  <>
    <ol>
      <li>Construct an ArrayTreeDataProvider using the nested observable array as shown.</li>
      <li>Use the oj-list-view tag to create a JET ListView.</li>
      <li>
        Use the data attribute to bind the ArrayTreeDataProvider you created previously as data input.
      </li>
      <li>Use the expanded attribute and bind it to AllKeySetImpl so that all items are expanded.</li>
      <li>
        Specify a template using the itemTemplate slot to specify what gets rendered inside the list
        item.
      </li>
      <li>Apply the binding as shown at the bottom.</li>
      <li>
        Note the data-oj-clickthrough="disabled" is specified on the add button so that the click event
        will not be processed by ListView.
      </li>
    </ol>
  </>
);

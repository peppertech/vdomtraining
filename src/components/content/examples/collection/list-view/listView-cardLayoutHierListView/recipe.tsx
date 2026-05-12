// @ts-nocheck
import { h } from 'preact';

export const listViewCardLayoutHierListViewRecipe = (
  <>
    <ol>
      <li>Construct an ArrayTreeDataProvider using the data as shown.</li>
      <li>
        Use the oj-list-view tag to to create a JET ListView which uses the ArrayTreeDataProvider you
        created previously as input.
      </li>
      <li>
        Use the itemTemplate slot to specify the template that you want to use to render the content
        inside list item.
      </li>
      <li>Use the display attribute to specify whether to display the item as card or item</li>
      <li>
        Set oj-listview-full-width class on ListView to change certain visual aspects of ListView when
        it covers the entire width of the page.
      </li>
      <li>Apply the binding as shown at the bottom.</li>
    </ol>
  </>
);

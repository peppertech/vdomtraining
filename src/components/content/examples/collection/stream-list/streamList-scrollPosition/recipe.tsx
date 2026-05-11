// @ts-nocheck
import { h } from 'preact';

export const streamListScrollPositionRecipe = (
  <>
    <ol>
      <li>
        Construct an ArrayDataProvider or ArrayTreeDataProvider using the observable array as shown.
      </li>
      <li>Use the oj-stream-list tag to create a JET StreamList.</li>
      <li>
        Use the data attribute to bind the ArrayDataProvider you created previously as data input.
      </li>
      <li>
        Specify a template using the itemTemplate slot to specify what gets rendered inside the list
        item.
      </li>
      <li>Apply the binding as shown at the bottom.</li>
    </ol>
  </>
);

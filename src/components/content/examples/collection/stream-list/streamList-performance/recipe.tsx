// @ts-nocheck
import { h } from 'preact';

export const streamListPerformanceRecipe = (
  <>
    <ol>
      <li>Create a oj-streamlist element and assign it a meaningful ID and specify properties.</li>
      <li>
        Construct a ArrayTreeDataProvider data, and specify the data source through the
        <b><i>data</i></b>
        attribute.
      </li>
      <li>Use the keySet to switch between collapsed and expanded mode.</li>
      <li>
        Override the default scrollPolicy using
        <code>scroll-policy</code>
      </li>
      <li>
        Use the itemTemplate and groupTemplate slot to specify the template for rendering the item.
      </li>
    </ol>
  </>
);

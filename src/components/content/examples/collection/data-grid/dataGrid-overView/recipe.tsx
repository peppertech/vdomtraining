// @ts-nocheck
import { h } from 'preact';

export const dataGridOverViewRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>
        Create a class that implements the
        <a href={"jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        interface and set that on the oj-data-grid's data attribute and apply bindings to the grid.
      </li>
      <li>
        Set the resizable property for rows and columns and persist the event info to keep resized
        configurations after interactions like sort.
      </li>
      <li>
        Use the "selection-mode" attribute to set either single or multiple row and/or column selection.
      </li>
      <li>To enable high-water mark scrolling, set the scrollPolicy option to loadMoreOnScroll.</li>
      <li>Use number converter to format the display of numeric values</li>
    </ol>
  </>
);

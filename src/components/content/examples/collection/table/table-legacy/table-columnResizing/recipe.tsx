// @ts-nocheck
import { h } from 'preact';

export const tableColumnResizingRecipe = (
  <>
    <ol>
      <li>Use the oj-table tag to create a JET Table.</li>
      <li>Use the columnResizeBehavior attribute to specify whether the Table's column resizing behavior should keep the total width of all columns the same by redistributing any resize amount to an adjacent column, or should increase or decrease the total width of all columns by the resize amount.</li>
      <li>Optionally, populate any or all of the Table's columns[] resizable properties to fine-tune the column resizing behavior.</li>
    </ol>
  </>
);

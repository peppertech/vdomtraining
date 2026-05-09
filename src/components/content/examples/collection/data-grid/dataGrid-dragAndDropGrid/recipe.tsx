// @ts-nocheck
import { h } from 'preact';

export const dataGridDragAndDropGridRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>Specify the appropriate attributes on the oj-data-grid elements.</li>
      <li>
        Allow reordering items using drag and drop by specifying the same dataTypes in the drag and the
        drop options of the Datagrid.
      </li>
      <li>Instantiate a new DemoArrayDataGridProvider</li>
      <li>Use the dragEnd and drop attributes to register a dragEnd and drop event callback.</li>
      <li>Enable multiple selection to allow dragging multiple rows/columns at the same time.</li>
      <li>
        Enable cut in the dataTransfer options and attach handler to work with reorder context menu.
      </li>
      <li>
        To trigger a context menu on datagrid, create an oj-menu element as a child of oj-datagrid
        element. (To enable cut and insert row/column via keyboard for Accessibility)
      </li>
      <li>Apply bindings to the datagrid.</li>
      <li>
        Drag and drop rows/columns using the corresponding headers using mouse and keyboard actions.
      </li>
    </ol>
  </>
);

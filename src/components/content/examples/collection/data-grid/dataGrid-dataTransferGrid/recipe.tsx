// @ts-nocheck
import 'preact';

export const dataGridDataTransferGridRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>Specify the appropriate attributes on the oj-data-grid elements.</li>
      <li>Instantiate a new DemoArrayDataGridProvider</li>
      <li>Apply bindings to the datagrid.</li>
      <li>Cut/Copy/Paste contents of the datagrid using keyboard commands/context menu option.</li>
      <li>
        Select a range of cells and hover over the corner of the cell to get fill marker. Drag the fill
        marker to fill the cells with contents of the selected range of cells.
      </li>
      <li>
        Note that navigator.clipboard methods, readText() and writeText() are not compatible across all
        browsers. Refer to implementation notes on cross browser compatibility.
      </li>
    </ol>
  </>
);

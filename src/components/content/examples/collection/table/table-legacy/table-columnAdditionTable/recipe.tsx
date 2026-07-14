// @ts-nocheck
import 'preact';

export const tableColumnAdditionTableRecipe = (
  <>
    <ol>
      <li>Use JET binding to create a JET table.</li>
      <li>Configure any appropriate UI for selecting and dragging available columns using HTML5 Drag and Drop.</li>
      <li>Set the "dnd.drop.columns" attribute according to the API doc.</li>
      <li>In the drop listener, update the "columns" property for the table to display the column dropped on the table</li>
    </ol>
  </>
);

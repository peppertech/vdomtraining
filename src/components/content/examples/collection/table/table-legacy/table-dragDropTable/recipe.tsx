// @ts-nocheck
import 'preact';

export const tableDragDropTableRecipe = (
  <>
    <ol>
      <li>Use JET binding to create a JET table.</li>
      <li>To enable dragging from a table, set the "selection-mode" attribute to &#123;"row":"single"&#125;, &#123;"row":"multiple"&#125;, or &#123;"row":"multipleToggle"&#125;.</li>
      <li>Set the dnd.drag.rows attribute according to the API doc.</li>
      <li>To enable dropping on a table, set the dnd.drop.rows attribute according to the API doc.</li>
      <li>Add keydown listener on table and logic in ViewModel to support drag and drop using keyboard.</li>
    </ol>
  </>
);

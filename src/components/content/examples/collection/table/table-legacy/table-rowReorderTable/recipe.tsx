// @ts-nocheck
import 'preact';

export const tableRowReorderTableRecipe = (
  <>
    <ol>
      <li>Use JET binding to create a JET table.</li>
      <li>Row re-ordering is a case of enabling dragging and dropping on the same table.</li>
      <li>To enable dragging from the table, set the "selection-mode" attribute to &#123;"row":"single"&#125;, &#123;"row":"multiple"&#125;, or &#123;"row":"multipleToggle"&#125;.</li>
      <li>Set the dnd.drag.rows attribute according to the API doc.</li>
      <li>To enable dropping on the table, set the dnd.drop.rows attribute according to the API doc.</li>
    </ol>
  </>
);

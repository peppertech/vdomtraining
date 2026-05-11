// @ts-nocheck
import { h } from 'preact';

export const tableDragTableDropChartRecipe = (
  <>
    <ol>
      <li>Use JET binding to create a JET table.</li>
      <li>To enable dragging from a table, set the "selection-mode" attribute to &#123;"row":"single"&#125;, &#123;"row":"multiple"&#125;, or &#123;"row":"multipleToggle"&#125;.</li>
      <li>Set the dnd.drag.rows attribute according to the API doc.</li>
      <li>To enable dropping on a component without dnd attribute, use Knockout event binding to bind to HTML5 drag and drop events directly.</li>
      <li>Add keydown listener on table and chart, with logic in ViewModel to support drag and drop using keyboard.</li>
    </ol>
  </>
);

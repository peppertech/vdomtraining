// @ts-nocheck
import 'preact';

export const dataGridCustomContextMenuGridRecipe = (
  <>
    <ol>
      <li>Define an oj-data-grid element and assign a meaningful id.</li>
      <li>
        Define an oj-menu element as a child of oj-data-grid and assign it with contextMenu slot
        attribute.
      </li>
      <li>
        To include default context menu functionality include an appropriate 'data-oj-command' attribute
        in your menu item.
      </li>
      <li>
        Create a class that implements the
        {" "}
        <a href={"/jsdocs/DataGridProvider.html"}>DataGridProvider</a>
        {" "}
        interface and set that on the oj-data-grid's data attribute and apply bindings to the grid.
      </li>
      <li>In your JavaScript define necessary functions, such as a new on action function.</li>
    </ol>
  </>
);

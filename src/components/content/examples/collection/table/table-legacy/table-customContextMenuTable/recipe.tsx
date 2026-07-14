// @ts-nocheck
import 'preact';

export const tableCustomContextMenuTableRecipe = (
  <>
    <ol>
      <li>Define an oj-table element and assign a meaningful id.</li>
      <li>Define an oj-menu element as a child of the oj-table and assign a meaningful id.</li>
      <li>To include default context menu functionality include an appropriate 'data-oj-command' attribute in your menu item.</li>
      <li>Set the "slot" attribute on the oj-menu to "contextMenu".</li>
      <li>In your JavaScript define necessary functions, such as a new on select function.</li>
    </ol>
  </>
);

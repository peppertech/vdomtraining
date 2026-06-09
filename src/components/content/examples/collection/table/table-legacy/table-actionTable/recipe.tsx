// @ts-nocheck
import { h } from 'preact';

export const tableActionTableRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider using the observable array as shown.</li>
      <li>See the API doc for details on how to specify the columns to display as well as other configuration options on ArrayDataProvider.</li>
      <li>Create an action column with oj-button component.</li>
      <li>Add an action handler on oj-button to update the observable array due to the action.</li>
      <li>Set the data-oj-clickthrough attribute on the oj-button to "disabled" to prevent clicks from affecting the Table's selection state.</li>
      <li>
        To freeze the action column set
        {" "}
        <code>frozenEdge</code>
        {" "}
        attribute to 'all'.
      </li>
      <li>
        <b>Note</b>
        : frozenEdge attribute should be used only when column needs to be frozen.
      </li>
    </ol>
  </>
);

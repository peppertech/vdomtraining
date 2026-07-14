// @ts-nocheck
import 'preact';

export const tableSelectionTableRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider using the JavaScript array as shown. Make sure to specify the "keyAttributes" property of the "options" parameter.</li>
      <li>Use the JET binding to create a JET Table which uses the ArrayDataProvider you created previously as input.</li>
      <li>Create an ArrayDataProvider to capture different selection modes and use it as datasource for oj-select-single component which is used to switch selection-mode.</li>
      <li>Use the "selection-mode" attribute of table to set either single or multiple row and/or column selection. (As a note, the 'id' property of each column is required when column selection is enabled).</li>
      <li>Register an event handler for 'selectedChanged' event.</li>
      <li>
        To get data from selected rows use fetchByKeys on the dataprovder as shown in the
        {" "}
        <a href={"#"}>data provider demo.</a>
      </li>
    </ol>
  </>
);

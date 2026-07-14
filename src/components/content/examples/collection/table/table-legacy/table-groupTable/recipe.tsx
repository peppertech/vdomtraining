// @ts-nocheck
import 'preact';

export const tableGroupTableRecipe = (
  <>
    <ol>
      <li>Create ArrayTreeDataProvider from JSON data as shown in viewmodel.</li>
      <li>Create a JET Table and use dataprovider created as datasource.</li>
      <li>Create a row template and add if statements based on the tree depth. Group header row will have depth 0 and other rows will have depth 1.</li>
      <li>Populate the row template with the desired elements to display row data.</li>
      <li>Set colspan in group header row template and also set aria-label for accessibility.</li>
      <li>Use row.sticky table API to make group headers sticky.</li>
      <li>Use row.selectable table API to disable selection of group header rows.</li>
      <li>To ensure group headers are fully accessible, remember to set the tabindex attribute to '0' on each text area.</li>
    </ol>
  </>
);

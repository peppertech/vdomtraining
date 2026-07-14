// @ts-nocheck
import 'preact';

export const tableDetailTableRecipe = (
  <>
    <ol>
      <li>Create a JET Table and assign it a meaningful ID.</li>
      <li>In your JavaScript read data from a JSON file. Create a TreeDataSource with the data.</li>
      <li>Create a row template which takes in a rowContext and add the row expander to the column designated with expand/collapse icon.</li>
      <li>Populate the row template with the desired elements to display row data.</li>
      <li>In your row template, add if statements based on the tree depth. The non-detail rows should have depth=1 while the detail rows will have depth=2.</li>
      <li>Use colspan in your td cells as needed for cells which should span multiple columns.</li>
    </ol>
  </>
);

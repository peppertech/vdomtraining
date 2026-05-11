// @ts-nocheck
import { h } from 'preact';

export const tableObservableArrayTableRecipe = (
  <>
    <ol>
      <li>Construct a DataProvider that can get data from the data source. This demo uses an ArrayDataProvider.</li>
      <li>Wrap the ArrayDataProvider with a BufferingDataProvider.</li>
      <li>Use JET binding to bind the BufferingDataProvider to a JET Table.</li>
      <li>Create a FormLayout for editing individual row from the Table.</li>
      <li>Add handlers to Table and FormLayout to store changes by calling methods on BufferingDataProvider.</li>
      <li>Add handler to commit changes by interacting directly with the data source.</li>
    </ol>
  </>
);

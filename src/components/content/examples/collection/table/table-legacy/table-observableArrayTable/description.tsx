// @ts-nocheck
import 'preact';

export const tableObservableArrayTableDescription = (
  <>
    <p>A table displays data items in a tabular format with highly interactive features.</p>
    <p>This demo shows how to use BufferingDataProvider with Table and FormLayout to hold editing changes for commit later on.</p>
    <p>When you select a row in the Table, the row data will be displayed in the FormLayout. You can use the FormLayout to create, remove, or update a row.</p>
    <p>All changes made in the FormLayout will be temporarily stored in BufferingDataProvider. The buffered changes will be displayed in the TextArea at the bottom.</p>
    <p>Click the "Reset Changes" button to discard all changes and reset the rows to the original data, or click the "Submit Changes" button to commit all changes to the data source.</p>
  </>
);

// @ts-nocheck
import { h } from 'preact';

export const bufferingTreeDataProviderTableRowExpanderMutationsRecipe = (
  <>
    <ol>
      <li>Create an oj-table and assign it a meaningful ID.</li>
      <li>
        Create a nested observable array structure (called
        {" "}
        <code>observableArrayTree</code>
        {" "}
        in this demo) using data from a local JSON.
      </li>
      <li>
        Construct a ArrayTreeDataProvider using the ObservableArrayTree, and specify the data source
        through the
        {" "}
        <b><i>data</i></b>
        {" "}
        attribute. Refer to the API doc for details on how to specify a JSON tree definition.
      </li>
      <li>
        Wrap your
        {" "}
        <code>ArrayTreeDataProvider</code>
        {" "}
        with a
        {" "}
        <code>BufferingTreeDataProvider</code>
        .
      </li>
      <li>
        Wrap your
        {" "}
        <code>BufferingTreeDataProvider</code>
        {" "}
        with a
        {" "}
        <code>FlattenedTreeDataProviderView</code>
        {" "}
        and feed that to the table implementation.
      </li>
      <li>
        Add the oj-row-expander to the column in your rowTemplate where you want the expand/collapse
        icon and bind it's context.
      </li>
      <li>Create a FormLayout for editing individual row from the Table.</li>
      <li>
        Add handlers to Table and FormLayout to store changes by calling methods on
        BufferingDataProvider.
      </li>
      <li>Add handler to commit changes by interacting directly with the data source.</li>
    </ol>
  </>
);

import { h } from 'preact';

export const treeViewSearchableRecipe = (
  <>
    <ol>
      <li>
        Create an oj-tree-view element and assign it a meaningful ID and specify properties on the
        oj-tree-view.
      </li>
      <li>
        Construct a ArrayTreeDataProvider using local JSON, and specify the data source through the
        {" "}
        <b><i>data</i></b>
        {" "}
        attribute. Refer to the API doc for details on how to specify a JSON tree definition.
      </li>
      <li>Use an itemTemplate to render the contents of the items.</li>
      <li>Use an oj-input-search to retrieve user inputted search criteria.</li>
      <li>
        Hook up a listener on
        {" "}
        <code>on-oj-value-action</code>
        {" "}
        so search fires on action.
      </li>
      <li>Filter data and construct a new ArrayTreeDataProvider.</li>
    </ol>
  </>
);

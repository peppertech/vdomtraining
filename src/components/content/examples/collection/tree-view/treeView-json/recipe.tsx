import { h } from 'preact';

export const treeViewJsonRecipe = (
  <>
    <ol>
      <li>
        Create an oj-tree-view element and assign it a meaningful ID and specify properties on the
        oj-tree-view.
      </li>
      <li>
        Construct a ArrayTreeDataProvider using local JSON, and specify the data source through the
        <b><i>data</i></b>
        attribute. Refer to the API doc for details on how to specify a JSON tree definition.
      </li>
      <li>Use an itemTemplate to render the contents of the items.</li>
    </ol>
  </>
);

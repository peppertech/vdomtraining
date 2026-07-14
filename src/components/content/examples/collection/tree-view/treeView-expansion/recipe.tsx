import 'preact';

export const treeViewExpansionRecipe = (
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
      <li>
        Set the
        {" "}
        <b><i>expanded</i></b>
        {" "}
        attribute to an instance of a
        {" "}
        <code>obsKeySet.ObservableKeySet()</code>
        .
      </li>
      <li>
        Hook up expand and collapse listeners using the
        {" "}
        <code>on-oj-expand</code>
        {" "}
        and
        {" "}
        <code>on-oj-collapse</code>
        {" "}
        attributes.
      </li>
    </ol>
  </>
);

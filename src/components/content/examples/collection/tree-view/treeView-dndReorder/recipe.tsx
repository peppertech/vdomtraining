import 'preact';

export const treeViewDndReorderRecipe = (
  <>
    <ol>
      <li>
        Allow reordering items using drag and drop by specifying the same dataTypes in the drag and the
        drop options of the TreeView.
      </li>
      <li>
        Create a nested observable array structure (called
        {" "}
        <code>observableArrayTree</code>
        {" "}
        in this demo) using data from a local JSON
      </li>
      <li>
        Construct a ArrayTreeDataProvider using the ObservableArrayTree, and specify the data source
        through the
        {" "}
        <b><i>data</i></b>
        {" "}
        attribute. Refer to the API doc for details on how to specify a JSON tree definition.
      </li>
      <li>Use the dragEnd and drop attributes to register a dragEnd and drop event callback.</li>
      <li>Enable multiple selection to allow dragging multiple items at the same time.</li>
      <li>
        To trigger a context menu on TreeView items, create an oj-menu element as a child of
        oj-tree-view element. (To enable cut and paste via keyboard for Accessibility)
      </li>
    </ol>
  </>
);

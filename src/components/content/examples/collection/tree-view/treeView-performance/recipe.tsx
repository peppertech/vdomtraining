import { h } from 'preact';

export const treeViewPerformanceRecipe = (
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
      <li>
        Override the default maxCount using
        {" "}
        <code>scroll-policy-options.max-count</code>
      </li>
      <li>
        Note: As a rule of thumb, it is recommended that applications limit the amount of data to
        display. Displaying large number of items in TreeView makes it hard for user to find what they
        are looking for, but also affects the load time and scrolling performance as well.
      </li>
      <li>Use an itemTemplate to render the contents of the items.</li>
    </ol>
  </>
);

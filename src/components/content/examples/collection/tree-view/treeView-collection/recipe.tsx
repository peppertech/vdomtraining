import { h } from 'preact';

export const treeViewCollectionRecipe = (
  <>
    <ol>
      <li>
        Create an oj-tree-view element and assign it a meaningful ID and specify properties on the
        oj-tree-view.
      </li>
      <li>Create RESTTreeDataProvider options object.</li>
      <li>
        Define
        {" "}
        <code>url</code>
        {" "}
        and
        {" "}
        <code>keyAttributes</code>
      </li>
      <li>
        Define
        {" "}
        <code>transforms.fetchFirst.request</code>
        {" "}
        to create a
        {" "}
        <code>Request</code>
        {" "}
        with the pagination query parameters added to the URL.
      </li>
      <li>
        Define
        {" "}
        <code>transforms.fetchFirst.response</code>
        {" "}
        to extract
        {" "}
        <code>data</code>
        ,
        <code>metadata</code>
        ,
        <code>totalSize</code>
        {" "}
        and
        {" "}
        <code>hasMore</code>
        {" "}
        from the response body.
      </li>
      <li>
        Define
        {" "}
        <code>getChildDataProvider</code>
        {" "}
        to get the child data provider of the node corresponding to
        {" "}
        <code>item</code>
      </li>
      <li>
        Create
        {" "}
        <code>RESTTreeDataProvider</code>
        {" "}
        with the options object and feed that to the oj-tree-view implementation.
      </li>
      <li>Use an itemTemplate to render the contents of the items.</li>
    </ol>
  </>
);

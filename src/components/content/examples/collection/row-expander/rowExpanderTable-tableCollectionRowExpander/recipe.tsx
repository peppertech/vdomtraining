// @ts-nocheck
import 'preact';

export const rowExpanderTableTableCollectionRowExpanderRecipe = (
  <>
    <ol>
      <li>Create an oj-table and assign it a meaningful ID.</li>
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
        <code>transforms.fetchByOffset.request</code>
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
        <code>transforms.fetchByOffset.response</code>
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
        with the options object.
      </li>
      <li>
        In the RESTTreeDataProvider.Options use the capabilities object to set the fetchByOffset
        implementation to
        {" "}
        <code>randomAccess</code>
        .
      </li>
      <li>
        Wrap your
        {" "}
        <code>RESTTreeDataProvider</code>
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
      <li>Subscribe to FlattenedTreeDataProviderView's expanded observable.</li>
    </ol>
  </>
);

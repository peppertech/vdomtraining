// @ts-nocheck
import { h } from 'preact';

export const tableProgressiveLoadTableRecipe = (
  <>
    <ol>
      <li>Start a mock fetch server to serve the Employees dataset for the demo (not part of RESTDataProvider).</li>
      <li>
        Create a
        <code>RESTDataProvider</code>
        with
        <code>keyAttributes="EMPLOYEE_ID"</code>
        and the server
        <code>url</code>
        .
      </li>
      <li>
        In the
        <code>fetchFirst</code>
        request transform, map the component's paging parameters (
        <code>size</code>
        ,
        <code>offset</code>
        ) to the mock server's query parameters (
        <code>limit</code>
        ,
        <code>offset</code>
        ). In the response transform, parse the mock server body and return
        <code>&#123; data, totalSize, hasMore &#125;</code>
        .
      </li>
      <li>
        Wrap the
        <code>RESTDataProvider</code>
        in
        <code>DemoDelayingDataProvider</code>
        to add an artificial fetch delay so the loading indicator is clearly visible. Use the input to adjust the delay at runtime and reapply it.
      </li>
      <li>
        Use the
        <code>oj-table</code>
        tag to create a JET Table.
      </li>
      <li>
        Bind the
        <code>RESTDataProvider</code>
        (wrapped by
        <code>DemoDelayingDataProvider</code>
        ) to the table via
        <code>data="[[dataProvider]]"</code>
        .
      </li>
      <li>
        Use high-water-mark scrolling. The default is
        <code>scroll-policy="loadMoreOnScroll"</code>
        ; optionally set
        <code>scroll-policy-options.fetch-size</code>
        (e.g.
        <code>15</code>
        ) to control the fetch size.
      </li>
      <li>Apply the binding as shown at the bottom of the demo.</li>
      <li>Note the initial fetch is intentionally slowed down to show the loading indicator.</li>
    </ol>
  </>
);

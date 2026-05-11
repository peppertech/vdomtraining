// @ts-nocheck
import { h } from 'preact';

export const tableProgressiveLoadTableDescription = (
  <>
    <p>A table displays data items in a tabular format with highly interactive features.</p>
    <p>This demo shows oj-table with an initial loading indicator and a loading indicator that appears as more rows are fetched while scrolling. The table is driven by a RESTDataProvider, and the fetches are intentionally delayed so the loading indicator is clearly visible.</p>
    <p>
      A RESTDataProvider is configured with
      <code>keyAttributes="EMPLOYEE_ID"</code>
      and request/response transforms for
      <code>fetchFirst</code>
      :
    </p>
    <ul>
      <li>
        The request transform maps the component's paging parameters (
        <code>size</code>
        ,
        <code>offset</code>
        ) to the mock service's query parameters (
        <code>limit</code>
        ,
        <code>offset</code>
        ).
      </li>
      <li>
        The response transform parses the mock response and returns
        <code>&#123; data, totalSize, hasMore &#125;</code>
        .
      </li>
    </ul>
    <p>
      To make the loading indicator more apparent, the RESTDataProvider is wrapped with a small helper
      <code>DemoDelayingDataProvider</code>
      that adds an artificial delay to fetches. Use the "Fetch Delay (ms)" control to adjust the delay at runtime.
    </p>
  </>
);

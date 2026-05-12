// @ts-nocheck
import { h } from 'preact';

export const listViewCollectionListViewDescription = (
  <>
    <p>A list view displays data items as a list or a grid with highly interactive features.</p><p>
      This demo shows oj-list-view powered by a RESTDataProvider with high-water mark (loadMoreOnScroll)
      virtualization.
    </p>
    <p>The RESTDataProvider uses request/response transforms:</p>
    <ul>
      <li>
        Request transform appends paging parameters (
        <code>limit</code>
        ,
        <code>offset</code>
        ) to the URL so the backend returns the next slice of results.
      </li>
      <li>
        Response transform parses the mock server response into
        <code>{'{'} data, totalSize, hasMore {'}'}</code>
        , which oj-list-view uses to render items and to know whether more data is available.
      </li>
    </ul>
    <p>
      For demo purposes only, a MockFetchServer provides the tweets dataset. In a real application,
      configure
      <code>url</code>
      to point to your REST endpoint.
    </p>
  </>
);

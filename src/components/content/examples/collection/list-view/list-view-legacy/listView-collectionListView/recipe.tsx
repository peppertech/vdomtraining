// @ts-nocheck
import { h } from 'preact';

export const listViewCollectionListViewRecipe = (
  <>
    <ol>
      <li>
        Start a mock REST server to serve the Tweets dataset for the demo (not part of
        RESTDataProvider).
      </li>
      <li>
        Create a
        {" "}
        <code>RESTDataProvider</code>
        {" "}
        with
        {" "}
        <code>keyAttributes="source"</code>
        {" "}
        and the server
        {" "}
        <code>url</code>
        .
      </li>
      <li>
        In the
        {" "}
        <code>fetchFirst</code>
        {" "}
        request transform, append paging params (
        {" "}
        <code>limit</code>
        ,
        <code>offset</code>
        ).
      </li>
      <li>
        In the
        {" "}
        <code>fetchFirst</code>
        {" "}
        response transform, parse the response body and return
        {" "}
        <code>{'{'} data, totalSize, hasMore {'}'}</code>
        .
      </li>
      <li>
        Bind the
        {" "}
        <code>RESTDataProvider</code>
        {" "}
        to
        {" "}
        <code>oj-list-view</code>
        {" "}
        via
        {" "}
        <code>data="[[dataProvider]]"</code>
        .
      </li>
      <li>
        Use
        {" "}
        <code>selection-mode="single"</code>
        , keep the default
        {" "}
        <code>scroll-policy="loadMoreOnScroll"</code>
        , and set
        {" "}
        <code>scroll-policy-options.fetch-size="15"</code>
        .
      </li>
      <li>
        Set
        {" "}
        <code>item.enter-key-focus-behavior="focusWithin"</code>
        {" "}
        so the Enter key can move focus inside each item.
      </li>
      <li>Apply Knockout bindings in code after the document is ready.</li>
    </ol>
  </>
);

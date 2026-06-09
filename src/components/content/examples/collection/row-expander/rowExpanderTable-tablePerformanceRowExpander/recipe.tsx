// @ts-nocheck
import { h } from 'preact';

export const rowExpanderTableTablePerformanceRowExpanderRecipe = (
  <>
    <ol>
      <li>Create an oj-table with Row Expander (See Table with Row Expander Demo).</li>
      <li>
        In your JavaScript read data from a JSON file. Create a
        {" "}
        <code>ArrayTreeDataProvider</code>
        {" "}
        with the data.
      </li>
      <li>
        Wrap your
        {" "}
        <code>ArrayTreeDataProvider</code>
        {" "}
        with a
        {" "}
        <code>FlattenedTreeDataProviderView</code>
        .
      </li>
      <li>
        Add the oj-row-expander to the column in your rowTemplate where you want the expand/collapse
        icon and bind it's context.
      </li>
      <li>Use the scroll-policy attribute to enable highwatermark scrolling.</li>
      <li>Use the scroll-policy-options.fetch-size attribute to explicitly specify a fetch size.</li>
    </ol>
  </>
);

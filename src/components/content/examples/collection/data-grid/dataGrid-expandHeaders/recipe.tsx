// @ts-nocheck
import { h } from 'preact';

export const dataGridExpandHeadersRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>Specify the appropriate attributes on the oj-data-grid element.</li>
      <li>
        Set the
        {" "}
        <code>columnHeaders</code>
        {" "}
        option for
        {" "}
        <code>column</code>
        {" "}
        and
        {" "}
        <code>columnEnd</code>
        {" "}
        to specify nested headers.
      </li>
      <li>
        Set the
        {" "}
        <code>headerLabels</code>
        {" "}
        option for row, column, and columnEnd to specify header labels.
      </li>
    </ol>
  </>
);

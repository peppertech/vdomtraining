import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p>This demo shows the following oj-c-table features:
<br />
<ul>
  <li>Single Row/Column selection</li>
  <li>Multiple Rows/Columns Selection</li>
  <li>Switching of selection-mode using external control</li>
  <li>Clearing selection with an external control</li>
</ul>

<p>
  <b>Multiple vs MultipleToggle Selection</b>
</p>

<ul>
  <li>
    Multiple Selection - When specified, most selection gestures made on the Table will be
    interpreted as 'replace' gestures. For example, clicking on an already selected row will
    not affect that row's selection, and clicking on a non-selected row will select that row
    and deselect any other previously selected rows. In order to perform additive selections,
    users can click on selector checkboxes, press spacebar, or ctrl/cmd click on individual
    rows to perform 'toggle' selection gestures.
  </li>
  <li>
    Multiple Toggle Selection - When specified, all selection gestures made on the Table will
    be interpreted as 'toggle' gestures. For example, clicking on an already selected row will
    deselect that row, and clicking on any non-selected row will select that row without affecting
    any previously selected rows.
  </li>
</ul>`;

export const tableSelectionTablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

// @ts-nocheck
import 'preact';

const descriptionHtmlText = String.raw`<p>A picto chart is an interactive data visualization of textual data. PictoChart uses icons to visualize an absolute number, or the relative sizes of the different parts of a population.</p><p>The selection mode feature allows a user to focus on a specific data item by clicking on it.</p>
<ul>
  <li>
    By default,
    <i><b>selection-mode</b></i>
    set to
    <i>'none'</i>
    and disabled.
  </li>
  <li>
    When
    <i><b>selection-mode</b></i>
    is set to
    <i>'single'</i>, only one data item can be selected at a time.
  </li>
  <li>
    When
    <i><b>selection-mode</b></i>
    is set to
    <i>'multiple'</i>, selection of more than one item at a time is enabled. On desktop, select multiple items by
    holding the Ctrl key.
  </li>
</ul>`;

export const pictoChartSelectioncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

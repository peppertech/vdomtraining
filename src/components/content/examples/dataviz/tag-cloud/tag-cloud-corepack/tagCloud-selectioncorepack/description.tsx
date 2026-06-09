import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A tag cloud is an interactive data visualization of textual data, where the importance of each tagged word or phrase is represented by font size or color.</p><p>This demo shows the JET Core Pack Tag Cloud </p>
<p>The selection feature allows a user to focus on a specific data item by clicking on it.</p>
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

export const tagCloudSelectioncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p><p>This demo shows how to update the table's background color.</p>
<p>
  If an application uses any background color classes for table's container specified in the
  <a href="#" onclick="demoGoLink(event, 'colors', 'bgcolors'); return false;">
    background color demo
  </a>, then the table will pick up that background color automatically. If a
  different background color is desired, one can be set using the --oj-current-bg-color CSS
  variable.
</p>`;

export const tableBackgroundColorcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

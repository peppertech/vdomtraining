import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  The demo show how changing the dialog's drag affordance option can affect the dialog. The
  following describes the different settings of the
  <code class="prettyprint">drag-affordance</code>
  property:
</p>
<table class="dialogDemo">
  <tr>
    <th>Attribute Setting</th>
    <th class="padding-10">Drag Behavior</th>
  </tr>
  <tr>
    <td><code class="prettyprint">drag-affordance="header"</code></td>
    <td class="align-center">dialog draggable by header</td>
  </tr>
  <tr>
    <td><code class="prettyprint">drag-affordance="none"</code></td>
    <td class="align-center">dialog not draggable</td>
  </tr>
</table>
<p>
  The dialog's default
  <code class="prettyprint">drag-affordance</code>
  value is
  <code class="prettyprint">'none'</code>
</p>`;

export const dialogDragAffordancecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A table displays data items in a tabular format with highly interactive features.</p><p>
  This demo shows how to manage tab stops in the <code class="prettyprint">oj-c-table</code>. Specifically,
  the <code class="prettyprint">oj-c-table</code> should act as a single tab stop until a user activates
  tabbable mode by pressing the F2 or Enter keys or by interacting with a focusable element within a cell.
</p>
<p>
  This demo highlights what applications should do when a template contains the following types of content:
</p>
<ol>
  <li>
    Custom elements that contain tabbable elements (includes legacy JET components as well as third-party
    components): The <code class="prettyprint">demo-memory-card</code> element specified in the 'card' template.
    The application should set the <code class="prettyprint">data-oj-manage-tabs</code> attribute on the custom
    element or one of its ancestors.
  </li>
  <li>
    Basic tabbable elements: The anchor element specified in the 'link' template. The application should set
    the <code class="prettyprint">tabindex</code> of the element to -1 when the
    <code class="prettyprint">isTabbable</code> property of the template context is false.
  </li>
  <li>
    Core pack components (elements that begin with oj-c): The <code class="prettyprint">oj-c-rating-gauge</code>
    element specified in the 'rating' template. No special <code class="prettyprint">tabindex</code> handling is
    required.
  </li>
</ol>`;

export const tableManageTabStopscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

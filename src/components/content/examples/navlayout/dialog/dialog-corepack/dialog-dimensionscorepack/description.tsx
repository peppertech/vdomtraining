import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  Dialog dimensions -
  <code class="prettyprint">width, height, min-width, max-width, min-height</code>
  and
  <code class="prettyprint">max-height</code>
  can be configured using the element attributes. For example, to create a dialog that cannot
  be resized smaller than 12rem x 14rem, or larger than 22rem x 24rem, use the following:
</p>
<p>
  <code class="prettyprint">
    &lt;oj-c-dialog ...  width="20rem" height="15rem" min-width="12rem" max-width="22rem" min-height="14rem" max-height="24rem">&lt;/oj-c-dialog>
  </code>
</p>`;

export const dialogDimensionscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

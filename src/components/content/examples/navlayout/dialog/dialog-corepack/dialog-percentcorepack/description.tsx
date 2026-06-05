import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Dialog is a floating window that typically contains a header, content and footer area. A Dialog is typically modal and centered in viewport.</p><p>
  Dialog dimensions can be specified using height and width percentages that are relative to the
  size of the viewport. In this example, we have set
  <code class="prettyprint">width:50vw</code>
  and
  <code class="prettyprint">height:50vh</code>
  using the
  <code class="prettyprint">width, height</code>
  attribute.
</p>

<p>
  Specifying height and width using the percentage unit
  <code class="prettyprint">%</code>
  is problematic. To achieve fluid dialog sizing relative to the browser's viewport, use the
  viewport-percentage units:
  <code class="prettyprint">vw, vh, vmin, vmax</code>
  .
</p>`;

export const dialogPercentcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A popup temporarily 'pops up' content in the foreground.</p><p>
  This demo shows the usage of popup's
  <code class="prettyprint">modality</code>
  property. When set to
  <code class="prettyprint">modal</code>, the user input of the page behind the popup is blocked
</p>
<p>
  The demo also shows the effect of the
  <code class="prettyprint">auto-dismiss</code>
  property. The
  <code class="prettyprint">none</code>
  value prevents the popup from closing when the user clicks outside of the popup area.
</p>`;

export const popupModalcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

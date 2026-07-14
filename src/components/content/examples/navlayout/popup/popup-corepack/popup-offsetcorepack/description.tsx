import 'preact';

const descriptionHtmlText = String.raw`<p>A popup temporarily 'pops up' content in the foreground.</p><p>This demo shows the usage of popup's
  <code class="prettyprint">offset</code> property.
  Open the Popup and set <code class="prettyprint">x</code> and <code class="prettyprint">y</code> offset values.
</p>
<p>
  Offset is the distance from Popup's default placement (<code class="prettyprint">bottom-start</code> in this demo)
  along X (horizontal) and Y (vertical) axes.
</p>`;

export const popupOffsetcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

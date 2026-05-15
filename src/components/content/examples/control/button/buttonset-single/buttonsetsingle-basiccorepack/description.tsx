import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Buttonset Single allows a user to select the state of one or more related options.</p><p>
  This demo shows a "single select" Buttonset, i.e. a Buttonset where only one of the buttons can be
  toggled.
</p>

<p>Such a grouping is appropriate when the buttons are semantically related.</p>`;

export const buttonsetsingleBasiccorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Buttonset Single allows a user to select the state of one or more related options.</p><p>
  This demo shows a "select one" Buttonset, i.e. a Buttonset where only one of the buttons can be
  toggled, with an accessible label and help definition.
</p>`;

export const buttonsetsingleLabelledButtonsetcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

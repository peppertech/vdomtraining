import 'preact';

const descriptionHtmlText = String.raw`<p>A Buttonset Multiple allows a user to select the states of one or more related options.</p><p>
  This demo shows a "multiple select" Buttonset, i.e. a Buttonset where more than one of the buttons can be
  toggled.
</p>

<p>Such a grouping is appropriate when the buttons are semantically related.</p>`;

export const buttonsetmultipleBasiccorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

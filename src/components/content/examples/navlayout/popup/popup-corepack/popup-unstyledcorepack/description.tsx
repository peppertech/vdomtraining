import 'preact';

const descriptionHtmlText = String.raw`<p>A popup temporarily 'pops up' content in the foreground.</p><p>
  This demo shows a popup with the default styling removed.
</p>`;

export const popupUnstyledcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

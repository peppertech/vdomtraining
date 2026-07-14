import 'preact';

const descriptionHtmlText = String.raw`<p>A List Item Layout represents layout used for list view item elements.</p><p>
  The demo shows how to render leading content within list view using a list view layout component.
</p>
<p>A leading slot can have any one of the following:</p>
<ul>
  <li>badge</li>
  <li>avatar</li>
  <li>image</li>
  <li>icon</li>
  <li>icon circle</li>
</ul>`;

export const listItemLayoutLeadingSlotcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

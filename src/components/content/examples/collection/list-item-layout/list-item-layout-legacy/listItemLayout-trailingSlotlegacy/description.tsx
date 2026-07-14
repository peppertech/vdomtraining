import 'preact';

const descriptionHtmlText = String.raw`<p>A List Item Layout represents layout used for list view item elements.</p><p>
  The demo shows how to render trailing content within list view using a list view layout component.
</p>
A trailing slot can have any one of the following:
<ul>
  <li>badge</li>
  <li>image</li>
  <li>icon</li>
</ul>`;

export const listItemLayoutTrailingSlotlegacyDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

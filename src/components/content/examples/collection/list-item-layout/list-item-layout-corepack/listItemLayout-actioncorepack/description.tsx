import 'preact';

const descriptionHtmlText = String.raw`<p>A List Item Layout represents layout used for list view item elements.</p><p>
  The demo shows how to render action slot content within list view using a list view layout
  component.
</p>

An action slot may contain one of the following components.
<ul>
  <li>button</li>
  <li>menubutton</li>
  <li>buttonset</li>
  <li>toolbar</li>
</ul>

Action has clickthrough disabled by default to stop click propagation.`;

export const listItemLayoutActioncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

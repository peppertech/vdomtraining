import 'preact';

const descriptionHtmlText = String.raw`<p>A collapsible displays a header that can be expanded to show its content.</p>This demo shows the events that are triggered when a collapsible is expanded or collpased.`;

export const collapsibleEventscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

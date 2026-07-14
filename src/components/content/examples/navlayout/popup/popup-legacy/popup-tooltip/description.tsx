import 'preact';

const descriptionHtmlText = String.raw`<p>Pattern demonstrating how the popup component can be used as an accessible tooltip.</p>`;

export const popupTooltipDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

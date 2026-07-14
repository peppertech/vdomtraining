import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramHighlightingDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

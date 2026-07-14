import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramPerformanceDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

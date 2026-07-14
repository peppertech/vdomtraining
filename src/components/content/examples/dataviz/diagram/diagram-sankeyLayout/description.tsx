import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramSankeyLayoutDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

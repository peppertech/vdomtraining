import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramShapedDataDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

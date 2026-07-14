import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramDndSampleDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

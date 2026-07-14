import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramForeignObjectDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

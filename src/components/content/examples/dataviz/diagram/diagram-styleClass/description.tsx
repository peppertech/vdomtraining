import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramStyleClassDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

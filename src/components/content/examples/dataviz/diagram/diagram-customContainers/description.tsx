import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramCustomContainersDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

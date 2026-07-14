import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramContainersDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

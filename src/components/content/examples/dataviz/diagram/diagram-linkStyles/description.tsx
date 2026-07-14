import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramLinkStylesDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

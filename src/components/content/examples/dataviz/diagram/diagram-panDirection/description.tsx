import 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramPanDirectionDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

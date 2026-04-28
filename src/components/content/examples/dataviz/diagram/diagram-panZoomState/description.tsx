import { h } from 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramPanZoomStateDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

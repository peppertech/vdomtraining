import { h } from 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramAnimationsDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

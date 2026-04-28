import { h } from 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramAsynchronousLayoutDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

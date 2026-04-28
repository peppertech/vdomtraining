import { h } from 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramSelectionDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

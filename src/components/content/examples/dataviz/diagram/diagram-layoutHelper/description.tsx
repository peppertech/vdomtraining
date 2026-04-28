import { h } from 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramLayoutHelperDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

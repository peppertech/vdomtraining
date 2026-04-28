import { h } from 'preact';
import * as descriptionHtmlText from 'text!./description.html';

export const diagramContextDnDDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText as string }} />
);

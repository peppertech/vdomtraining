import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A List Item Layout represents layout used for list view item elements.</p>An example of a real world dashboard sample displaying sales and profit by different criteria that
shows the usage of badge. The patterns conveyed in this sample have not as yet been endorsed by the
Redwood Design System.`;

export const listItemLayoutTablecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

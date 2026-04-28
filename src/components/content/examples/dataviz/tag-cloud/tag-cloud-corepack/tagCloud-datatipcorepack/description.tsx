import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A tag cloud is an interactive data visualization of textual data, where the importance of each tagged word or phrase is represented by font size or color.</p><p>
  This tag cloud uses the
  <b><i>datatipTemplate</i></b>
  slot to create a custom datatip containing a meter circle. Hover over the items to display the
  custom datatip.
</p>`;

export const tagCloudDatatipcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

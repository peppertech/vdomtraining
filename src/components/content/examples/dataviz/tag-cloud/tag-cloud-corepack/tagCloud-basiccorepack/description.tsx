import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A tag cloud is an interactive data visualization of textual data, where the importance of each tagged word or phrase is represented by font size or color.</p>This demo shows how to populate an oj-c-tag-cloud element with an MutableArrayDataProvider and the <a target="_blank" href="jsdocs/oj-c.TagCloud.html#itemTemplate">itemTemplate</a> slot. You can increase the performance of this component by using shaped data. See the <a href="#" onclick="demoGoLink(event, 'tagCloudCorepack', 'shapedData'); return false;">Shaped Data demo</a> for details.`;

export const tagCloudBasiccorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A tag cloud is an interactive data visualization of textual data, where the importance of each tagged word or phrase is represented by font size or color.</p>This demo showcases how to create a JET Core Pack Tag Cloud with a dataProvider that contains data that has
already been shaped for the Tag Cloud using the expected data fields. This has significant performance benefits. When using shaped data there is no need to use the <a target="_blank" href="jsdocs/oj-c.TagCloud.html#itemTemplate">itemTemplate</a> slot shown in the <a href="#" onclick="demoGoLink(event, 'tagCloudCorepack', 'basic'); return false;">Basic demo</a>.`;

export const tagCloudShapedDatacorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

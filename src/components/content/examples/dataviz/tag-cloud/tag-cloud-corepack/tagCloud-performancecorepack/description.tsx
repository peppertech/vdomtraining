import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A tag cloud is an interactive data visualization of textual data, where the importance of each tagged word or phrase is represented by font size or color.</p><p>
    Interact with the controls below to experiment with how JET Core Pack Tag Cloud perform when processing
    data sets of different sizes. You can increase the performance of this component by using shaped data. See the <a href="#" onclick="demoGoLink(event, 'tagCloudCorepack', 'shapedData'); return false;">Shaped Data demo</a> for details.
  </p>`;

export const tagCloudPerformancecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

import { h } from "preact";

const descriptionHtmlText = String.raw`<p>An area chart displays information graphically using lines and filled areas, making relationships among the data easier to understand.</p><p>This demo shows how to add various customization to the area chart series, plot area and axes styles.</p>`;

export const areaChartStylescorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

// @ts-nocheck
import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A picto chart is an interactive data visualization of textual data. PictoChart uses icons to visualize an absolute number, or the relative sizes of the different parts of a population.</p><p>
  This demo showcases the picto chart component using as data source a DataProvider that contains
  data that has already been shaped for this components.
</p>`;

export const pictoChartShapedcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

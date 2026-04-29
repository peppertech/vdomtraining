// @ts-nocheck
import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A picto chart is an interactive data visualization of textual data. PictoChart uses icons to visualize an absolute number, or the relative sizes of the different parts of a population.</p><p>
  This demo showcases how all the items in a picto chart can be singletons. This allows for
  customizing individual tooltips and prevents groupings.
</p>`;

export const pictoChartSingletoncorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

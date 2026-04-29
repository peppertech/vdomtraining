// @ts-nocheck
import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A picto chart is an interactive data visualization of textual data. PictoChart uses icons to visualize an absolute number, or the relative sizes of the different parts of a population.</p><p>Picto Chart has two attributes that control its layout:</p>
<ol>
  <li>
    <b>layout:</b>
    Controls the direction in which the items are laid out
  </li>
  <li>
    <b>layout-origin:</b>
    Controls where the first item is rendered and subsequent items follow according to the layout.
  </li>
</ol>`;

export const pictoChartLayoutcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

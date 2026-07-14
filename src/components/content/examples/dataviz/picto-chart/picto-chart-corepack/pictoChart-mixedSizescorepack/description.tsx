// @ts-nocheck
import 'preact';

const descriptionHtmlText = String.raw`<p>A picto chart is an interactive data visualization of textual data. PictoChart uses icons to visualize an absolute number, or the relative sizes of the different parts of a population.</p><p>Picto Chart has two attributes that control the size of its items:</p>

<ol>
  <li>
    <b>row-span:</b>
    Controls the number of rows each icon spans.
  </li>
  <li>
    <b>column-span:</b>
    Controls the number of columns each icon spans.
  </li>
</ol>`;

export const pictoChartMixedSizescorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

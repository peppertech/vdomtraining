import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A legend displays an interactive description of symbols, colors, etc., used in graphical information representations.</p><p>This demo shows how to populate an oj-c-legend element with an MutableArrayDataProvider and the <a target="_blank" href="jsdocs/oj-c.Legend.html#itemTemplate">itemTemplate</a> slot. You can increase the performance of this component by using shaped data. See the <a href="#" onclick="demoGoLink(event, 'legendCorepack', 'shapedData'); return false;">Shaped Data demo</a> for details.</p>
<ul>
  <li>The JET legend icons can display shapes, colors, and images.</li>
  <li>
    There are only so many colors that people can identify from a legend. If you have more than 8 or
    so items that you want to assign colors to, try to organize them so that you can use a series of
    colors in the same hue for related items, or sort them in some meaningful way so that you can
    assign sequential colors. See this <a href="#" onclick="demoGoLink(event, 'chart', 'stackCategory'); return false;">demo</a> for an example.
  </li>
</ul>`;

export const legendDefaultcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

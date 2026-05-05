import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A line chart displays information graphically using data points connected by straight or curved lines, making relationships among the data easier to understand.</p><p>This demo shows line chart data labels can be used to highlight important data points.</p>
<ul>
  <li>
    Valid label position values on line charts are
    <i>'center'</i>
    ,
    <i>'aboveMarker'</i>
    ,
    <i>'belowMarker'</i>
    ,
    <i>'beforeMarker'</i>
    ,and
    <i>'afterMarker'</i>
    .
  </li>
</ul>`;

export const lineChartDataLabelscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

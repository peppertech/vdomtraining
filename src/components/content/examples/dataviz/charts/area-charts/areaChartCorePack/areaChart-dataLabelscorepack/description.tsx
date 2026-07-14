import 'preact';

const descriptionHtmlText = String.raw`<p>An area chart displays information graphically using lines and filled areas, making relationships among the data easier to understand.</p><p>This demo shows area chart data labels can be used to highlight important data points.</p>
<ul>
  <li>
    Valid label position values on area charts are
    <i>'center'</i>,
    <i>'aboveMarker'</i>,
    <i>'belowMarker'</i>,
    <i>'beforeMarker'</i>
    and
    <i>'afterMarker'</i>.
  </li>
</ul>`;

export const areaChartDataLabelscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

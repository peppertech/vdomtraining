import 'preact';

const descriptionHtmlText = String.raw`<p>A Meter circle displays information graphically in a circular bar, highlighting a specific metric value's progress in relation to its min, max, or thresholds.</p><p>This demo shows the JET Core Pack Meter circle.</p>
<ul>
  <li>Meter circle can be readonly or editable.</li>
  <li>
    Meter circle supports the use of reference lines, which can be used for indicating
    thresholds at specific values.
  </li>
  <li>Meter circle supports different shapes like semi circles.</li>
  <li>
    Thresholds can also be indicated by setting the
    <i><b>threshold</b></i>
    object on the component. Consider using thresholds over reference lines to display the range of
    thresholds in the plot area of the Meter circle, or to apply threshold styles to the indicator Meter circle.
  </li>
  <li>
    Meter circle supports turning off the plot area.
  </li>
</ul>`;

export const meterCircleOverviewcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

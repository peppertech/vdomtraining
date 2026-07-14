import 'preact';

const descriptionHtmlText = String.raw`<p>A Meter bar displays information graphically in a rectangular bar, highlighting a specific metric value's progress in relation to its min, max, or thresholds.</p><p>This demo shows the JET Core Pack Meter bar.</p>
<ul>
  <li>Meter bar can be readonly or editable.</li>
  <li>
    Meter bar supports the use of reference lines, which can be used for indicating
    thresholds at specific values.
  </li>
  <li>
    Thresholds can also be indicated by setting the
    <i><b>threshold</b></i>
    object on the component. Consider using thresholds over reference lines to display the range of
    thresholds in the plot area of the Meter bar, or to apply threshold styles to the indicator Meter bar.
  </li>
  <li>
    Meter bar supports turning off the plot area. This use case is normally seen in collection components like table. 
  </li>
</ul>`;

export const meterBarOverviewcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

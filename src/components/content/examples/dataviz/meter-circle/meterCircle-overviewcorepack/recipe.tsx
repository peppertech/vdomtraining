import 'preact';

const recipeHtmlText = String.raw`<ol>
    <li>
      Create a meter circle by using the oj-c-meter-circle tag with the
      <i><b>value</b></i>
      attribute defined.
    </li>
    <li>
      Add reference lines for particular values in plot area using the
      <i><b>reference-lines</b></i>
      attribute. Use <i><b>reference-lines[].color</b></i> to customize the color of the reference-lines, which also supports 'danger', 'warning', 'success' enums.
      Use <i><b>reference-lines[].label</b></i> to provide the label for the reference line.
    </li>
    <li>
      Customize the indicator bar and plot area according to meter circle value using the
      <i><b>thresholds</b></i>
      attribute. Use <i><b>threshold[].color</b></i> to customize the color of the threshold, which also supports 'danger', 'warning', 'success' enums.
    </li>
    <li>
      Create semi-circular meter circle, by using the
      <i><b>angle-extent</b></i>
      attribute or both the
      <i><b>start-angle</b></i>
      and
      <i><b>angle-extent</b></i>
      attributes.
    </li>
    <li><b>Accessibility</b> : If you are using reference lines, readonly or thresholds, you are required to include this information for screen readers to make your component accessible. See the <a href="jsdocs/oj-c.MeterCircle.html#a11y-section">
      <i><b>Accessibility doc</b></i>
    </a> for more details.</li>
  </ol>`;

export const meterCircleOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

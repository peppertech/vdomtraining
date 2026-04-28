import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
    <li>
      Create a meter bar by using the oj-c-meter-bar tag with the
      <i><b>value</b></i>
      attribute defined.
    </li>
    <li>
      Choose a orientation of the bar with
      <i><b>orientation</b></i>
      attribute.
    </li>
    <li>
      Add reference lines for particular values in plot area using the
      <i><b>reference-lines</b></i>
      attribute. Use <i><b>reference-lines[].color</b></i>  to customize the color of the reference-lines, which also supports 'danger', 'warning', 'success' enums.
      Use <i><b>reference-lines[].label</b></i> to provide the label for the reference-line.
    </li>
    <li>
      Customize the indicator bar color according to meter bar value using the
      <i><b>thresholds</b></i>
      attribute.  Use <i><b>threshold[].color</b></i>  to customize the color of the threshold, which also supports 'danger', 'warning', 'success' enums.
    </li>
    <li>
      Customize the baseline of the indicator bar using the
      <i><b>baseline</b></i>
      attribute.
    </li>
    <li><b>Accessibility</b> : If you are using reference lines, thresholds, readonly or custom baseline, you are required to include this information for screen readers to make your component accessible. See the <a href="jsdocs/oj-c.MeterBar.html#a11y-section">
      <i><b>Accessibility doc</b></i>
    </a> for more details.</li>
  </ol>`;

export const meterBarOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

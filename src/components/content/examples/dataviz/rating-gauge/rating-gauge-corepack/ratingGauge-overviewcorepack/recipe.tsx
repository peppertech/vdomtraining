import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a rating gauge by using the oj-c-rating-gauge tag with the
    <i><b>value</b></i>
    attribute defined.
  </li>
  <li>
    To specify a size, use the <a href="jsdocs/oj-c.RatingGauge.html#size">size</a> attribute. sm and md sizes are not recommended for interactive gauges as the touch target sizes are not large enough to meet the accessibility guidelines.
  </li>
  <li>
    To specify a color, use the <a href="jsdocs/oj-c.RatingGauge.html#color">color</a> attribute.
  </li>
  <li>
    To set up tooltips for a read only Rating gauge, use the <a href="jsdocs/oj-c.RatingGauge.html#tooltip">tooltip</a> attribute.
  </li>
  <li>
    To set up datatips for an interactive Rating gauge, use the <a href="jsdocs/oj-c.RatingGauge.html#datatip">datatip</a> attribute.
  </li>
  <li>
    Customize the range of the rating gauge with specific colors and datatip/tooltip using the
    <i><b>thresholds</b></i>
    attribute. There is additional support for these special enum values: danger, warning, and success.
  </li>
  <li><b>Accessibility</b> : If an application is using thresholds, readonly or reference lines, you are required to include this information for screen readers to make your component accessible. See the <a href="jsdocs/oj-c.RatingGauge.html#a11y-section">
    <i><b>Accessibility doc</b></i>
  </a> for more details.</li>
</ol>`;

export const ratingGaugeOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

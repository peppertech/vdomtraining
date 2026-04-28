import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a rating gauge by using the oj-c-rating-gauge tag with the
    <i><b>value</b></i>
    attribute defined.
  </li>
  <li>
    To catch and process events triggered when the value is changed, bind an event listener using the <a href="jsdocs/oj-c.RatingGauge.html#value">on-value-changed</a> attribute.
  </li>
  <li>
    To retrieve the transient-value of the gauge during hover action, read the transient-value attribute of the gauge. See <a href="jsdocs/oj-c.RatingGauge.html#transientValue">transient-value</a> for more detail.
  </li>
  <li>
    To retrieve the changed state of the gauge, read the changed attribute of the gauge. See <a href="jsdocs/oj-c.RatingGauge.html#changed">changed</a> for more detail.
  </li>
</ol>`;

export const ratingGaugeEventscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>
    Create a Meter bar by using the oj-c-meter-bar tag with the
    <i><b>value</b></i>
    attribute defined.
  </li>
  <li>
    To catch and process events triggered when the
    <i><b>value</b></i>
    is changed, bind an event listener using the
    <a href="jsdocs/oj-c.MeterBar.html#value">
      <i><b>on-value-changed</b></i>
    </a>
    attribute.
  </li>
  <li>
    To retrieve the
    <i><b>transient-value</b></i>
    of the Meter bar during hover action, read the
    <i><b>transient-value</b></i>
    property of the Meter bar. See
    <a href="jsdocs/oj-c.MeterBar.html#transientValue">
      <i><b>transient-value</b></i>
    </a>
    for more detail.
  </li>
</ol>`;

export const meterBarEventscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

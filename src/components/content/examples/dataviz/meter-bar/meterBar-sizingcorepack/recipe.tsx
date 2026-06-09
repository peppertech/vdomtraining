import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
    <li>
      Create an oj-c-meter-bar element with a defined
    <b><i>min</i></b>,
    <b><i>max</i></b>
      and/or
    <b><i>value</i></b>
      attribute.
    </li>
    <li>
      Choose the orientation of the gauge with
      <b><i>orientation</i></b>
      attribute.
    </li>
  
    <li>
      Choose one of the theme specified size of the meter bar by setting the
      <i><b>size</b></i>
      attribute to
      <b><i>sm</i></b>,
      <b><i>md</i></b>, or
      <b><i>lg</i></b>.
    </li>
  </ul>`;

export const meterBarSizingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
    <li>
      Create an oj-c-meter-circle element with a defined
      <i><b>min</b></i>,
      <i><b>max</b></i>
      and/or
      <i><b>value</b></i>
      attribute.
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
  
    <li>
      Choose one of the theme specified size of the meter circle by setting the
      <i><b>size</b></i>
      attribute to
      <b><i>sm</i></b>,
      <b><i>md</i></b>, or
      <b><i>lg</i></b>.
    </li>
  </ul>`;

export const meterCircleSizingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

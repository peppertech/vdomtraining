import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    To make tag cloud items link to a website, set the
    <i><b>url</b></i>
    attribute on the oj-c-tag-cloud-item element.
  </li>
</ul>`;

export const tagCloudLinkscorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>See the other Buttonset demos for details on creating these JET components.</li>
  <li>
    Buttonset button widths are as wide as their buttons by default (layout-width=auto),
    but can be set to equal widths using layout-width="equal".
  </li>
  <li>
    Set the max-width (recommended) or width style attributes of the buttonset to control its
    overall width.
  </li>
  <li>
    (Optional) Apply strategies for making the Buttonsets responsive to varying screen sizes. See
    <a href="#" onclick="demoGoLink(event, 'buttonsetsingleCorepack', 'buttonResponsive'); return false;">
      Responsive demo
    </a>
    for more details.
  </li>
</ol>`;

export const buttonsetmultipleButtonsetWidthcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

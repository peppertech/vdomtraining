import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <b>oj-c-tag-cloud</b>
    element.
  </li>
  <li>
    Supply the data items using the
    <i><b>data</b></i>
    attribute. Optionally set the 'data-oj-as' attribute on the template element to set the alias
    for the $current context for individual templates.
  </li>
  <li>
    Add an
    <b>itemTemplate</b>
    slot with
    <b>oj-c-tag-cloud-item</b>
    child element. For more details, see
    <a target="_blank" href="jsdocs/oj-c.TagCloud.html#itemTemplate">itemTemplate</a>
    and
    <a target="_blank" href="jsdocs/oj-c.TagCloudItem.html">oj-c-tag-cloud-item</a>.
  </li>
  <li>
    Change the tag cloud layout using the
    <i><b>layout</b></i>
    attribute.
  </li>
  <li>
    <b>Accessibility</b>: The application is responsible for populating the
    <i><b>short-desc</b></i>
    attribute of the items with meaningful descriptors.
  </li>
</ul>`;

export const tagCloudBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

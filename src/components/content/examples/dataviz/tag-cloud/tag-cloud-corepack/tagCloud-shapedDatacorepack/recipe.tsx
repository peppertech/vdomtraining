import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
    <li>Create an oj-c-tag-cloud element.</li>
    <li>
      Supply the data items using the
      <i><b>data</b></i>
      attribute.
    </li>
    <li>
      The data supplied to the MutableArrayDataProvider should be of shape
      <a target="_blank" href="jsdocs/oj-c.TagCloudItem.html">oj-c-tag-cloud-item</a>.
    </li>
</ol>`;

export const tagCloudShapedDatacorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    <b>Accessibility</b>
    : The application is responsible for populating the
    <i><b>shortDesc</b></i>
    property with meaningful descriptors. Also, when using font colors as a data dimension for tag
    clouds, the application needs to ensure that they meet minimum contrast requirements. Note that
    not all colors in the default value ramp provided by ColorAttributeGroupHandler will meet
    minimum contrast requirements for text.
  </li>
  <li>Create a template element with the slot attribute set to 'datatipTemplate'.</li>
  <li>Populate the template element with the desired HTML content.</li>
  <li>
    Template content will have access to a
    <a target="_blank" href="jsdocs/oj-c.AreaChart.html#DatatipConfig">DatatipConfig</a>
    via the $current property as well as via any data-oj-as alias provided on the template element.
  </li>
  <li>
    Pass the datatipConfig to the tag cloud
    <b><i>datatip-config</i></b>
    attribute. The datatipConfig will allow applications to control the appearance and behavior of the datatip.
  </li>
  <li>
    If additional data is shown in the datatip, the application must also override the item
    <b><i>short-desc</i></b>
    for accessibility users.
  </li>
</ul>`;

export const tagCloudDatatipcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

// @ts-nocheck
import { h } from 'preact';

export const tagCloudLegendRecipe = (
  <>
    <ul>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        {" "}
        <i>
          <b>short-desc</b>
        </i>
        {" "}
        attribute with meaningful descriptors. Also, when using font colors as a data dimension for Tag Clouds, the application needs to ensure that they meet minimum contrast requirements. Note that not all colors in the default value ramp provided by ColorAttributeGroupHandler will meet minimum contrast requirements for text.
      </li>
      <li>Create an oj-legend component and populate its sections and items with information that corresponds to the tag cloud. Use an attribute group handler to set colors on both the tag cloud and legend items</li>
    </ul>
  </>
);

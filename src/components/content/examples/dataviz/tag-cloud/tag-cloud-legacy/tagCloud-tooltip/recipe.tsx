// @ts-nocheck
import { h } from 'preact';

export const tagCloudTooltipRecipe = (
  <>
    <ul>
      <li>
        <b>Accessibility</b>
        : The application is responsible for populating the
        <i>
          <b>shortDesc</b>
        </i>
        property with meaningful descriptors. Also, when using font colors as a data dimension for tag clouds, the application needs to ensure that they meet minimum contrast requirements. Note that not all colors in the default value ramp provided by ColorAttributeGroupHandler will meet minimum contrast requirements for text.
      </li>
      <li>
        Create a tooltip function that takes a
        <i>dataContext</i>
        argument. The
        <i>dataContext</i>
        contains information on the hovered item, including
        <i>id</i>
        ,
        <i>color</i>
        ,
        <i>label</i>
        , and
        <i>value</i>
        . It also contains the tooltip
        <i>parentElement</i>
        , which the function can modify directly. The function should construct and return the desired tooltip string or a DOM element.
      </li>
      <li>
        Pass the function to the tag cloud
        <b>
          <i>tooltip.renderer</i>
        </b>
        attribute. The tag cloud will then call the function on hover to generate the tooltip and append the returned object to itself.
      </li>
      <li>
        If additional data is shown in the tooltip, the application must also override the item
        <b>
          <i>short-desc</i>
        </b>
        for accessibility users.
      </li>
    </ul>
  </>
);

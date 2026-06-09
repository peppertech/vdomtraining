// @ts-nocheck
import { h } from 'preact';

export const tagCloudSelectionRecipe = (
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
        attribute with meaningful descriptors. Also, when using font colors as a data dimension for tag clouds, the application needs to ensure that they meet minimum contrast requirements. Note that not all colors in the default value ramp provided by ColorAttributeGroupHandler will meet minimum contrast requirements for text.
      </li>
      <li>
        Set the
        {" "}
        <i>
          <b>selection-mode</b>
        </i>
        {" "}
        attribute to either
        {" "}
        <i>'none'</i>
        ,
        <i>'single'</i>
        , or
        {" "}
        <i>'multiple'</i>
        .
      </li>
      <li>
        Initialize selected items by passing them to the
        {" "}
        <i>
          <b>selection</b>
        </i>
        {" "}
        attribute.
      </li>
      <li>
        To catch and process the events triggered by the selection/de-selection of a data item, data-binding can be used to set the
        {" "}
        <i>on-selection-changed</i>
        {" "}
        attribute to a selection listener.
      </li>
    </ul>
  </>
);

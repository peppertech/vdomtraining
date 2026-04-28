import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
    <li>
      Set the
      <i><b>selection-mode</b></i>
      attribute to either
      <i>'none'</i>
      ,
      <i>'single'</i>
      , or
      <i>'multiple'</i>
      .
    </li>
    <li>
      Initialize selected items by passing them to the
      <i><b>selection</b></i>
      attribute.
    </li>
    <li>
      To catch and process the events triggered by the selection/de-selection of a data item,
      data-binding can be used to set the
      <i>on-selection-changed</i>
      attribute to a selection listener.
    </li>
    <li>
      <b>Accessibility</b>
      : The application is responsible for populating the
      <i><b>short-desc</b></i>
      attribute of the items with meaningful descriptors. When setting color, applications are responsible for making sure that the color meets the 
      <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum">minimum contrast ratio</a>.
    </li>
</ul>`;

export const tagCloudSelectioncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

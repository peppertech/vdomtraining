// @ts-nocheck
import 'preact';

export const timelineSelectionRecipe = (
  <>
    <ul>
      <li>
        Set the
        {" "}
        <i><b>selection-mode</b></i>
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
        <i><b>selection</b></i>
        {" "}
        attribute.
      </li>
      <li>
        To catch and process events triggered by the selection/de-selection of a data item, you can use
        data-binding to set the
        {" "}
        <i><b>on-selection-changed</b></i>
        {" "}
        attribute to a selection listener. Any attribute changes can be listened to by setting a
        listener using the 'on-[attribute-name]-changed' syntax or programatically on the element using
        the
        {" "}
        <i>element.addEventListener('[attributeName]Changed', function(event) {'{'}...{'}'})</i>
        {" "}
        syntax.
      </li>
    </ul>
  </>
);

// @ts-nocheck
import { h } from 'preact';

export const thematicMapSelectionRecipe = (
  <>
    <ul>
      <li>
        Set the
        <code>selection-mode</code>
        attribute to either
        <i>'single'</i>
        or
        <i>'multiple'</i>
        .
      </li>
      <li>
        Initially select data items by passing their IDs as a JSON Array to the
        <code>selection</code>
        attribute, e.g. selection='["a1", "a2", "a3"]. Note the use of double quotes for the string IDs
        which is required.
      </li>
      <li>
        To catch and process events triggered by the selection/de-selection of a data item, you can use
        data-binding to set the
        <code>on-selection-changed</code>
        attribute to a selection listener. Any attribute changes can be listened to by setting a
        listener using the 'on-[attribute-name]-changed' syntax or programatically on the element using
        the
        <code>element.addEventListener("[propertyName]Changed", function(event){'{'}...{'}'})</code>
        syntax.
      </li>
    </ul>
  </>
);

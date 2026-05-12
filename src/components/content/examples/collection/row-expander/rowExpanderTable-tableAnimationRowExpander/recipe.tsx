// @ts-nocheck
import { h } from 'preact';

export const rowExpanderTableTableAnimationRowExpanderRecipe = (
  <>
    <h4>Custom Add/Remove Animation CSS</h4>

    <p>
      During an add the table will apply
      <code>oj-animate-add</code>
      and then
      <code>oj-animate-add-active</code>
      to the table row. During a remove the table will apply
      <code>oj-animate-remove</code>
      and then
      <code>oj-animate-remove-active</code>
      to the table row. You can create a custom class that works with these to create your own effects,
      see the css below. In this case the root class is named 'demo-custom' which is set on the table
      root dom element.
    </p>

    <h4>Other Actions</h4>
    <p>
      This demo shows customization of the add/remove actions, but there are others that can be
      customized in a similar manner, see the
      <a href={"jsdocs/oj.ojTable.html#animation-section"}>animation section of the table jsdoc</a>
      for a complete list of actions.
    </p>
  </>
);

// @ts-nocheck
import { h } from 'preact';

export const thematicMapSmallFormFactorRecipe = (
  <>
    <ul>
      <li>
        Setting the
        {" "}
        <code>initial-zooming</code>
        {" "}
        attribute to 'auto' sets the initial map zoom to fit the rendered data.
      </li>
      <li>
        To remove the context of the non data areas, the application can isolate on a single data item
        by setting the
        {" "}
        <code>isoalted-item</code>
        {" "}
        attribute to the desired data item's ID.
      </li>
    </ul>
  </>
);

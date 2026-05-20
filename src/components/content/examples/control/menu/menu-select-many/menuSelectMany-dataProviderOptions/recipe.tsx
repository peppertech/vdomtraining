// @ts-nocheck
import { h } from 'preact';

export const menuSelectManyDataProviderOptionsRecipe = (
  <>
    <ol>
      <li>
        Create the menu per the instructions in the
        <a href={"#"}>Menu demo</a>
        .
      </li>
      <li>Place an oj-menu-select-many as the immediate child of the oj-menu.</li>
      <li>Ensure that each menu item is specified using an oj-option element.</li>
      <li>In the view model, create an array with an entry for each menu item.</li>
      <li>
        Bind the array in the
        <a href={"oj.ojMenuSelectMany.html#options"}>options</a>
        attribute of oj-menu-select-many.
      </li>
    </ol>
  </>
);

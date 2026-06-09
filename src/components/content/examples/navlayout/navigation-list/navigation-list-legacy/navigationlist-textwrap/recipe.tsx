// @ts-nocheck
import { h } from 'preact';

export const navigationlistTextwrapRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider with the array data.</li>
      <li>Use the oj-navigation-list tag to create a JET Navigation List.</li>
      <li>
        Use the data attribute to bind an ArrayDataProvider you created previously as data for
        Navigation List.
      </li>
      <li>Use the itemTemplate slot to specify the template for rendering the item.</li>
      <li>
        Add the
        {" "}
        <code className={"prettyprint"}>oj-navigationlist-item-text-wrap</code>
        {" "}
        style class on root node.
      </li>
      <li>
        To handle item selection, bind
        {" "}
        <code className={"prettyprint"}>selection</code>
        {" "}
        attribute to an observable as shown.
      </li>
    </ol>
  </>
);

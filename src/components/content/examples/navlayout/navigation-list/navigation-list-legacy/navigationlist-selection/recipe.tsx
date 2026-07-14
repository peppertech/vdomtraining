// @ts-nocheck
import 'preact';

export const navigationlistSelectionRecipe = (
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
        Bind
        {" "}
        <code className={"prettyprint"}>selection</code>
        {" "}
        to observable to keep track of selected item.
      </li>
      <li>
        If needed, Use
        {" "}
        <code className={"prettyprint"}>on-selection-changed</code>
        {" "}
        listener to perform any action on selection change.
      </li>
    </ol>
  </>
);

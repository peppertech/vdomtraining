// @ts-nocheck
import 'preact';

export const listViewDrillableListViewRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider with an array of data.</li>
      <li>Use the oj-list-view to create a JET ListView.</li>
      <li>Use the data attribute to bind the ArrayDataProvider you created previously as input.</li>
      <li>Use the itemTemplate slot to specify the template to render the item.</li>
      <li>
        Use oj-listview-drill-icon class to render the drill icon. Use flex bar to position the icon as
        desired. See
        {" "}
        <a href={"#"}>flex bar demo</a>
        {" "}
        for details.
      </li>
      <li>Use the on-oj-item-action attribute to register an item action listener.</li>
      <li>Apply the binding as shown at the bottom.</li>
      <li>
        Note that since an item action listener is registered, the item.enter-key-focus-behavior should
        not be set to 'focusWithin' as that could interfere with the item action.
      </li>
      <li>
        Also note that this demo primarily demonstrates the use of the drill icon. Module animation
        should be use to transition between views. See
        {" "}
        <a href={"#"}>
          module animation demo
        </a>
        {" "}
        for details.
      </li>
    </ol>
  </>
);

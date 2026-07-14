// @ts-nocheck
import 'preact';

export const navigationlistNavroutingRecipe = (
  <>
    <p>
      The navigation list has 4 list items, one for each route. Selecting an item updates the route
      parameter and the content of the panel with the value of the route.
    </p>
    <p>
      Using the browser back button, the route parameter will transition back to the previous state, in effect,
      changing the selected list item and the panel content.
    </p>
    <p>
      Pop out the demo in a new window to see how the URL changes with navigation. Notice how the URL
      hash parameter updates to reflect the route.
    </p>
    <div className={"oj-typography-body-xl oj-typography-bold"}>HTML Markup</div>
    <ul>
      <li>Create an oj-navigation-list element with a &lt;template&gt; element.</li>
      <li>
        Define the navigation-list's
        {" "}
        <code className={"prettyprint"}>data</code>
        {" "}
        attribute to to bind to an ArrayDataProvider instance so that it will create a &lt;li&gt; for every
        item in the array.
      </li>
      <li>
        Iterate through the array and use the
        {" "}
        <code className={"prettyprint"}>item.data.path</code>
        {" "}
        and
        {" "}
        <code className={"prettyprint"}>item.data.detail.label</code>
        {" "}
        properties of the Route for the list item.
      </li>
      <li>
        Define the
        {" "}
        <code className={"prettyprint"}>selection</code>
        {" "}
        attribute of the navigation-list to bind to the active route value, enabling the
        navigation-list to be notified of route changes and update its state based on user selection.
      </li>
      <li>
        Define the contents of the panel by creating an &lt;oj-bind-text&gt; element whose value is bound
        to
        {" "}
        <code className={"prettyprint"}>selectedRoute</code>
        {" "}
        to show the current route path, and another bound to the selected route detail
        to show the human-readable label of the route.
      </li>
    </ul>
    <div className={"oj-typography-body-xl oj-typography-bold"}>Script</div>
    <ul>
      <li>Create the route data and define 'dashboard' as the default route.</li>
      <li>
        Create an instance of ArrayDataProvider using the routes as the data set. The
        &lt;oj-navigation-list&gt; template will iterate through this data provider to create the
        individual list items.
      </li>
      <li>Read the route value from the URL hash and store it in component state.</li>
      <li>Listen for hashchange events so browser back and forward update the selected list item.</li>
      <li>Update the hash parameter when the navigation list selection changes.</li>
    </ul>
  </>
);

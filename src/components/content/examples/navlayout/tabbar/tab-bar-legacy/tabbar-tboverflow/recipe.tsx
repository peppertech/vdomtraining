// @ts-nocheck
import { h } from 'preact';

export const tabbarTboverflowRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider with the array data.</li>
      <li>Use the oj-tab-bar tag to create a JET Tabbar.</li>
      <li>
        Use the data attribute to bind the ArrayTableDataProvider you created previously as input.
      </li>
      <li>Use the itemTemplate slot to specify the template for rendering the item.</li>
      <li>Overflow can be handled either using oj-conveyor-belt or a popup menu.</li>
      <li>if conveyorbelt is used, wrap Tab bar in side oj-conveyor-belt as shown below.</li>
      <li>
        if popup menu is used set overflow attribute to
        <code className={"prettyprint"}>popup</code>
        .
      </li>
      <li>
        Ensure that
        <code className={"prettyprint"}>edge</code>
        attribute set to
        <code className={"prettyprint"}>top</code>
        .
      </li>
      <li>
        Ensure that
        <code className={"prettyprint"}>truncation</code>
        attribute set to "progressive" to truncate labels based on available width
      </li>
      <li>
        NOTE: truncation="progressive" should always be used with overflow="popup" for handling overflow
        properly. Progressive truncation does not work when tab bar is placed inside conveyor belt as
        tab bar always gets enough space.
      </li>
    </ol>
    <p>
      Use Tab bar only to toggle between related content sections. To perform any actions on the content
      use
      <a href={"#"}>oj-toolbar</a>
      .
    </p>
  </>
);

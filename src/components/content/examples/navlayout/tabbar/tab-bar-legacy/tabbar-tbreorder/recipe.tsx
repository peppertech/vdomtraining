// @ts-nocheck
import { h } from 'preact';

export const tabbarTbreorderRecipe = (
  <>
    <ol>
      <li>Construct an ArrayTableDataProvider using the JSON data as shown.</li>
      <li>Use the oj-tab-bar tag to create a JET Tabbar.</li>
      <li>
        Use the data attribute to bind the ArrayTableDataProvider you created previously as input.
      </li>
      <li>Use the item.renderer attribute to specify what to render the content inside list item.</li>
      <li>Use the reorderable attribute to enable item reordering.</li>
      <li>
        Use the on-oj-reorder attribute to specify a handler for the reorder event to perform the move
        operation on ArrayTableDataProvider. It is recommended to update a live region upon reordering a
        tab so that the screen reader announces this information. This demo shows a live region that is
        updated in the
        {" "}
        <i><b>on-oj-reorder</b></i>
        {" "}
        handler.
      </li>
    </ol>
    <p>
      Use Tab bar only to toggle between related content sections. To perform any actions on the content
      use
      {" "}
      <a href={"#"}>oj-toolbar</a>
      .
    </p>
  </>
);

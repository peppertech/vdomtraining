// @ts-nocheck
import { h } from 'preact';

export const treeViewCrudRecipe = (
  <>
    <ol>
      <li>
        Construct an
        {" "}
        <code>MutableArrayTreeDataProvider</code>
        {" "}
        as shown. Make sure to specify the
        {" "}
        <code>keyAttributes</code>
        {" "}
        " option.
      </li>
      <li>
        Use the JET binding to create a JET TreeView which uses the MutableArrayTreeDataProvider you
        created previously as input.
      </li>
      <li>Apply the binding as shown at the bottom.</li>
      <li>
        Create 'Add Events' and 'Remove Events' buttons so that users can add/remove event listeners.
      </li>
      <li>Create 'Add Sibling', 'Add Child', 'Remove', and 'Update' buttons to update the tree.</li>
      <li>
        <code>mutate</code>
        {" "}
        event will be triggered whenever data is changed. Call
        {" "}
        <code>valueHasMutated</code>
        {" "}
        will trigger the event
        {" "}
        <code>refresh</code>
        .
      </li>
    </ol>
  </>
);

// @ts-nocheck
import { h } from 'preact';

export const treeViewCrudDescription = (
  <>
    <p>This demo shows what events and user should expect when data is changing.</p>
    <p>
      <code>addEventListener</code>
      {" "}
      and
      {" "}
      <code>removeEventListener</code>
      {" "}
      are two events related methods.
    </p>
    <ul>
      <li>
        <code>addEventListener</code>
        {" "}
        adds a callback function to listen for a specific event type.
      </li>
      <li>
        <code>removeEventListener</code>
        {" "}
        removes a listener previously registered with addEventListener.
      </li>
    </ul>
    <p>
      Events
      {" "}
      <code>mutate</code>
      {" "}
      and
      {" "}
      <code>refresh</code>
      {" "}
      are used to demonstrate the usage of the above two methods.
    </p>
    <p>
      <code>update</code>
      {" "}
      and
      {" "}
      <code>refresh</code>
      {" "}
      events will be fired according to following situations.
    </p>
    <p>
      In this demo, we are using ImmutableTreeDataUtils to update data, user can use other immutable
      libs.
    </p>
    <ol>
      <li>If the two nodes are equal, we are done. There are no changes.</li>
      <li>
        If they are not equal, we fire an ‘update’ mutation. Note that we do not deep-compare the node’s
        properties.
      </li>
      <li>
        We compare the node’s old and new child lists. If the sizes are different, we fire a ‘refresh’
        event with 'parentKey' and do not recurse further
      </li>
      <li>
        If we find more than one child with identity comparison failing, we fire a ‘refresh’ event with
        'parentKey' and do not recurse further
      </li>
      <li>If we find 0 children with identity comparison failing, we do not recurse further</li>
      <li>
        If we find 1 child with identity comparison failing, we recurse into that child and repeat these
        steps from the beginning
      </li>
    </ol>
    <p>
      Click 'Add Events' to add events listener. Select a node. Try to click 'Add Sibling', 'Add Child',
      'Remove' or 'Update'. You will see events are triggered.
    </p>
    <p>
      Click 'Remove Events' to remove events listener. Select a node. Try to click 'Add Sibling', 'Add
      Child', 'Remove' or 'Update'. You will see events are not triggered.
    </p>
    <p>To observe how 'mutate' and 'refresh' events are triggered, we can do the following steps</p>
    <ul>
      <li>Add a sibling to a node by selecting 'News' and clicking 'Add Sibling'</li>
      <li>Remove a node by clicking 'Remove'</li>
      <li>Add a child to a leaf node by selecting 'News' and clicking 'Add Child'</li>
      <li>
        Add a child to a non-leaf node by clicking 'Add Child' again (by now the 'News' already has a
        child)
      </li>
      <li>Update a node without children changes by clicking 'Update' with a new title for 'News'</li>
      <li>Update a node with children changes referring add a child to a leaf node as an example</li>
    </ul>
  </>
);

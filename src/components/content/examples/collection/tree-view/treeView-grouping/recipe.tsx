import { h } from 'preact';

export const treeViewGroupingRecipe = (
  <>
    <ol>
      <li>
        Create an oj-tree-view element and assign it a meaningful ID and specify required properties on
        the oj-tree-view.
      </li>
      <li>
        Construct a ArrayTreeDataProvider using a flat array and by specifying a groupStrategy, in order
        to make it suitable for display in the TreeView component.
      </li>
      <li>
        Configure dragHandlers to specifically disallow dragEnters, dragOvers and dragLeaves on parent
        nodes, as well as setting the dataTransfer effects to 'none' in order to show user this is not a
        valid drop.
      </li>
      <li>
        Configure a dropHandler where dropping nodes updates the flatArray, ensuring the data remains in
        a consistent order.
      </li>
      <li>Use an itemTemplate to render the contents of the items.</li>
    </ol>
  </>
);

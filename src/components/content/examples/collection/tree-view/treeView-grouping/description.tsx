import { h } from 'preact';

export const treeViewGroupingDescription = (
  <>
    <p>A tree view displays hierarchical relationships between items.</p>
    <p>
      This demo shows how to set up a TreeView with grouped data that can be dynamically
      updated via drag and drop. Here, drag-and-drop and cut-and-paste actions only allow
      the re-ordering of the flat list of innermost leaf nodes. These actions then create
      hierarchical data that is grouped based on node&apos;s internal attributes. When nodes
      are moved, new groups are created or existing ones are updated based on the attributes
      of their neighboring nodes. For Example:
    </p>
    <ol>
      <li>
        Drag
        <strong>2023_Q1_Feb</strong>
        between
        <strong>2023_Q1_Jan</strong>
        and
        <strong>2023_Q1_Mar</strong>
        . This action will merge all three nodes under a single
        <strong>2023_Q1</strong>
        group.
      </li>
      <li>
        Drag
        <strong>2023_Q1_Feb</strong>
        back between
        <strong>2023_Q2_May</strong>
        and
        <strong>2023_Q2_Jun</strong>
        . This will split the
        <strong>2023_Q2</strong>
        group into two separate groups: one for
        <strong>2023_Q2_Apr</strong>
        ,{' '}
        <strong>2023_Q2_May</strong>
        , and one for
        <strong>2023_Q2_Jun</strong>
        .
      </li>
    </ol>
    <p>
      By experimenting with these actions, you can see how the data source is expected to update and
      reorganize based on the drag and drop attributes, and how the TreeView responds to those changes.
    </p>
  </>
);

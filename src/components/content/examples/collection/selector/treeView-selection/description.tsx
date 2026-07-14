import 'preact';

export const treeViewSelectionDescription = (
  <>
    <p>A tree view displays hierarchical relationships between items.</p>
    <p>This demo shows the following tree view features:</p>
    <br />
    <ul>
      <li>Single selection</li>
      <li>Multiple Selection</li>
      <li>Multiple Toggle Selection</li>
      <li>Leaf Only Selection</li>
      <li>Leaf Only Toggle Selection</li>
      <li>No Selection</li>
      <li>Switching of selection-mode using external control</li>
    </ul>

    <p>
      <b>Multiple vs Multiple Toggle Selection</b>
    </p>

    <ul>
      <li>
        Multiple Selection - When specified, most selection gestures made on the TreeView will be
        interpreted as &apos;replace&apos; gestures. For example, clicking on an already selected
        item will not affect that item&apos;s selection, and clicking on a non-selected item will
        select that item and deselect any other previously selected items. In order to perform
        additive selections, users can click on selector checkboxes, use spacebar, or ctrl/cmd
        click on individual items to perform &apos;toggle&apos; selection gestures.
      </li>
      <li>
        Multiple Toggle Selection - When specified, all selection gestures made on the TreeView
        will be interpreted as &apos;toggle&apos; gestures. For example, clicking on an already
        selected item will deselect that item, and clicking on any non-selected item will select
        that item without affecting any previously selected items.
      </li>
    </ul>

    <p>
      <b>Leaf Only vs Leaf Only Toggle Selection</b>
    </p>

    <ul>
      <li>
        Leaf Only Selection - When specified, most selection gestures made on the TreeView will be
        interpreted as 'replace' gestures, and children items control the parent's selection state.
      </li>
      <li>
        Leaf Only Toggle Selection - When specified, all selection gestures made on the TreeView
        will be interpreted as &apos;toggle&apos; gestures, and children items control the
        parent&apos;s selection state.
      </li>
    </ul>
  </>
);

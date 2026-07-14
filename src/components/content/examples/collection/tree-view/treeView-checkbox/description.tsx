import 'preact';

export const treeViewCheckboxDescription = (
  <>
    <p>A tree view displays hierarchical relationships between items.</p>
    <p>
      This demo shows how to create a checkbox tree using treeView item template. The
      selection states of the items are cascaded, which means that:
    </p>

    <ul>
      <li>If a parent item is selected, then all the descendants will be selected automatically.</li>
      <li>
        If a parent item is unselected, then all the descendants will be unselected automatically.
      </li>
      <li>
        If a parent item has a mixture of selected and unselected descendants, and redwood is enabled
        then it will display a partially selected state.
      </li>
    </ul>

    <p>
      Note: In order to compute the selection, in selectionMode <code>leafOnly</code> the
      treeview will trigger continuous fetches until it has the complete data set. We do not
      recommend using this mode with large data sets and currently mutations are not supported
      in this mode.
    </p>
  </>
);

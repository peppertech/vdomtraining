import { h } from 'preact';

export const treeViewContextMenuRecipe = (
  <>
    <ul>
      <li>
        To trigger a context menu on TreeView items, create an oj-menu element as a child of
        oj-tree-view element.
      </li>
      <li>Specifies a slot attribute with value 'contextMenu' on the oj-menu element.</li>
      <li>
        Use the
        <code>getContextByNode</code>
        method to determine the object that triggered the context menu. The structure of the returned
        context object is described in the
        {' '}
        <a href={"/jsdocs/oj.ojTreeView.html#getContextByNode"}>jsDoc</a>.
      </li>
      <li>
        Store the key returned by
        <code>getContextByNode</code>
        .
      </li>
      <li>
        Call
        <code>fetchByKeys</code>
        to get the data relevant to that key.
      </li>
    </ul>
  </>
);

// @ts-nocheck
import { h } from 'preact';

export const treeViewIconsRecipe = (
  <>
    <ol>
      <li>
        Create an oj-tree-view element and assign it a meaningful ID and specify properties on the
        oj-tree-view.
      </li>
      <li>
        Construct the tree using a predefined HTML unordered list (ul) structure in the oj-tree-view
        element. Refer to the API doc for details on how to specify an HTML TreeView definition as well
        as other configuration options.
      </li>
      <li>
        Pass the desired tree view icon type directly either through the static HTML or through the
        {" "}
        <a href={"/jsdocs/oj.ojTreeView.html#item.renderer"}>item.renderer</a>
        .
      </li>
    </ol>
  </>
);

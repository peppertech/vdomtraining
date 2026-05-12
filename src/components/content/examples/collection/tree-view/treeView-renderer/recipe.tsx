import { h } from 'preact';

export const treeViewRendererRecipe = (
  <>
    <ol>
      <li>
        Create an oj-tree-view element and assign it a meaningful ID and specify properties on the
        oj-tree-view.
      </li>
      <li>
        Construct either a ArrayTreeDataProvider or a CollectionTreeDataSource and specify it through
        the
        <b><i>data</i></b>
        attribute.
      </li>
      <li>
        Use the
        <a href={"/jsdocs/oj.ojTreeView.html#item.renderer"}>item.renderer</a>
        attribute and the
        <b><i>KnockoutTemplateUtils.getRenderer</i></b>
        helper method to reference the knockout template that you want to use to render the content
        inside tree items.
      </li>
    </ol>
  </>
);

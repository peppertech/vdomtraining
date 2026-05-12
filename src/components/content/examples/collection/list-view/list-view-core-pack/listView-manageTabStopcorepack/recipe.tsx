import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'listViewCorepack', 'basic'); return false;">
      basic oj-c-list-view demo
    </a>
    for more information about configuring oj-c-list-view.  
  </li>
  <li>
    In the item template, use the isTabbable property from item context to determine the correct tabindex for the anchor element.
  </li>
  <li>
    Add the <code>data-oj-manage-tabs</code> attribute on <code>demo-responsive-buttonset</code> as it contains focusable elements which the application has no control of.
    <ul>
      <li>
        All core pack components (<code>oj-c-button</code> used in this demo) handle tabindex within <code>oj-c-list-view</code> automatically.
      </li>
    </ul>
  </li>  
</ul>`;

export const listViewManageTabStopcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

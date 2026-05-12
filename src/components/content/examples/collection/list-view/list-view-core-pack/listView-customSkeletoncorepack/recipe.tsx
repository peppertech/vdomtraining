import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'listViewCorepack', 'progressiveLoading'); return false;">
      progressive loading oj-c-list-view demo
    </a>
    for more information about configuring oj-c-list-view.  
  </li>
  <li>
    Use the
    <code class="prettyprint">skeletonTemplate</code>
    slot to specify the template for rendering each skeleton.
  </li>
  <li>
      Use the
      <code class="prettyprint">oj-c-list-item-layout</code>
      and the 
      <code class="prettyprint">oj-c-skeleton</code>
      to construct the custom skeleton for each item and put that inside the skeletonTemplate slot.
  </li>
  <li>
    The 
    <code class="prettyprint">context</code>
    contains a loadingStatus field with two possible values: 
    <code class="prettyprint">'initial'</code>
    and
    <code class="prettyprint">'loadMore'</code>. 
  </li>
  <li>
    The value is 
    <code class="prettyprint">'initial'</code>
    when ListView renders the skeletons during initial data fetch. 
  </li>
  <li>
    The value is 
    <code class="prettyprint">'loadMore'</code>
    when ListView renders the skeletons at the bottom as the user scrolls down to fetch more data.
  </li>
  <li>
    The 
    <code class="prettyprint">context</code>
    contains an index field, which allows applications to specify different skeleton based on the position relative to the list.
  </li>
</ul>`;

export const listViewCustomSkeletoncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

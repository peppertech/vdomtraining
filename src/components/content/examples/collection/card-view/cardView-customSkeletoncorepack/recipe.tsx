import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'cardViewCorepack', 'progressiveLoading'); return false;">
      progressive loading oj-c-card-view demo
    </a>
    for more information about configuring a progressive loading oj-c-card-view.
  </li>
    <li>
      Use the
      <code class="prettyprint">skeletonTemplate</code>
      slot to specify the template for rendering each skeleton.
    </li>
    <li>
        Use the
        <code class="prettyprint">oj-panel</code>
        and
        <code class="prettyprint">oj-sm-padding-0</code>
        to construct the card and put that inside the skeletonTemplate slot.
    </li>
    <li>
      Use the
      <code class="prettyprint">oj-c-skeleton</code>
      to construct the custom skeleton for each skeleton card.
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
      when CardView renders the skeletons during initial data fetch. It is recommended that applications specifies a size for the skeleton cards to closely match the actual size as much as possible
    </li>
    <li>
      The value is 
      <code class="prettyprint">'loadMore'</code>
      when CardView renders the skeletons at the bottom as the user scrolls down to fetch more data. The context also includes the width and height of the actual card which applications can optionally use to size the skeleton card.  This is to ensure the size of the skeleton cards match the actual size of the card to avoid layout issues.
    </li>
  </ul>`;

export const cardViewCustomSkeletoncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

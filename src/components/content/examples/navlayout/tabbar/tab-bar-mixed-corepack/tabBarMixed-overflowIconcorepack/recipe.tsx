import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tabBarMixedCorepack', 'basic'); return false;">
      basic oj-c-tab-bar-mixed demo
    </a>
    for more information about configuring remove and selection attribute in oj-c-tab-bar-mixed.
    </li>
  <li>Use the <code class="prettyprint">dynamic-tabs-overflow-icon</code> attribute to specify the icon used for the overflow menu.</li>
</ul>`;

export const tabBarMixedOverflowIconcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

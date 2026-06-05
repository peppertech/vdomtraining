import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tabBarMixedCorepack', 'basic'); return false;">
      basic oj-c-tab-bar-mixed demo
    </a>
    for more information about configuring remove and selection attribute in oj-c-tab-bar-mixed.
    </li>
  <li>Use the <code class="prettyprint">on-oj-selection-action</code> attribute to register a listener to handle when a tab is selected or re-selected.</li>
  <li>Note that if you do not need to handle re-selection, you can also use the <code class="prettyprint">on-selection-changed</code> instead.</li>
</ul>`;

export const tabBarMixedSelectioncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

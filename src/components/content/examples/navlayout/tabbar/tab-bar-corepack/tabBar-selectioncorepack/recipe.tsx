import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
    <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tabBarCorepack', 'basic'); return false;">
      basic oj-c-tab-bar demo
    </a>
    for more information about configuring oj-c-tab-bar.
    </li>
    <li>Bind <code class="prettyprint">selection</code> to an observable to keep track of the selected tab.</li>
    <li>Use the <code class="prettyprint">on-oj-selection-action</code> attribute to register a listener to handle when a tab is selected or re-selected.</li>
    <li>Note that if you do not need to handle re-selection, you can also use the <code class="prettyprint">on-selection-changed</code> instead.</li>
  </ul>`;

export const tabBarSelectioncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

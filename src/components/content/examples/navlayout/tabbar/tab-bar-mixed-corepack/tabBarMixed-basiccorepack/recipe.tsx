import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-tab-bar-mixed</code>
    element.
  </li>
  <li>Use the <code class="prettyprint">static-tabs</code> and <code class="prettyprint">dynamic-tabs</code> attributes to specify static tabs and dynamic tabs respectively.</li>
  <li>Use the <code class="prettyprint">on-oj-remove attribute</code> to register a listener to handle when a tab is removed.</li>
  <li>Bind <code class="prettyprint">selection</code> to an observable to keep track of the selected tab.</li>
  <li>Use the <code class="prettyprint">static-tabs-display</code> attribute to specify whether to show the static tabs as icons with text or just icons.</li>
  <li>Use the <code class="prettyprint">size</code> attribute to specify the size of oj-c-tab-bar-mixed.</li>
  <li>Use the <code class="prettyprint">dynamic-tabs-overflow</code> attribute to specify whether a conveyor belt or a popup should be used to handle overflow tabs.</li>
</ul>`;

export const tabBarMixedBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

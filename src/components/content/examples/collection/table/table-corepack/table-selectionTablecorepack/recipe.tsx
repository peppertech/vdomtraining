import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tableCorepack', 'basicTable'); return false;">
      basic oj-c-table demo
    </a>
    for more information about configuring a basic oj-c-table.
  </li>
  <li>
    Create a <code class="prettyprint">MutableArrayDataProvider</code> to capture different selection modes and use it as data for
    <code class="prettyprint"></code>oj-c-select-single</code> component which is used to switch selection mode.
  </li>
  <li>Set the <code class="prettyprint">selection-mode</code> to control row and column selection.</li>
  <li>Register an event handler for <code class="prettyprint">selectedChanged</code> event.</li>
  <li>
    To get data from selected rows use fetchByKeys on the dataprovder as shown in the
    <a href="#" onclick="demoGoLink(event, 'home', 'rootFramework_childDataProvider'); return false;">
    data provider demo.
    </a>
  </li>

</ul>`;

export const tableSelectionTablecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

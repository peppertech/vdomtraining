import 'preact';

const recipeHtmlText = String.raw`<p>
    The tab bar has 4 tabs, one for each route in the demo. Selecting a tab updates the route and
    the panel content to match the selected route.
  </p>
  <p>
    Using the browser back button transitions back to the previous route, updating both the selected
    tab and the panel content.
  </p>
  <p>
    Pop out the demo in a new window to see how the URL path changes with navigation.
  </p>
  <div class="oj-typography-body-xl oj-typography-bold">HTML Markup</div>
  <ul>
    <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tabBarCorepack', 'basic'); return false;">
      basic oj-c-tab-bar demo
    </a>
    for more information about configuring oj-c-tab-bar.
    </li>
    <li>
      Define the <code class="prettyprint">selection</code> attribute from route state so the
      tab-bar reflects the active route.
    </li>
    <li>
      Navigate to the matching path in the tab-bar selection changed handler.
    </li>
    <li>
      Define the contents of the panel from the active route to show the current path and route label.
    </li>
    <li>
      Ensure that the content can be reached through keyboard by setting the
      <code class="prettyprint">tabindex</code>.
    </li>
  </ul>
  <div class="oj-typography-body-xl oj-typography-bold">Script</div>
  <ul>
    <li>Create a Preact component which imports the dependent modules in use.</li>
    <li>Define the tab data array that represents each route.</li>
    <li>Use path-based routing state to initialize and update the selected tab.</li>
    <li>Use browser history navigation so back and forward buttons restore the matching tab.</li>
  </ul>`;

export const tabBarRoutingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

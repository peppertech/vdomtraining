import { h } from "preact";

const recipeHtmlText = String.raw`<p>
    The tabbar has 4 tabs, one for each state of the router. Selecting a tab in the bar will
    transition the router to the matching state and update the content of the panel with the value of
    the state.
  </p>
  <p>
    Using the browser back button, the router will transition back to the previous state, in effect,
    changing the selected tab and the panel content.
  </p>
  <p>
    Pop out the demo in a new window to see how the URL changes with navigation. Notice how the URL
    parameter ojr updates to reflect the state of the router.
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
      Create a CoreRouter instance and pass the routes data to it.
    </li>
    <li>
      Define the
      <code class="prettyprint">selection</code>
      attribute of the tab-bar to two-way bind to the
      <code class="prettyprint">selection.path</code>
      value, enabling the tab-bar to be notified of Router state changes, and direct the its state
      based on user selection.
    </li>
    <li>
      Define the contents of the panel by creating an &lt;oj-bind-text> element whose value is bound
      to
      <code class="prettyprint">selection.path</code>
      to show the current Router path, and another bound to
      <code class="prettyprint">selection.state().detail.label</code>
      to show the human-readable label of the route.
    </li>
    <li>
      Ensure that the content can be reached through keyboard by setting the
      <code class="prettyprint">tabindex</code>
      .
    </li>
  </ul>
  <div class="oj-typography-body-xl oj-typography-bold">Script</div>
  <ul>
    <li>Create a viewmodel which imports the dependent modules in use.</li>
    <li>
      Create the router root instance and configure it.
      <ul>
        <li>The router is configured with 5 states and 'dashboard' is the default state.</li>
        <li>The first state is a "redirect" state, which defines the default route.</li>
      </ul>
    </li>
    <li>Create an oj-c-tab-bar element.</li>
    <li>Use the 
        <code class="prettyprint">data</code> 
        attribute to specify the data array that represents information about each tab.
    </li>
    <li>
      Create an instance of KnockoutRouterAdapter to allow the tab-bar to receive updates to the
      Router state as well as change the state based on user selection.
    </li>
    <li>Synchronize the router so that its state matches the URL.</li>
    <li>Once the document is ready, bind the viewModel to the element containing the demo.</li>
  </ul>`;

export const tabBarRoutingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

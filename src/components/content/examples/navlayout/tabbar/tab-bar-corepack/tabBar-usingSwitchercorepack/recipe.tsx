import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
    <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tabBarCorepack', 'basic'); return false;">
      basic oj-c-tab-bar demo
    </a>
    for more information about configuring oj-c-tab-bar.
    </li>
    <li>
        Ensure that
        <code class="prettyprint">tabPanelId</code>
        is added to data for each item.
    </li>
    <li>
        Create a TabBar component with
        <code class="prettyprint">oj-c-tab-bar</code>    
      </li>
    <li>
      Use the data attribute to bind the TabData you created previously as input.
    </li>
    <li>
        To handle item selection, bind
        <code>selection</code>
        attribute to an observable as shown.
    </li>
    <li>
      If needed,
      <code class="prettyprint">edge</code>
      property can be changed based on position of the content.
    </li>
    <li>Create a oj-switcher wrapping child elements.</li>
    <li>
      Ensure that each child elements has non empty value for
      <code class="prettyprint">slot</code>,
      <code class="prettyprint">id</code> and
      <code class="prettyprint">role</code> set with the value tabPanel
    </li>
  </ol>`;

export const tabBarUsingSwitchercorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

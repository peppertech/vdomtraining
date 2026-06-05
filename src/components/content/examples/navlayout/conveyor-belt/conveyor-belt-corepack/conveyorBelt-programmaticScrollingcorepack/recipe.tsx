import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    Please see the
    <a
      href="#"
      onclick="demoGoLink(event, 'conveyorBelt', 'horizontalConveyorBelt'); return false;">
      basic conveyor belt demo
    </a>
    for more information about configuring a basic conveyor belt.
  </li>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tabbar', 'tbbasic'); return false;">
      basic tab bar demo
    </a>
    for more information about configuring a basic tab bar.
  </li>
  <li>
    Use
    <code class="prettyprint">oj-tab-bar</code>
    component wrapped inside
    <code class="prettyprint">oj-c-conveyor-belt</code>
  </li>
  <li>
    Use
    <code class="prettyprint">data</code>
    attribute to bind to a data provider.
  </li>
  <li>
    Use
    <code class="prettyprint">oj-c-select-single</code>
    component to select a tab in the tabbar
  </li>
  <li>
    Set
    <code class="prettyprint">value</code>
    attribute of the
    <code class="prettyprint">oj-c-select-single</code>
    and
    <code class="prettyprint">selection</code>
    attribute of the
    <code class="prettyprint">oj-tab-bar</code>
    to
    <code class="prettyprint">selectedItem</code>
  </li>
  <li>
    In
    <code class="prettyprint">oj-tab-bar</code>
    's selection change listener invoke the conveyorBelt's method
    <code class="prettyprint">scrollElementIntoView</code>
  </li>
</ol>`;

export const conveyorBeltProgrammaticScrollingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

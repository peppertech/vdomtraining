import { h } from "preact";

const recipeHtmlText = String.raw`<ul>
  <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tabBarMixedCorepack', 'basic'); return false;">
      basic oj-c-tab-bar-mixed demo
    </a>
    for more information about configuring remove, selection, size, padding, dynamic overflow and display attribute in oj-c-tab-bar-mixed.
    </li>
  <li>Use the <code class="prettyprint">ResponsiveKnockoutUtils</code> utility function to create an observable that responds to screen size changes.</li>
  <li>When the screen size is small:
    <ul>
      <li>Change the dynamic-tabs-overflow value to <code>popup</code>.</li>
      <li>Change the static-tabs-display value to <code>icons</code>.</li>
      <li>Change the separator-padding value to 0.</li>
      <li>Change the size value to <code>md</code>.</li>
    </ul>
  </li>
  <li>When the screen size is medium:
    <ul>
      <li>Change the dynamic-tabs-overflow value to <code>conveyor</code>.</li>
      <li>Change the static-tabs-display value to <code>icons</code>.</li>
      <li>Change the separator-padding value to 2rem.</li>
      <li>Change the size value to <code>lg</code>.</li>
    </ul>
  </li>
  <li>When the screen size is large:
    <ul>
      <li>Change the dynamic-tabs-overflow value to <code>conveyor</code>.</li>
      <li>Change the static-tabs-display value to <code>standard</code>.</li>
      <li>Change the separator-padding value to 3rem.</li>
      <li>Change the size value to <code>lg</code>.</li>
    </ul>
  </li>
</ul>`;

export const tabBarMixedResponsivecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

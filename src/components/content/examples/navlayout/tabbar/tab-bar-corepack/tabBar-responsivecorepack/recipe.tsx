import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
    <li>
    Please see the
    <a href="#" onclick="demoGoLink(event, 'tabBarCorepack', 'selection'); return false;">
      selection oj-c-tab-bar demo
    </a>
    for more information about configurating selection in oj-c-tab-bar.
    </li>
    <li>Use the ResponsiveKnockoutUtils utility function to create an observable that responds to screen size changes.</li>
    <li>When the screen size is small:
        <ul>
          <li>Change the layout value to <code>condense</code>.</li>
          <li>Change the display value to <code>icons</code>.</li>
        </ul>
      </li>
    <li>When the screen size is medium:
        <ul>
        <li>Change the layout value to <code>condense</code>.</li>
          <li>Change the display value to <code>standard</code>.</li>
        </ul>
    </li>
    <li>When the screen size is large:
      <ul>
      <li>Change the layout value to <code>stretch</code>.</li>
        <li>Change the display value to <code>standard</code>.</li>
      </ul>
  </li>
</ol>`;

export const tabBarResponsivecorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

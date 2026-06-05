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
      Ensure that the href has a value in the data for each item so that it is possible to navigate the hyperlink. If there is no external URL use "#" for href value.
    </li>
    <li>To see how to associate content with the selected tabbar item see the<a href="#" onclick="demoGoLink(event, 'tabBarCorepack', 'routing'); return false;">
      oj-c-tab-bar routing demo.
    </a>
    </li>
  </ol>`;

export const tabBarLinkcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

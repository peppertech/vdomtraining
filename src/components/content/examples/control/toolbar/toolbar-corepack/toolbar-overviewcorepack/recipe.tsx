import { h } from "preact";

const recipeHtmlText = String.raw`<p>Toolbar:</p>
<ol>
  <li>
    Create a JET Toolbar by specifying the
    <code class="prettyprint">&lt;oj-c-toolbar></code>
    element. (Hereafter called the "toolbar element.")
  </li>
  <li>
    If multiple toolbars are present, apply an
    <code class="prettyprint">aria-label</code>
    to each toolbar element. (This is optional when only one toolbar is present, as shown here.)
  </li>
</ol>
<p>
  Toolbar uses a data-driven approach to provide the following supported content, using the
  <code class="prettyprint">items</code>
  attribute:
</p>
<ol>
  <li>Buttons and Icon Buttons</li>
  <li>Menu Buttons</li>
  <li>Split Menu Buttons</li>
  <li>Buttonsets</li>
  <li>Toggle Buttons</li>
  <li>Progress Buttons</li>
  <li>Separators</li>
</ol>`;

export const toolbarOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

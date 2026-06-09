import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>
    See the
    <a href="#" onclick="demoGoLink(event, 'buttonsetsingleCorepack', 'basic'); return false;">
      Buttonset Single demo
    </a>
    for details on creating this component.
  </li>
  <li>
    Add an
    <code class="prettyprint">oj-label</code>
    to define the label text and optional
    <code class="prettyprint">help.definition</code>.
  </li>
  <li>
    Set the
    <code class="prettyprint">aria-labelledby</code>
    attribute on the buttonset to associate it with an accessible label and help definition.
  </li>
</ol>`;

export const buttonsetsingleLabelledButtonsetcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

import { h } from "preact";

const recipeHtmlText = String.raw`<ol>
  <li>Create any kind of JET Button, per the instructions in the corresponding Button demo.</li>
  <li>
    Set the
    <code class="prettyprint">chroming</code>
    attribute on the button or (if present) the containing toolbar.
  </li>
  <li>
    Valid chroming values are
    <code class="prettyprint">"ghost"</code>,
    <code class="prettyprint">"borderless"</code>,
    <code class="prettyprint">"outlined"</code>,
    <code class="prettyprint">"solid"</code>,
    <code class="prettyprint">"callToAction"</code>, and
    <code class="prettyprint">"danger"</code>. The default value varies by theme, as discussed in the
    <a href="jsdocs/oj.ojButton.html#chroming">Button Chroming</a>
    section in the API doc.
  </li>
  <li>
    For menu button in the Redwood theme, when there is no start slot and
    <code class="prettyprint">"display='icons'"</code>, the icon will change to three dots.
  </li>
</ol>`;

export const buttonsChromingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

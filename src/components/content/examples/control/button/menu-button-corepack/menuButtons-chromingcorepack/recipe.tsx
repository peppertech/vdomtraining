import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>Create any kind of Core Pack JET Button, per the instructions in the corresponding Button demo.</li>
  <li>
    Set the
    <code class="prettyprint">chroming</code>
    attribute on the button.
  </li>
  <li>
    Chroming values shown here are
    <code class="prettyprint">"ghost"</code>,
    <code class="prettyprint">"borderless"</code>,
    <code class="prettyprint">"outlined"</code>,
    <code class="prettyprint">"solid"</code>,
    <code class="prettyprint">"callToAction"</code>, and
    <code class="prettyprint">"danger"</code>.
  </li>
  <li>
    Unsupported button/chroming combinations are shown as not applicable.
  </li>
  <li>
    For menu buttons in the Redwood theme, when there is no start slot and
    <code class="prettyprint">display="icons"</code>, the icon changes to three dots.
  </li>
</ol>`;

export const menuButtonsChromingcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

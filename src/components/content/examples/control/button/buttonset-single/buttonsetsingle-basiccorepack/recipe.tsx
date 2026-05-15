import { h } from "preact";

const recipeHtmlText = String.raw`<p>Buttonset:</p>
<ol>
  <li>
    Create a JET Buttonset element such as a
    <code class="prettyprint">&lt;oj-c-buttonset-single></code>
    as shown.
  </li>
  <li>
    Apply
    <code class="prettyprint">aria-label</code>
    and/or
    <code class="prettyprint">aria-controls</code>
    attributes to the buttonset as needed, as discussed in the API doc. If the buttonset is
    contained in a toolbar,
    <code class="prettyprint">aria-controls</code>
    should be placed on the toolbar, not on the buttonsets within the toolbar.
  </li>
  <li>
    Apply an explicit width and/or layout-width override property to the Buttonset if needed. See the
    <a href="#" onclick="demoGoLink(event, 'buttonsetone', 'buttonsetWidth'); return false;">
      Buttonset Width demo
    </a>
    for details.
  </li>
</ol>

<p>Buttonset Value state:</p>
<ol>
  <li>
    Use the
    <code class="prettyprint">value</code>
    attribute as shown.
  </li>
  <li>
    It is often unnecessary to listen for the
    <code class="prettyprint">valueChange</code>
    event, since the 2-way
    <code class="prettyprint">value</code>
    binding updates the bound observable on every change, as seen in this demo. The declarative
    binding is often preferable to an explicit listener.
  </li>
  <li>
    A click listener should not be used to detect changes to the
    <code class="prettyprint">value</code>
    attribute. Use the
    <code class="prettyprint">value</code>
    attribute and/or the
    <code class="prettyprint">valueChange</code>
    event instead.
  </li>
</ol>

<p>Buttons:</p>
<ol>
  <li>
    Specify each button in the buttonset items property.
  </li>
</ol>`;

export const buttonsetsingleBasiccorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

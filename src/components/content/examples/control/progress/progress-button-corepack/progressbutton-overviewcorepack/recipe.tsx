import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Use the  
    <code class="prettyprint">label</code>
    attribute to specify the button label.
  </li>
  <li>
    Use
    <code class="prettyprint">display</code>
    attribute and
    <code class="prettyprint">slots</code>
    to create Icon button. 
    <ul>
      <li>Note that the icon-only button displays the label in a tooltip.</li>
    </ul>
  </li>
  <li>Use the 
    <code class="prettyprint">is-loading</code>
    attribute to show progress.  The on-oj-action handler can set is-loading 
    to indicate progress as shown in the examples.</li>
  <ul>
    <li>In this demo, for simplicity, a single loading variable is used for all progress buttons.</li>
  </ul>
  <li>
    Use
    <code class="prettyprint">disabled</code>
    attribute to disable button.
    <code>oj-c-progress-button</code>
    is enabled by default, set
    <code>disabled</code>
    for disabled button.
  </li>
  <li>
    Use
    <code class="prettyprint">chroming</code>
    attribute to define button chroming value. 
    <ul>
      <li>chroming value works for Icon button in the same way.</li>
    </ul>
  </li>
  <li>
    Use the size property to modify the size of the button.
  </li>
  <li>
    Use the width property to modify the width of the button.
  </li>
  <li>
    Use the tooltip property to specify the tooltip of the button.
  </li>
</ul>`;

export const progressbuttonOverviewcorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

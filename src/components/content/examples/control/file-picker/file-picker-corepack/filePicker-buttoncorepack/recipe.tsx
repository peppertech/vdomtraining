import 'preact';

const recipeHtmlText = String.raw`<ul>
  <li>
    Create an
    <code class="prettyprint">oj-c-button</code>
    element.
  </li>
  <li>
    In the button's
    <a href="jsdocs/oj-c.Button.html#event:ojAction">ojAction</a>
    event listener, call the
    <a href="jsdocs/ojfilepickerutils.html#pickFiles">pickFiles</a>
    method from the ojfilepickerutils module. Pass in a callback that will be called when a file is
    selected as well as a
    <a href="jsdocs/ojfilepickerutils.html#FileOptions">FileOptions</a>
    object to configure file selection properties like accept, capture, and selection mode.
  </li>
</ul>`;

export const filePickerButtoncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

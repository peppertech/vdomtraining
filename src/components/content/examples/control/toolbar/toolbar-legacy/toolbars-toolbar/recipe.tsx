// @ts-nocheck
import 'preact';

const recipeHtmlText = String.raw`<p><b>Toolbar:</b></p>
<ol>
  <li>
    Create a JET Toolbar by specifying the
    <code class="prettyprint">&lt;oj-toolbar&gt;</code>
    element. (Hereafter called the "toolbar element.")
  </li>
  <li>
    Apply the
    <code class="prettyprint">aria-controls</code>
    attribute to the toolbar element as needed, as discussed in the API doc.
  </li>
  <li>
    If multiple toolbars are present, apply an
    <code class="prettyprint">aria-label</code>
    to each toolbar element. (This is optional when only one toolbar is present, as shown here.)
  </li>
</ol>
</br>
<p><b>Theming:</b></p>
<ol>
  <li>
    If toolbar borders are desired in certain themes, apply
    <code class="prettyprint">.oj-divider-top</code>
    and/or
    <code class="prettyprint">..oj-divider-bottom</code>
    to the toolbar element.
  </li>
  <li>
    Borderless buttons are recommended for use in toolbars. This is the default in most themes. See the
    JSDoc for the Toolbar's
    <code class="prettyprint">chroming</code>
    option for details.
  </li>
</ol>
</br>
<p><b>Buttons and Buttonsets:</b></p>
<ol>
  <li>See the Button and Buttonset demos for details on creating these components.</li>
  <li>
    Any included Buttonsets must have
    <code class="prettyprint">focusManagement</code>
    set to
    <code class="prettyprint">"none"</code>.
  </li>
  <li>
    Note that default width settings of Buttons in Buttonsets varies by theme and chroming, and
    overriding classes are available for flexible control. See the Buttonset Width demo for more details.
  </li>
</ol>
</br>
<p><b>Separators:</b></p>
<ol>
  <li>
    Create separator icons using the
    <code class="prettyprint">oj-toolbar-separator</code>
    class as shown. For accessibility, it is required to include
    <code class="prettyprint">role</code>
    and
    <code class="prettyprint">aria-orientation</code>
    as shown.
  </li>
  <li>
    Separators should be used around each contained buttonset as shown, to signal the grouping to both
    sighted and AT users, and anywhere else in the toolbar that a separator is desirable.
  </li>
</ol>`;

export const toolbarsToolbarRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

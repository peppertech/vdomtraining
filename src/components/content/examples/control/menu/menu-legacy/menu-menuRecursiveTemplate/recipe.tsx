// @ts-nocheck
import 'preact';

export const menuMenuRecursiveTemplateRecipe = (
  <>
    <p>Prerequisites:</p>
    <ol>
      <li>See the Menu Button demo for the basics on creating a menu button.</li>
    </ol>

    <p>Recursive Templating:</p>
    <ol>
      <li>In the view model, create a data structure with an entry for each menu item, as shown.</li>
      <li>
        Place a
        {" "}
        <code className={"prettyprint"}>template</code>
        {" "}
        binding, referring to the view model and a separate menu item template, on a nested virtual
        element as shown.
      </li>
      <li>
        Per Knockout convention, create the menu item template from a &lt;script&gt; tag with
        type="text/html". (JavaScript goes in a separate &lt;script&gt; tag with type="text/javascript",
        not here.)
      </li>
      <li>
        In that template, place the elements to be stamped out for each menu item, bound to the view
        model as shown.
      </li>
    </ol>
  </>
);

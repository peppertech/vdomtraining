// @ts-nocheck
import { h } from 'preact';

export const toggleButtonsManyOverviewRecipe = (
  <>
    <ul>
      <li>
        Inside the <code className={"prettyprint"}>oj-buttonset-many</code> options can be provided via
        <code className={"prettyprint"}>oj-option</code> (as shown in Multiple Buttons) or via
        <code className={"prettyprint"}>oj-bind-for-each</code> (as shown in Responsive) to generate
        buttons that can be clicked.
      </li>
      <li>
        Use <code className={"prettyprint"}>oj-buttonset-many</code> with its value attribute and
        <code className={"prettyprint"}>oj-option</code> inside it to create a toggle button. See
        <a href={"#"}>Toggle(Single Button)</a> for details.
      </li>
      <li>
        Use <code className={"prettyprint"}>oj-buttonset-width-auto</code> and
        <code className={"prettyprint"}>oj-buttonset-width-auto</code> classes to change width behavior.
        See <a href={"#"}>Buttonset Width</a> for details.
      </li>
      <li>
        Create Knockout observables to monitor screen size changes and component attributes that should
        vary by screen size to create responsive buttonsets. See <a href={"#"}>Responsive</a> for
        details.
      </li>
      <li>
        Add an <code className={"prettyprint"}>oj-label</code> to define the label text and optional
        help.definition.See <a href={"#"}>Labelled Buttonset</a> for details.
      </li>
    </ul>
  </>
);

// @ts-nocheck
import { h } from 'preact';

export const buttonsetoneButtonRadiosRecipe = (
  <>
    <p>Buttonset:</p>
    <ol>
      <li>
        Create a JET Buttonset element such as a
        {" "}
        <code className={"prettyprint"}>&lt;oj-buttonset-one&gt;</code>
        {" "}
        as shown.
      </li>
      <li>
        Apply
        {" "}
        <code className={"prettyprint"}>aria-label</code>
        {" "}
        and/or
        {" "}
        <code className={"prettyprint"}>aria-controls</code>
        {" "}
        attributes to the buttonset as needed, as discussed in the API doc. If the buttonset is
        contained in a toolbar,
        {" "}
        <code className={"prettyprint"}>aria-controls</code>
        {" "}
        should be placed on the toolbar, not on the buttonsets within the toolbar.
      </li>
      <li>
        Apply an explicit width and/or a width override class to the Buttonset if needed. See the
        {" "}
        <a href={"#"}>
          Buttonset Width demo
        </a>
        {" "}
        for details.
      </li>
    </ol>

    <p>Buttonset Value state:</p>
    <ol>
      <li>
        Use the
        {" "}
        <code className={"prettyprint"}>value</code>
        {" "}
        attribute as shown.
      </li>
      <li>
        It is often unnecessary to listen for the
        {" "}
        <code className={"prettyprint"}>valueChange</code>
        {" "}
        event, since the 2-way
        {" "}
        <code className={"prettyprint"}>value</code>
        {" "}
        binding updates the bound observable on every change, as seen in this demo. The declarative
        binding is often preferable to an explicit listener.
      </li>
      <li>
        A click listener should not be used to detect changes to the
        {" "}
        <code className={"prettyprint"}>value</code>
        {" "}
        attribute. Use the
        {" "}
        <code className={"prettyprint"}>value</code>
        {" "}
        attribute and/or the
        {" "}
        <code className={"prettyprint"}>valueChange</code>
        {" "}
        event instead.
      </li>
    </ol>

    <p>Buttons:</p>
    <ol>
      <li>
        Inside the buttonset, create each button from a
        {" "}
        <code className={"prettyprint"}>&lt;oj-option&gt;</code>
        .
      </li>
      <li>
        Either stamp out the buttons with a
        {" "}
        <code className={"prettyprint"}>foreach</code>
        {" "}
        binding on a nested virtual element as shown here, or list them individually as shown in the
        {" "}
        <a href={"#"}>
          Buttonset Many demo
        </a>
        .
      </li>
    </ol>
  </>
);

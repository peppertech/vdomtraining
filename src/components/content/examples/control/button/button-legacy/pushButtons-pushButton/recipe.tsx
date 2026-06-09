// @ts-nocheck
import { h } from 'preact';

export const pushButtonsPushButtonRecipe = (
  <>
    <ul>
      <li>
        Inside the
        {" "}
        <code className={"prettyprint"}>oj-button</code>
        {" "}
        element content can be added, like text or icon-font. Supply the label at create time either via
        HTML (as shown in Button Text 1), or via an
        {" "}
        <code className={"prettyprint"}>oj-bind-text</code>
        {" "}
        to generate label with resolved expression (as shown in Button Text 2).
      </li>
      <li>
        Use
        {" "}
        <code className={"prettyprint"}>display</code>
        {" "}
        attribute and
        {" "}
        <code className={"prettyprint"}>slots</code>
        {" "}
        to create Icon button. See the
        {" "}
        <a href={"#"}>
          Button Icons Demo
        </a>
        {" "}
        for details.
        <ul>
          <li>Note that the icon-only button display the label in a tooltip.</li>
        </ul>
      </li>
      <li>
        Use
        {" "}
        <code className={"prettyprint"}>disabled</code>
        {" "}
        attribute to disable button.
        {" "}
        <code>oj-button</code>
        {" "}
        is enabled by default, set
        {" "}
        <code>disabled</code>
        {" "}
        for disabled button.
      </li>
      <li>
        Use
        {" "}
        <code className={"prettyprint"}>chroming</code>
        {" "}
        attribute to define button chroming value. See the
        {" "}
        <a href={"#"}>
          Chroming Demo
        </a>
        {" "}
        for details.
        <ul>
          <li>chroming value works for Icon button in the same way.</li>
        </ul>
      </li>
      <li>
        Add pre-defined style class to apply size. See the
        {" "}
        <a href={"#"}>Sizes Demo</a>
        {" "}
        for details.
      </li>
      <li>
        Add
        {" "}
        <code className={"prettyprint"}>oj-sm-width-full</code>
        {" "}
        to apply full width to the button. See the
        {" "}
        <a href={"#"}>
          CSS Sizing Width Demo
        </a>
        {" "}
        for details.
      </li>
      <li>
        Add
        {" "}
        <code className={"prettyprint"}>oj-button-full-width</code>
        {" "}
        to stretch the button to the edge.
      </li>
    </ul>
  </>
);

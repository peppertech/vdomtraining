// @ts-nocheck
import { h } from 'preact';

export const tabbarTbswitcherRecipe = (
  <>
    <ol>
      <li>Create a oj-switcher wrapping child elements.</li>
      <li>
        Ensure that each child elements has non empty value for
        {" "}
        <code className={"prettyprint"}>slot</code>
        {" "}
        attribute.
      </li>
      <li>
        Ensure that the content can be reached through keyboard by setting the
        {" "}
        <code className={"prettyprint"}>tabindex</code>
        .
      </li>
      <li>
        Bind
        {" "}
        <code className={"prettyprint"}>value</code>
        {" "}
        attribute to a knockout observable.
      </li>
      <li>
        Create
        {" "}
        <code className={"prettyprint"}>oj-tab-bar</code>
        {" "}
        whose
        {" "}
        <code className={"prettyprint"}>selection</code>
        {" "}
        property is bound to same knockout observable.
      </li>
      <li>
        If needed,
        {" "}
        <code className={"prettyprint"}>edge</code>
        {" "}
        property can be changed based on position of the content.
      </li>
    </ol>
    <p>
      Use Tab bar only to toggle between related content sections. To perform any actions on the content
      use
      {" "}
      <a href={"#"}>oj-toolbar</a>
      .
    </p>
  </>
);

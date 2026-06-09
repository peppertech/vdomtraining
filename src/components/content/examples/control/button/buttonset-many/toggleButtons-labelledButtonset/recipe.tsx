// @ts-nocheck
import { h } from 'preact';

export const toggleButtonsLabelledButtonsetRecipe = (
  <>
    <ol>
      <li>
        See the
        {" "}
        <a href={"#"}>
          Buttonset Many demo
        </a>
        {" "}
        for details on how to use this kind of component.
      </li>
      <li>
        Add an
        {" "}
        <code className={"prettyprint"}>oj-label</code>
        {" "}
        to define the label text and optional
        {" "}
        <code className={"prettyprint"}>help.definition</code>
        .
      </li>
      <li>
        Set the
        {" "}
        <code className={"prettyprint"}>labelled-by</code>
        {" "}
        attribute on the buttonset to associate it with an accessible label and help definition.
      </li>
    </ol>
  </>
);

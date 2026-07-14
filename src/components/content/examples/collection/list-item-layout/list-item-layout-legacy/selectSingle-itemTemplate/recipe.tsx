// @ts-nocheck
import 'preact';

export const selectSingleItemTemplateRecipe = (
  <>
    <ul>
      <li>
        Create an
        {" "}
        <code className={"prettyprint"}>oj-select-single</code>
        {" "}
        element.
      </li>
      <li>
        Specify a
        {" "}
        <code className={"prettyprint"}>template</code>
        {" "}
        in the
        {" "}
        <code className={"prettyprint"}>itemTemplate</code>
        {" "}
        slot of the
        {" "}
        <code className={"prettyprint"}>oj-select-single</code>
        .
      </li>
      <li>
        Use
        {" "}
        <code className={"prettyprint"}>oj-list-item-layout</code>
        {" "}
        as the root element of the
        {" "}
        <code className={"prettyprint"}>itemTemplate</code>
        {" "}
        and place the avatar, secondary text, and metadata in the appropriate slots.
      </li>
      <li>
        Use
        {" "}
        <code className={"prettyprint"}>oj-highlight-text</code>
        {" "}
        to apply matching search text highlighting in the items.
      </li>
      <li>
        Specify a function callback that accepts a context object argument and returns a string as the
        value of the
        {" "}
        <code className={"prettyprint"}>item-text</code>
        {" "}
        attribute of the
        {" "}
        <code className={"prettyprint"}>oj-select-single</code>
        .
      </li>
    </ul>
  </>
);

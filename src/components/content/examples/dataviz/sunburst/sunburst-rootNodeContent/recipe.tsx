// @ts-nocheck
import { h } from 'preact';

export const sunburstRootNodeContentRecipe = (
  <>
    <ol>
      <li>Create a template element with the slot attribute set to 'rootNodeContentTemplate'.</li>
      <li>Populate the template element with the desired HTML content.</li>
      <li>
        Template content will have access to a
        {" "}
        <a target={"_blank"} href={"jsdocs/oj.ojSunburst.html#RootNodeContext"}>RootNodeContext</a>
        {" "}
        via the $current property as well as via any data-oj-as alias provided on the template element.
      </li>
      <li>
        The HTML element passed in will block interactivity in the center of the sunburst by default,
        but the CSS
        {" "}
        <b>pointer-events</b>
        {" "}
        property can be set to 'none' on this element if the sunburst interactivity is desired.
      </li>
    </ol>
  </>
);

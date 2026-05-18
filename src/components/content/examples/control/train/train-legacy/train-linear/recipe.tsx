import { h } from 'preact';

export const trainLinearRecipe = (
  <>
    <ul>
      <li>
        Create a train using the
        <code className={"prettyprint"}>oj-train</code>
        tag.
      </li>
      <li>
        Define the
        <code className={"prettyprint"}>selected-step</code>
        and steps attributes, set disabled attribute true for all steps except the first and the second
      </li>
      <li>
        Define
        <code className={"prettyprint"}>on-selected-step-changed</code>
        event listener in order to enable next steps on completion of the current
      </li>
    </ul>
  </>
);

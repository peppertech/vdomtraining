import { h } from 'preact';

export const trainValidationRecipe = (
  <>
    <ol>
      <li>
        Create a train using the
        <code className={"prettyprint"}>oj-train</code>
        tag.
      </li>
      <li>
        Define the
        <code className={"prettyprint"}>selected-step</code>
        and
        <code className={"prettyprint"}>steps</code>
        attributes.
      </li>
      <li>
        Declare your validation function listener via
        <code className={"prettyprint"}>on-oj-before-select</code>
        attribute
      </li>
      <li>
        Call
        <code className={"prettyprint"}>event.preventDefault();</code>
        to cancel selection of the next step in case validation finished with errors
      </li>
      <li>
        Access event payload via
        <code className={"prettyprint"}>event.detail.toStep</code>
        of type Object step which is about to be selected,
        <code className={"prettyprint"}>event.detail.fromStep</code>
        of type Object step which is about to be deselected
      </li>
      <li>
        Also you can assign message type icons to the steps via
        <code className={"prettyprint"}>step.messageType</code>
        property and
        <code className={"prettyprint"}>updateStep</code>
        method
      </li>
      <li>
        Additionaly you could add
        <code className={"prettyprint"}>oj-validation-group</code>
        component and use
        <code className={"prettyprint"}>validators</code>
        attribute to do validation
      </li>
    </ol>
  </>
);

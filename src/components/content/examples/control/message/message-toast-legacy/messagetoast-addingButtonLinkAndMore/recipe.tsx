// @ts-nocheck
import { h } from 'preact';

export const messagetoastAddingButtonLinkAndMoreRecipe = (
  <>
    <p>Customizing messages using slots:</p>
    <ol>
      <li>
        Include a
        <code className={"prettyprint"}>&lt;oj-messages&gt;</code>
        element in the page.
      </li>
      <li>
        Define 'messageTemplate' slot on
        <code className={"prettyprint"}>&lt;oj-messages&gt;</code>
        , and include a
        <code className={"prettyprint"}>&lt;oj-message&gt;</code>
        element as the template content root, set an alias for the $current property using 'data-oj-as'
        attribute. Setting alias is optional.
      </li>
      <li>
        With the template slot in use, additional properties can be added to the message data that will
        aid in custom rendering of the template. Note the use of 'actions' and its sub-properties
        'action' and 'title' in this demo. These are used in the
        <code className={"prettyprint"}>detail</code>
        slot to add links and action items in the message.
      </li>
      <li>Access the properties in the template context using '$current' property (or its alias).</li>
    </ol>
  </>
);

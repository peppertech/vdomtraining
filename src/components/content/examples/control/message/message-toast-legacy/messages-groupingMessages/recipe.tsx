// @ts-nocheck
import 'preact';

export const messagesGroupingMessagesRecipe = (
  <>
    <p>Showing a list of items in Message Detail:</p>
    <ol>
      <li>
        Include a
        {" "}
        <code className={"prettyprint"}>&lt;oj-messages&gt;</code>
        {" "}
        element in the page.
      </li>
      <li>
        Define 'messageTemplate' slot on
        {" "}
        <code className={"prettyprint"}>&lt;oj-messages&gt;</code>
        , and include a
        {" "}
        <code className={"prettyprint"}>&lt;oj-message&gt;</code>
        {" "}
        element as the template content root, set an alias for the $current property using 'data-oj-as'
        attribute. Setting alias is optional.
      </li>
      <li>
        With the template slot in use, additional properties can be added to the message data that will
        aid in custom rendering of the template. Note the use of
        {" "}
        <code className={"prettyprint"}>errors</code>
        {" "}
        observableArray in this demo.
      </li>
      <li>Access the properties in the template context using '$current' property (or its alias).</li>
      <li>
        Define 'detail' slot on
        {" "}
        <code className={"prettyprint"}>&lt;oj-message&gt;</code>
        {" "}
        and using the
        {" "}
        <code className={"prettyprint"}>&lt;oj-bind-for-each&gt;</code>
        {" "}
        list the contents of
        {" "}
        <code className={"prettyprint"}>error</code>
        {" "}
        array.
      </li>
    </ol>
  </>
);

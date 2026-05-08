// @ts-nocheck
import { h } from 'preact';

export const helpHintsMessagingHelpTitleRecipe = (
  <>
    <ul>
      <li>
        <b>help-hints attributes</b>
        :
        <ul>
          <li>
            For help definition text, set
            <code className={"prettyprint"}>help-hints.definition='your custom help definition here'</code>
            on the form component. The user will see this text inline under the field when they focus on
            the component if no hints with higher precedence are shown.
          </li>
          <li>
            For help source url, set
            <code className={"prettyprint"}>help-hints.source='https://www.oracle.com'</code>
            on the form component. The user will see 'Learn more...' link after the user assistance
            text.
          </li>
        </ul>
      </li>
    </ul>
    <ul>
      <li>
        <b>help.instruction</b>
        :
        <ul>
          <li>
            Set the
            <code className={"prettyprint"}>help.instruction</code>
            attribute on the component to a string to see the help.instruction. -
            <code className={"prettyprint"}>
              help.instruction = "enter at least 3 alphanumeric characters"
            </code>
            .
          </li>
          <li>
            Set the
            <code className={"prettyprint"}>help.instruction</code>
            attribute on the component to a formatted string. -
            <code className={"prettyprint"}>
              help.instruction = '&lt;html&gt;enter &lt;span style="color:red"&gt;at least 3
              alphanumeric&lt;/span&gt; characters&lt;/html&gt;'
            </code>
            .
          </li>
          <li>
            The user will see the help.instruction inline under the field when they focus.
            help.instruction has the highest precedence over other hint types, like
            help-hints.definition.
          </li>
        </ul>
      </li>
    </ul>
  </>
);

import { h } from 'preact';

export const validationUsecasesMessagesCustomRecipe = (
  <>
    <ul>
      <li>
        Bind the select-many's
        <code className={"prettyprint"}>messages-custom</code>
        attribute to an observable,
        <code className={"prettyprint"}>messages-custom="[[selectMessagesCustom]]"</code>
        .
      </li>
      <li>
        Write an
        <code className={"prettyprint"}>on-value-changed</code>
        event listener that adds a message to the
        <code className={"prettyprint"}>selectMessagesCustom</code>
        observable when
        <code className={"prettyprint"}>select-many</code>
        's values contain an unsupported browser for that operating system.
      </li>
      <li>
        Write an
        <code className={"prettyprint"}>on-value-changed</code>
        event listener for
        <code className={"prettyprint"}>oj-radioset</code>
        to update
        <code className={"prettyprint"}>select-many</code>
        's
        <code className={"prettyprint"}>messagesCustom</code>
        when the user changes the operating system selection.
      </li>
      <li>
        See the
        <a href={"jsdocs/oj.ojInputText.html#validation-section"}>Validation Section</a>
        of the doc for more information about the messagesCustom property and how it fits into the
        Validation lifecycle.
      </li>
      <li>
        For another
        <code>messagesCustom</code>
        example, see the
        <a href={"#"}>
          Cross-field Validation demo.
        </a>
      </li>
    </ul>
  </>
);

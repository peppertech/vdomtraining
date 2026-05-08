// @ts-nocheck
import { h } from 'preact';

export const helpHintsMessagingMultipleMessagesInlineDescription = (
  <>
    <p>
      This demo shows how various text input and selection components respond when multiple messages of
      different severities are set using the 'messages-custom' attributes.
    </p>

    <p>
      The severity of messages from most to least severe are 'Error', 'Warning', 'Info', 'Confirmation'.
      The message with the highest severity determines the marker style applied on the component.
      Messages are listed in order going from most severe to the least.
    </p>

    <h2>Test Steps</h2>

    <ul>
      <li>
        Toggle on any 'severity type' button adds to add a message of the selected severity to the
        <code className={"prettyprint"}>'messages-custom'</code>
        attribute of each component.
      </li>
      <li>
        Toggle off any 'severity type' button to remove the message of the selected severity from the
        <code className={"prettyprint"}>'messages-custom'</code>
        attribute of each component.
      </li>

      <li>
        Notice the component is styled based on the highest severity of the messages. If the highest
        severity is
        <ul>
          <li>
            'error', the
            <code className={"prettyprint"}>oj-invalid</code>
            marker style is applied to the component.
          </li>
          <li>
            'warning', the
            <code className={"prettyprint"}>oj-warning</code>
            marker style is applied to the component.
          </li>
          <li>'info', no styles are applied to the component.</li>
          <li>'confirmation', no styles are applied to the component.</li>
        </ul>
      </li>
    </ul>
  </>
);

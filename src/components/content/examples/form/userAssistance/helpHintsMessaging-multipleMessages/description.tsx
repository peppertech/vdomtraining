// @ts-nocheck
import { h } from 'preact';

export const helpHintsMessagingMultipleMessagesDescription = (
  <>
    <p>
      This demo shows how various text input and selection components respond when multiple messages of
      different severities are set using the messages attribute.
    </p>

    <p>
      'Messages' can be inline or in a notewindow. The default is inline. This demo shows how you can
      set them to be notewindow by setting the
      <code className={"prettyprint"}>display-options</code>
      attribute to
      <code className={"prettyprint"}>'{'{'}"messages": "notewindow"{'}'}'</code>
      .
    </p>

    <p>
      There is no app-wide or page-wide setting for this attribute. It must be set on every element.
    </p>

    <p>
      The severity of messages from most to least severe are 'Error', 'Warning', 'Info',
      'Confirmation'. The message with the highest severity determines the marker style applied on the
      component. Messages are listed in order going from most severe to the least.
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
      <li>Set focus on component to view the message(s) in the notewindow.</li>
    </ul>
  </>
);

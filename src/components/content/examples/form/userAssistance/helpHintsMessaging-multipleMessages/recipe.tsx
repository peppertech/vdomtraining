// @ts-nocheck
import { h } from 'preact';

export const helpHintsMessagingMultipleMessagesRecipe = (
  <>
    <ol>
      <li>
        To display messages in a notewindow, on the form element set
        {' '}<code className={"prettyprint"}>display-options = '{'{'}"messages": "notewindow"{'}'}'</code>
        .
      </li>
      <li>
        For each form component set the
        {' '}<code className={"prettyprint"}>messages-custom</code>{' '}
        attribute to an initial value, which is a knockout observable array.
        <ul>
          <li>
            Normally an application will set different ko observables to the
            {' '}<code className={"prettyprint"}>messages-custom</code>{' '}
            attribute for each component. For the purposes of illustrating how messaging works on
            components when its
            {' '}<code className={"prettyprint"}>messages-custom</code>{' '}
            attribute changes, the same observable instance is set.
          </li>
        </ul>
      </li>
      <li>
        help.instruction and message detail text can include formatted HTML text, whereas hints and
        message summary text cannot. You can format using html tags. You need to start the string with
        &lt;html&gt; and end with &lt;/html&gt;
      </li>
    </ol>
  </>
);

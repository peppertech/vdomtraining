// @ts-nocheck
import { h } from 'preact';

export const helpHintsMessagingHintsMessagesTitleDescription = (
  <>
    <p>
      The demo shows where help/hints content and messages are displayed on the component by default.
      There are no default hints from converter, placeholder text can be used to show hints. To view
      contents set focus on the input. The help/hints display to the user on focus of the field. In the
      Redwood theme for clarity only one user assistance text shows to the user, even if multiple user
      assistance text properties are on the component.
    </p>
    Following are the precedence rules:
    <ul>
      <li>
        <code className={"prettyprint"}>help.instruction</code>{' '}
        shows;
      </li>
      <li>
        if no
        {' '}<code className={"prettyprint"}>help.instruction</code>
        , then the validator hint shows;
      </li>
      <li>
        if no
        {' '}<code className={"prettyprint"}>help.instruction</code>{' '}
        or validator hint, then
        {' '}<code className={"prettyprint"}>help-hints.definition</code>{' '}
        shows;
      </li>
      <li>
        if no
        {' '}<code className={"prettyprint"}>help.instruction</code>
        , validator hint, or
        {' '}<code className={"prettyprint"}>help-hints.definition</code>
        , then the converter hint shows.
      </li>
      <li>help-hints.source always shows along side the above.</li>
    </ul>

    <p>Enter 'a' in all fields and tab-off to see the error message shown inline.</p>

    <p>
      The demo also shows how page authors can turn off the display of converter and validator hints,
      and messages using the
      {' '}<code className={"prettyprint"}>display-options</code>{' '}
      attribute. The last example does not show hints. Only messages get shown.
    </p>
  </>
);

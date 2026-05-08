// @ts-nocheck
import { h } from 'preact';

export const helpHintsMessagingHelpTitleDescription = (
  <>
    <p>Help and hints and messages are known as user assistance text.</p>
    <p>
      This demo shows where
      <code className={"prettyprint"}>help-hints.definition</code>
      ,
      <code className={"prettyprint"}>help-hints.source</code>
      and
      <code className={"prettyprint"}>help.instruction</code>
      are displayed on the component by default. The user assistance help and hints displays to the user
      on focus of the field. The form component's
      <code className={"prettyprint"}>help-hints.source</code>
      provides a link to the user to learn more. It is displayed appended to the user assistance text.
    </p>
    In the Redwood theme for clarity only one user assistance text shows to the user, even if multiple
    user assistance text properties are on the component. Following are the precedence rules:
    <ul>
      <li>
        <code className={"prettyprint"}>help.instruction</code>
        shows;
      </li>
      <li>
        if no
        <code className={"prettyprint"}>help.instruction</code>
        , then the validator hint shows;
      </li>
      <li>
        if no
        <code className={"prettyprint"}>help.instruction</code>
        or validator hint, then
        <code className={"prettyprint"}>help-hints.definition</code>
        shows;
      </li>
      <li>
        if no
        <code className={"prettyprint"}>help.instruction</code>
        , validator hint, or
        <code className={"prettyprint"}>help-hints.definition</code>
        , then the converter hint shows.
      </li>
    </ul>
  </>
);

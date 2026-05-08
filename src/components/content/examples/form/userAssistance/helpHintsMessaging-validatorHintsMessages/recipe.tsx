// @ts-nocheck
import { h } from 'preact';

export const helpHintsMessagingValidatorHintsMessagesRecipe = (
  <>
    <ul>
      <li>
        Set
        <code className={"prettyprint"}>min</code>
        and
        <code className={"prettyprint"}>max</code>
        attributes if supported on the component to see the default range validator hint on focus. E.g.,
        <code className={"prettyprint"}>min='1000' max='2000'</code>
        <ul>
          <li>
            The JET number component sets up a number range validator when max, min attributes are set.
            See
            <a href={"#"}>
              inputNumber
            </a>
            demo for details.
          </li>
        </ul>
      </li>
      <li>
        Alternatively you can set the
        <code className={"prettyprint"}>validators</code>
        attribute.
      </li>
    </ul>
  </>
);

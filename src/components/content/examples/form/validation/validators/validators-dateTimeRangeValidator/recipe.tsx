import { h } from 'preact';

export const validatorsDateTimeRangeValidatorRecipe = (
  <>
    <ul>
      <li>
        Use{' '}
        <code className={"prettyprint"}>oj-input-date</code>{' '}
        with{' '}
        <code className={"prettyprint"}>min</code>{' '}
        and{' '}
        <code className={"prettyprint"}>max</code>{' '}
        to create a DateTimeRangeValidator implicitly. Add
        {' '}<code className={"prettyprint"}>help.instruction</code>{' '}
        when you want extra guidance.
      </li>
      <li>
        Override the implicit validator&apos;s hint and messages with{' '}
        <code className={"prettyprint"}>translations.date-time-range</code>{' '}
        when needed.
      </li>
      <li>
        Use the{' '}
        <code className={"prettyprint"}>validators</code>{' '}
        attribute instead when you want to create your own DateTimeRangeValidator with custom hint or
        message content.
      </li>
    </ul>
  </>
);

import 'preact';

export const validatorsDateRestrictionValidatorRecipe = (
  <>
    <ul>
      <li>
        Explicitly create a DateRestrictionValidator and attach it to an{' '}
        <code className={"prettyprint"}>oj-input-text</code>{' '}
        or{' '}
        <code className={"prettyprint"}>oj-input-date</code>{' '}
        field when you want validation without disabling dates in the picker.
      </li>
      <li>
        Use{' '}
        <code className={"prettyprint"}>day-formatter</code>{' '}
        or{' '}
        <code className={"prettyprint"}>day-meta-data</code>{' '}
        on{' '}
        <code className={"prettyprint"}>oj-input-date</code>{' '}
        to implicitly create a DateRestrictionValidator and show restricted days as disabled.
      </li>
      <li>
        Override the implicit validator&apos;s hint and messages through the{' '}
        <code className={"prettyprint"}>translations.date-restriction</code>{' '}
        options when needed.
      </li>
    </ul>
  </>
);

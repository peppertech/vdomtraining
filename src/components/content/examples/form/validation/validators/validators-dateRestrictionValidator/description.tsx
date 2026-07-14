import 'preact';

export const validatorsDateRestrictionValidatorDescription = (
  <>
    <p>This demo shows JET&apos;s DateRestrictionValidator.</p>
    <p>
      When{' '}
      <code className={"prettyprint"}> dayFormatter </code>{' '}
      or{' '}
      <code className={"prettyprint"}> dayMetaData </code>{' '}
      properties are set on the input datetime components, an implicit DateRestrictionValidator is
      created. This is different from any DateRestrictionValidator specified using the
      {' '}<code className={"prettyprint"}>validators</code>{' '}
      property.
    </p>
    <p>
      Using{' '}
      <code className={"prettyprint"}>dayFormatter</code>{' '}
      or{' '}
      <code className={"prettyprint"}>dayMetaData</code>{' '}
      provides additional rendering capabilities over using the DateRestrictionValidator explicitly,
      such as styling disabled days and associating a custom tooltip for restricted dates.
    </p>
  </>
);

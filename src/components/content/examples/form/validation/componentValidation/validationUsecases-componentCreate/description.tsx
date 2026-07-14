import 'preact';

export const validationUsecasesComponentCreateDescription = (
  <>
    <p>
      This demo shows the behavior of an editable form control, Username, when it is created with
      required and placeholder set on the element and the
      {' '}<code className={"prettyprint"}>validators</code>{' '}
      attribute set to a regexp.
    </p>
    <p>
      As a comparison, this demo also shows the behavior of an editable form control, Full Name,
      when it is created without those attributes set.
    </p>
    <p>
      The demo shows an error icon next to the component when it is initially invalid, which is the
      required and blank state. The demo listens to
      {' '}<code className={"prettyprint"}>on-value-changed</code>{' '}
      to hide the error icon, since that event only fires when the value is valid.
    </p>
  </>
);

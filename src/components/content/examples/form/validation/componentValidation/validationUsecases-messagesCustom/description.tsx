import 'preact';

export const validationUsecasesMessagesCustomDescription = (
  <>
    <p>
      This demo shows how to use the
      {' '}<code>messagesCustom</code>{' '}
      property.
    </p>
    <p>
      The application developer can add
      {' '}<code>messagesCustom</code>{' '}
      to any form component at any time.
      {' '}<code>messagesCustom</code>{' '}
      is useful for cross-field validation, like when the value of one field affects the validity of
      another field. In this demo you see the
      {' '}<code>messagesCustom</code>{' '}
      error is added to the select-many component when you select Mac as the Operating System and
      Internet Explorer as one of the browsers, or Windows as the Operating System and Safari as one of
      the browsers.
    </p>
    <p>
      A converter or validator error prevents the value from being pushed to the viewModel. A
      {' '}<code>messagesCustom</code>{' '}
      error message does not prevent the value from being updated, but will make the component's
      {' '}<code>valid</code>{' '}
      state
      {' '}<code>invalidShown</code>
      .
    </p>
  </>
);

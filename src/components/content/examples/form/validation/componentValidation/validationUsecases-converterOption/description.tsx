import 'preact';

export const validationUsecasesConverterOptionDescription = (
  <>
    This demo shows the behavior of an editable form control when
    {' '}<code className={"prettyprint"}>converter</code>{' '}
    property changes due to programmatic intervention.

    <p></p>

    <div id={"desc"}>
      <oj-collapsible id={"collapsibleInfo"} expanded>
        <h4 slot={"header"}>
          Example 1: User enters valid value in 'Birth Date' field when 'converter' property changes.
        </h4>
        <div>
          <ul>
            <li>
              Enter a date on 'Birth Date' field - '12-12-12', and notice the value is displayed in the
              short format for the current locale.
              <ul>
                <li>
                  The demo uses the IntlDateTimeConverter on the 'Birth Date' field that displays the
                  date value in the short format. See this.dcOptions and this.dateConverter.
                </li>
              </ul>
            </li>
            <li>
              Click on the 'Change Converter' button. Notice the display value now is rendered in long
              format.
              <ul>
                <li>
                  This creates a new IntlDateTimeConverter converter with long format, and when the
                  converter property changes, current ViewModel's value is formatted with the new
                  converter and the formatted value is displayed in the field.
                </li>
                <li>
                  The application is responsible for making sure the ViewModel's value is the correct
                  type for the converter. For example, if the converter is DateTimeConverter, then the
                  value needs to be a ISO 8601 string.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </oj-collapsible>

      <oj-collapsible id={"collapsibleInfo2"}>
        <h4 slot={"header"}>
          Example 2: User enters invalid value and then 'converter' option is removed.
        </h4>
        <div>
          <ul>
            <li>Refresh page (F5).</li>
            <li>Enter a date on 'Birth Date' field and notice the format is a short format.</li>
            <li>
              Enter an invalid value and tab off - 'today'. Notice there is an error because converter
              is unable to parse this value as a date. Notice the value was not pushed to the ViewModel.
            </li>
            <li>Click on the 'Change Converter' button.</li>
            <li>
              Notice the component continues to show error but the message uses a different format.
            </li>
            <li>
              Now click on the 'Remove Converter' button. Notice that the error is cleared and value
              pushed to the model.
              <ul>
                <li>
                  When the component is showing an error, and the converter changes, full validation is
                  run on the display value. Since there is now no converter, the value is accepted and
                  is saved (and the observable updated).
                </li>
              </ul>
            </li>
            <li>
              Click on the 'Change Converter' button again. Notice there is an error about how the
              ViewModel value is not the correct type. This is because the converter could not format
              'today'. It needs to be an ISO 8601 string. The application developer should make sure the
              ViewModel value is the correct type before changing the converter so the end user does not
              see this error.
            </li>
          </ul>
        </div>
      </oj-collapsible>
      <oj-collapsible id={"collapsibleInfo3"}>
        <h4 slot={"header"}>
          Example 3: Application's value in viewModel is incorrect type for new converter.
        </h4>
        <div>
          <ul>
            <li>Refresh page (F5).</li>
            <li>
              Enter an invalid value in the Number field - 'abc'. Notice there is an error because the
              converter is unable to parse this value as a number. Notice the value was not pushed to
              the ViewModel.
            </li>
            <li>
              Now click on the 'Remove Number Converter' button. Notice that the error is cleared and
              value pushed to the ViewModel. The value is 'abc' in the ViewModel.
              <ul>
                <li>
                  When the component is showing an error, and the converter changes, full validation is
                  run on the display value. Since there is now no converter, the value is accepted and
                  is saved (and the observable updated).
                </li>
              </ul>
            </li>
            <li>
              Click on the 'Change Number Converter' button again. Notice there is an error because the
              converter is unable to parse this value as a number.
            </li>
            <li>
              Now toggle the switch. Now click on the 'Change Number Converter' button, and you will see
              the 'abc' in the field changes to an empty field. This demonstrates that the application
              code should make sure the ViewModel value is the correct type before changing the
              converter if the converter does not format the value the way you want.
            </li>
          </ul>
        </div>
      </oj-collapsible>
    </div>
  </>
);

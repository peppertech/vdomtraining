import 'preact';

export const validatorsNumberRangeValidatorRecipe = (
  <>
    <ul>
      <li>
        Use oj-c-input-numbers's min and max attributes to limit the number range. This will create a
        NumberRangeValidator implicitly.
      </li>
      <li>
        When using the implicit NumberRangeValidator, you can override the messageDetail by using the
        oj-c-input-number's translations.number-range.message-detail options.
      </li>
      <li>
        Use oj-c-input-text's validators attribute if you want to create your own NumberRangeValidator
        with min, max and custom hint, messageSummary and/or messageDetail.
      </li>
    </ul>
  </>
);

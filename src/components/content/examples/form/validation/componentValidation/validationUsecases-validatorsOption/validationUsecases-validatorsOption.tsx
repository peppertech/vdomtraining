import 'oj-c/button';
import 'oj-c/input-number';
import 'oj-c/input-text';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');
import AsyncNumberRangeValidator = require('ojs/ojasyncvalidator-numberrange');

type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-number'>['onvalueChanged']>
>[0];
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type InputNumberValue = ComponentProps<'oj-c-input-number'>['value'];
type InputNumberMessagesCustom = ComponentProps<'oj-c-input-number'>['messagesCustom'];
type InputNumberMessage = NonNullable<InputNumberMessagesCustom>[number];

export const ValidationUsecasesValidatorsOption = () => {
  const [userName, setUserName] = useState<InputTextValue>(undefined);
  const [userNamePlaceholder, setUserNamePlaceholder] = useState('at least 4 letters');
  const [userNamePattern, setUserNamePattern] = useState('[a-zA-Z]{4,}');
  const [weight, setWeight] = useState<InputNumberValue>(100);
  const [weightMin, setWeightMin] = useState(100);
  const [weightMessages, setWeightMessages] = useState<InputNumberMessagesCustom>([]);

  const userNameValidators = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: userNamePattern,
        hint: `Enter ${userNamePlaceholder}. No numbers are allowed.`,
        messageDetail: `You must enter ${userNamePlaceholder}`
      })
    ],
    [userNamePattern, userNamePlaceholder]
  );
  const weightValidators = useMemo(
    () => [
      new AsyncNumberRangeValidator({
        hint: { min: 'Enter a value greater than or equal to {min}' },
        messageDetail: {
          rangeUnderflow: "Your 'Target Weight' should be at least {min} lbs"
        },
        min: weightMin
      })
    ],
    [weightMin]
  );

  const handleUserNameChanged = (event: InputTextValueChangedEvent) => {
    setUserName((event.detail.value as InputTextValue | null | undefined) ?? undefined);
  };

  const handleWeightChanged = (event: InputNumberValueChangedEvent) => {
    setWeight((event.detail.value as InputNumberValue | null | undefined) ?? null);
  };

  const handleVerifyWeight = () => {
    const newMsg: InputNumberMessage =
      (weight ?? 0) <= weightMin
        ? {
            summary: 'Your weight barely qualifies our minimum criteria',
            detail:
              'Re-enter your average weight in the last 6 months to help us place you in the right group!',
            severity: 'error'
          }
        : {
            summary: 'Congratulations!',
            detail: 'Your weight meets our minimum requirements',
            severity: 'info'
          };
    setWeightMessages([newMsg]);
  };

  const handleChangeWeightMin = () => {
    setWeightMin(150);
  };

  const handleChangeUserNamePattern = () => {
    setUserNamePattern('[a-zA-Z]{3,}');
    setUserNamePlaceholder('at least 3 letters');
  };

  return (
    <div id="validation-usecase-validators">
      <oj-c-input-text
        id="username"
        autocomplete="off"
        labelHint="Username"
        labelEdge="top"
        required
        validators={userNameValidators}
        value={userName}
        onvalueChanged={handleUserNameChanged}
        placeholder={userNamePlaceholder}
      />
      <span id="usernameVal">[Component Value: {String(userName)}]</span>

      <oj-c-input-number
        id="weight"
        labelHint="Weight"
        labelEdge="top"
        required
        validators={weightValidators}
        messagesCustom={weightMessages}
        value={weight}
        onvalueChanged={handleWeightChanged}
      />
      <span id="weightVal">[Component Value: {String(weight)}]</span>

      <div>
        <oj-c-button
          id="changePattern"
          onojAction={handleChangeUserNamePattern}
          label="Change Validators on Username"
        />

        <oj-c-button
          id="changeMin"
          onojAction={handleChangeWeightMin}
          label="Change Validators on Weight"
        />

        <oj-c-button id="addCustomMsgBtn" onojAction={handleVerifyWeight} label="Verify Weight" />
      </div>
    </div>
  );
};

export default ValidationUsecasesValidatorsOption;

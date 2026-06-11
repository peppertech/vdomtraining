import { h, type ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import type Message = require('ojs/ojmessaging');
import 'ojs/ojformlayout';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojselectcombobox';

type SelectManyChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-select-many'>['onvalueChanged']>
>[0];
type SelectManyValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-select-many'>['onvalidChanged']>
>[0];
type RadiosetValue = ComponentProps<'oj-radioset'>['value'];
type SelectManyValue = NonNullable<ComponentProps<'oj-select-many'>['value']>;
type SelectManyMessagesCustom = ComponentProps<'oj-select-many'>['messagesCustom'];
type ValidState = ComponentProps<'oj-select-many'>['valid'];
type RadiosetChangedEvent = Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0];

const IE_ON_MAC_MESSAGE: Message = {
  detail: 'You cannot have Internet Explorer on a Mac.',
  summary: '',
  severity: 'error'
};

const SAFARI_ON_WINDOWS_MESSAGE: Message = {
  detail: 'You cannot have Safari on Windows.',
  summary: '',
  severity: 'error'
};

export const ValidationUsecasesMessagesCustom = () => {
  const [osVal, setOsVal] = useState<RadiosetValue>('Mac');
  const [selectVal1, setSelectVal1] = useState<SelectManyValue>(['SA']);
  const [valid, setValid] = useState<ValidState>('valid');
  const [selectMessagesCustom, setSelectMessagesCustom] =
    useState<SelectManyMessagesCustom>([]);

  const runCrossCheck = (osValue: RadiosetValue, browsers: SelectManyValue, clear: boolean) => {
    if (osValue === 'Mac' && browsers.includes('IE')) {
      setSelectMessagesCustom([IE_ON_MAC_MESSAGE]);
    } else if (osValue === 'Windows' && browsers.includes('SA')) {
      setSelectMessagesCustom([SAFARI_ON_WINDOWS_MESSAGE]);
    } else if (clear) {
      setSelectMessagesCustom([]);
    }
  };

  const handleSelectValueChanged = (event: SelectManyChangedEvent) => {
    const newValues = (event.detail.value ?? []) as SelectManyValue;
    setSelectVal1(newValues);
    runCrossCheck(osVal, newValues, false);
  };

  const handleOperatingSystemChanged = (event: RadiosetChangedEvent) => {
    const nextOs = event.detail.value;
    setOsVal(nextOs);
    runCrossCheck(nextOs, selectVal1, true);
  };

  const handleSelectValidChanged = (event: SelectManyValidChangedEvent) => {
    setValid((event.detail.value as ValidState));
  };

  return (
    <div id="validation-usecase">
      <oj-form-layout id="fl">
        <oj-radioset
          value={osVal}
          labelHint="Operating System"
          onvalueChanged={handleOperatingSystemChanged}
        >
          <oj-option id="opt1" value="Mac">
            Mac
          </oj-option>
          <oj-option id="opt2" value="Windows">
            Windows
          </oj-option>
        </oj-radioset>
        <oj-select-many
          id="select"
          onvalueChanged={handleSelectValueChanged}
          onvalidChanged={handleSelectValidChanged}
          labelHint="Browsers"
          value={selectVal1}
          messagesCustom={selectMessagesCustom}
          class="oj-form-control-max-width-md"
        >
          <oj-option value="IE">Internet Explorer</oj-option>
          <oj-option value="FF">Firefox</oj-option>
          <oj-option value="CH">Chrome</oj-option>
          <oj-option value="OP">Opera</oj-option>
          <oj-option value="SA">Safari</oj-option>
        </oj-select-many>
      </oj-form-layout>
      <div id="selectValue">select-many&apos;s value property: {JSON.stringify(selectVal1)}</div>
      <div id="selectValid">select-many&apos;s valid property: {valid}</div>
    </div>
  );
};

export default ValidationUsecasesMessagesCustom;

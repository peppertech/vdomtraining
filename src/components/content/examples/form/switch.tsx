import { h, ComponentProps } from 'preact';
import { useState, useCallback, useMemo } from 'preact/hooks';
import 'ojs/ojswitch';
import 'ojs/ojformlayout';

type InputTextProps = ComponentProps<"oj-input-text">;

export const SwitchExample = () => {

const hintDefinition: InputTextProps["helpHints"] = {
  definition: "Help hints definition",
};
const helpHintSource: InputTextProps["helpHints"] = {
  source: "https://www.oracle.com",
};
  // State for States section switches
  const [enabledSwitchOn, setEnabledSwitchOn] = useState(true);
  const [disabledSwitchOn, setDisabledSwitchOn] = useState(true);
  const [readonlySwitchOn, setReadonlySwitchOn] = useState(true);
  const [enabledSwitchOff, setEnabledSwitchOff] = useState(false);
  const [disabledSwitchOff, setDisabledSwitchOff] = useState(false);
  const [readonlySwitchOff, setReadonlySwitchOff] = useState(false);

  // State for Help section switches
  const [helpInstructionSwitch, setHelpInstructionSwitch] = useState(true);
  const [helpDefinitionSwitch, setHelpDefinitionSwitch] = useState(true);
  const [helpSourceSwitch, setHelpSourceSwitch] = useState(true);

  // State for Messages section switches
  const [errorSwitch, setErrorSwitch] = useState(false);
  const [warningSwitch, setWarningSwitch] = useState(false);
  const [infoSwitch, setInfoSwitch] = useState(false);
  const [confirmationSwitch, setConfirmationSwitch] = useState(false);

  // Message arrays
  const errorMessages = useMemo(() => [{ severity: 'error' as const, summary: 'Error message', detail: 'This is an error' }], []);
  const warningMessages = useMemo(() => [{ severity: 'warning' as const, summary: 'Warning message', detail: 'This is a warning' }], []);
  const infoMessages = useMemo(() => [{ severity: 'info' as const, summary: 'Info message', detail: 'This is info' }], []);
  const confirmationMessages = useMemo(() => [{ severity: 'confirmation' as const, summary: 'Confirmation message', detail: 'This is confirmation' }], []);

  // Event handlers for States section
  const handleEnabledSwitchOnChanged = useCallback((event: any) => setEnabledSwitchOn(event.detail.value), []);
  const handleDisabledSwitchOnChanged = useCallback((event: any) => setDisabledSwitchOn(event.detail.value), []);
  const handleReadonlySwitchOnChanged = useCallback((event: any) => setReadonlySwitchOn(event.detail.value), []);
  const handleEnabledSwitchOffChanged = useCallback((event: any) => setEnabledSwitchOff(event.detail.value), []);
  const handleDisabledSwitchOffChanged = useCallback((event: any) => setDisabledSwitchOff(event.detail.value), []);
  const handleReadonlySwitchOffChanged = useCallback((event: any) => setReadonlySwitchOff(event.detail.value), []);

  // Event handlers for Help section
  const handleHelpInstructionChanged = useCallback((event: any) => setHelpInstructionSwitch(event.detail.value), []);
  const handleHelpDefinitionChanged = useCallback((event: any) => setHelpDefinitionSwitch(event.detail.value), []);
  const handleHelpSourceChanged = useCallback((event: any) => setHelpSourceSwitch(event.detail.value), []);

  // Event handlers for Messages section
  const handleErrorChanged = useCallback((event: any) => setErrorSwitch(event.detail.value), []);
  const handleWarningChanged = useCallback((event: any) => setWarningSwitch(event.detail.value), []);
  const handleInfoChanged = useCallback((event: any) => setInfoSwitch(event.detail.value), []);
  const handleConfirmationChanged = useCallback((event: any) => setConfirmationSwitch(event.detail.value), []);

  return (
    <div id="componentDemoContent" style="width: 1px; min-width: 100%;">
      <div id="div1" class="oj-sm-padding-2x-horizontal">
        <h5 class="oj-sm-padding-2x-bottom">States</h5>
        <oj-form-layout max-columns="3" direction="row">
          <oj-switch
            id="enabledSwitchOn"
            value={enabledSwitchOn}
            labelHint="Enabled value true"
            onvalueChanged={handleEnabledSwitchOnChanged}
          />
          <oj-switch
            id="disabledSwitchOn"
            value={disabledSwitchOn}
            labelHint="Disabled value true"
            disabled={true}
            onvalueChanged={handleDisabledSwitchOnChanged}
          />
          <oj-switch
            id="readonlySwitchOn"
            value={readonlySwitchOn}
            labelHint="Readonly value true"
            readonly={true}
            onvalueChanged={handleReadonlySwitchOnChanged}
          />
          <oj-switch
            value={enabledSwitchOff}
            labelHint="Enabled value false"
            onvalueChanged={handleEnabledSwitchOffChanged}
          />
          <oj-switch
            value={disabledSwitchOff}
            labelHint="Disabled value false"
            disabled={true}
            onvalueChanged={handleDisabledSwitchOffChanged}
          />
          <oj-switch
            value={readonlySwitchOff}
            labelHint="Readonly value false"
            readonly={true}
            onvalueChanged={handleReadonlySwitchOffChanged}
          />
        </oj-form-layout>

        <h5 class="oj-sm-margin-4x-top">Help</h5>
        <oj-form-layout max-columns="3" direction="row" class="oj-sm-padding-2x-bottom">
          <oj-switch
            value={helpInstructionSwitch}
            labelHint="help.instruction"
            helpHints={hintDefinition}
            onvalueChanged={handleHelpInstructionChanged}
          />
          <oj-switch
            value={helpDefinitionSwitch}
            labelHint="label hint definition"
            helpHints={hintDefinition}
            onvalueChanged={handleHelpDefinitionChanged}
          />
          <oj-switch
            value={helpSourceSwitch}
           labelHint="label hint source"
            helpHints={helpHintSource}
            onvalueChanged={handleHelpSourceChanged}
          />
        </oj-form-layout>

        <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
        <oj-form-layout max-columns="3" direction="row">
          <oj-switch
            value={errorSwitch}
            labelHint="Error"
            messagesCustom={errorMessages as any}
            onvalueChanged={handleErrorChanged}
          />
          <oj-switch
            value={warningSwitch}
            labelHint="Warning"
            messagesCustom={warningMessages as any}
            onvalueChanged={handleWarningChanged}
          />
          <oj-switch
            id="airplaneModeInformation"
            value={infoSwitch}
            labelHint="Information"
            messagesCustom={infoMessages as any}
            onvalueChanged={handleInfoChanged}
          />
          <oj-switch
            id="airplaneModeConfirmation"
            labelHint="Confirmation"
            value={confirmationSwitch}
            messagesCustom={confirmationMessages as any}
            onvalueChanged={handleConfirmationChanged}
          />
        </oj-form-layout>
      </div>
    </div>
  );
};
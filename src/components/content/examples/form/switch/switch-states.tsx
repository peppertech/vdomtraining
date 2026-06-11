import { h, ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojswitch";

type EnabledSwitchOnEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type DisabledSwitchOnEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type ReadonlySwitchOnEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type EnabledSwitchOffEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type DisabledSwitchOffEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type ReadonlySwitchOffEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type HelpInstructionEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type HelpDefinitionEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type HelpSourceEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type ErrorEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type WarningEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type InfoEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type ConfirmationEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type InputTextProps = ComponentProps<"oj-input-text">;

export default function SwitchStatesExample() {
  const hintDefinition: InputTextProps["helpHints"] = {
    definition: "help-hints.definition text",
  };
  const helpHintSource: InputTextProps["helpHints"] = {
    source: "https://www.oracle.com",
  };

  const [enabledSwitchOn, setEnabledSwitchOn] = useState(true);
  const [disabledSwitchOn, setDisabledSwitchOn] = useState(true);
  const [readonlySwitchOn, setReadonlySwitchOn] = useState(true);
  const [enabledSwitchOff, setEnabledSwitchOff] = useState(false);
  const [disabledSwitchOff, setDisabledSwitchOff] = useState(false);
  const [readonlySwitchOff, setReadonlySwitchOff] = useState(false);
  const [helpInstructionSwitch, setHelpInstructionSwitch] = useState(true);
  const [helpDefinitionSwitch, setHelpDefinitionSwitch] = useState(true);
  const [helpSourceSwitch, setHelpSourceSwitch] = useState(true);
  const [errorSwitch, setErrorSwitch] = useState(false);
  const [warningSwitch, setWarningSwitch] = useState(false);
  const [infoSwitch, setInfoSwitch] = useState(false);
  const [confirmationSwitch, setConfirmationSwitch] = useState(false);

  const errorMessages = useMemo(
    () => [{ summary: "summary", detail: "detail", severity: "error" as const }],
    [],
  );
  const warningMessages = useMemo(
    () => [{ summary: "summary", detail: "detail", severity: "warning" as const }],
    [],
  );
  const infoMessages = useMemo(
    () => [{ summary: "summary", detail: "detail", severity: "info" as const }],
    [],
  );
  const confirmationMessages = useMemo(
    () => [
      {
        summary: "summary",
        detail: "detail",
        severity: "confirmation" as const,
      },
    ],
    [],
  );

  const handleEnabledSwitchOnChanged = useCallback(
    (event: EnabledSwitchOnEvent) => setEnabledSwitchOn(Boolean(event.detail.value)),
    [],
  );
  const handleDisabledSwitchOnChanged = useCallback(
    (event: DisabledSwitchOnEvent) => setDisabledSwitchOn(Boolean(event.detail.value)),
    [],
  );
  const handleReadonlySwitchOnChanged = useCallback(
    (event: ReadonlySwitchOnEvent) => setReadonlySwitchOn(Boolean(event.detail.value)),
    [],
  );
  const handleEnabledSwitchOffChanged = useCallback(
    (event: EnabledSwitchOffEvent) => setEnabledSwitchOff(Boolean(event.detail.value)),
    [],
  );
  const handleDisabledSwitchOffChanged = useCallback(
    (event: DisabledSwitchOffEvent) => setDisabledSwitchOff(Boolean(event.detail.value)),
    [],
  );
  const handleReadonlySwitchOffChanged = useCallback(
    (event: ReadonlySwitchOffEvent) => setReadonlySwitchOff(Boolean(event.detail.value)),
    [],
  );
  const handleHelpInstructionChanged = useCallback(
    (event: HelpInstructionEvent) => setHelpInstructionSwitch(Boolean(event.detail.value)),
    [],
  );
  const handleHelpDefinitionChanged = useCallback(
    (event: HelpDefinitionEvent) => setHelpDefinitionSwitch(Boolean(event.detail.value)),
    [],
  );
  const handleHelpSourceChanged = useCallback(
    (event: HelpSourceEvent) => setHelpSourceSwitch(Boolean(event.detail.value)),
    [],
  );
  const handleErrorChanged = useCallback(
    (event: ErrorEvent) => setErrorSwitch(Boolean(event.detail.value)),
    [],
  );
  const handleWarningChanged = useCallback(
    (event: WarningEvent) => setWarningSwitch(Boolean(event.detail.value)),
    [],
  );
  const handleInfoChanged = useCallback(
    (event: InfoEvent) => setInfoSwitch(Boolean(event.detail.value)),
    [],
  );
  const handleConfirmationChanged = useCallback(
    (event: ConfirmationEvent) => setConfirmationSwitch(Boolean(event.detail.value)),
    [],
  );

  return (
    <div id="componentDemoContent" style="width: 1px; min-width: 100%;">
      <div class="oj-sm-padding-2x-horizontal">
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
        <oj-form-layout
          max-columns="3"
          direction="row"
          class="oj-sm-padding-2x-bottom"
        >
          <oj-switch
            value={helpInstructionSwitch}
            labelHint="help.instruction"
            help={{ instruction: "help.instruction text" } as ComponentProps<'oj-switch'>['help']}
            onvalueChanged={handleHelpInstructionChanged}
          />
          <oj-switch
            value={helpDefinitionSwitch}
            labelHint="help-hints.definition"
            helpHints={hintDefinition}
            onvalueChanged={handleHelpDefinitionChanged}
          />
          <oj-switch
            value={helpSourceSwitch}
            labelHint="help-hints.source"
            helpHints={helpHintSource}
            onvalueChanged={handleHelpSourceChanged}
          />
        </oj-form-layout>

        <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
        <oj-form-layout max-columns="3" direction="row">
          <oj-switch
            value={errorSwitch}
            labelHint="Error"
            messagesCustom={errorMessages as ComponentProps<'oj-switch'>['messagesCustom']}
            onvalueChanged={handleErrorChanged}
          />
          <oj-switch
            value={warningSwitch}
            labelHint="Warning"
            messagesCustom={warningMessages as ComponentProps<'oj-switch'>['messagesCustom']}
            onvalueChanged={handleWarningChanged}
          />
          <oj-switch
            id="airplaneModeInformation"
            value={infoSwitch}
            labelHint="Information"
            messagesCustom={infoMessages as ComponentProps<'oj-switch'>['messagesCustom']}
            onvalueChanged={handleInfoChanged}
          />
          <oj-switch
            id="airplaneModeConfirmation"
            labelHint="Confirmation"
            value={confirmationSwitch}
            messagesCustom={confirmationMessages as ComponentProps<'oj-switch'>['messagesCustom']}
            onvalueChanged={handleConfirmationChanged}
          />
        </oj-form-layout>
      </div>
    </div>
  );
}

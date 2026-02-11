import { h } from "preact";
import { useState, useCallback, useMemo } from "preact/hooks";

// CorePack component imports
import "oj-c/input-text";
import "oj-c/form-layout";
import "oj-c/button";

// Legacy component imports
import "ojs/ojvalidationgroup";

// Type imports
import { CInputTextElement } from "oj-c/input-text";
import { CButtonElement } from "oj-c/button";

export const UserAssistance = () => {
  // State for input values
  const [helpInstructionValue, setHelpInstructionValue] = useState<string>("");
  const [helpDefinitionValue, setHelpDefinitionValue] = useState<string>("");
  const [helpSourceValue, setHelpSourceValue] = useState<string>("");
  const [errorValue, setErrorValue] = useState<string>("");
  const [warningValue, setWarningValue] = useState<string>("");
  const [infoValue, setInfoValue] = useState<string>("");
  const [confirmationValue, setConfirmationValue] = useState<string>("");

  // State for validation example
  const [firstNameVal, setFirstNameVal] = useState<string>("");
  const [lastNameVal, setLastNameVal] = useState<string>("");
  const [groupValid, setGroupValid] = useState<boolean | undefined>(undefined);

  // Help hints configuration
  const helpHints = useMemo(
    () => ({
      definition:
        "This is a definition help hint that provides additional context.",
      source: "https://www.oracle.com",
      sourceText: "Learn more about Oracle JET",
    }),
    [],
  );

  // Message configurations
  const errorMessages = useMemo(
    () => [
      {
        summary: "Error: Invalid Input",
        detail: "Please enter a valid value for this field.",
        severity: "error" as const,
      },
    ],
    [],
  );

  const warningMessages = useMemo(
    () => [
      {
        summary: "Warning: Check Value",
        detail: "This value might need verification.",
        severity: "warning" as const,
      },
    ],
    [],
  );

  const infoMessages = useMemo(
    () => [
      {
        summary: "Information",
        detail: "This field accepts text input with user assistance.",
        severity: "info" as const,
      },
    ],
    [],
  );

  const confirmationMessages = useMemo(
    () => [
      {
        summary: "Success",
        detail: "Your input has been processed successfully.",
        severity: "confirmation" as const,
      },
    ],
    [],
  );

  // Event handlers
  const handleHelpInstructionChanged = useCallback(
    (event: CInputTextElement.valueChanged<string>) => {
      setHelpInstructionValue(event.detail.value as string);
    },
    [],
  );

  const handleHelpDefinitionChanged = useCallback(
    (event: CInputTextElement.valueChanged<string>) => {
      setHelpDefinitionValue(event.detail.value as string);
    },
    [],
  );

  const handleHelpSourceChanged = useCallback(
    (event: CInputTextElement.valueChanged<string>) => {
      setHelpSourceValue(event.detail.value as string);
    },
    [],
  );

  const handleErrorChanged = useCallback(
    (event: CInputTextElement.valueChanged<string>) => {
      setErrorValue(event.detail.value as string);
    },
    [],
  );

  const handleWarningChanged = useCallback(
    (event: CInputTextElement.valueChanged<string>) => {
      setWarningValue(event.detail.value as string);
    },
    [],
  );

  const handleInfoChanged = useCallback(
    (event: CInputTextElement.valueChanged<string>) => {
      setInfoValue(event.detail.value as string);
    },
    [],
  );

  const handleConfirmationChanged = useCallback(
    (event: CInputTextElement.valueChanged<string>) => {
      setConfirmationValue(event.detail.value as string);
    },
    [],
  );

  // Validation example handlers
  const handleFirstNameChanged = useCallback(
    (event: CInputTextElement.valueChanged<string>) => {
      setFirstNameVal(event.detail.value as string);
    },
    [],
  );

  const handleLastNameChanged = useCallback(
    (event: CInputTextElement.valueChanged<string>) => {
      setLastNameVal(event.detail.value as string);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    console.log("Submit clicked", { firstNameVal, lastNameVal });
    // In a real app, you would submit the form data here
  }, [firstNameVal, lastNameVal]);

  const handleClearAll = useCallback(() => {
    setHelpInstructionValue("");
    setHelpDefinitionValue("");
    setHelpSourceValue("");
    setErrorValue("");
    setWarningValue("");
    setInfoValue("");
    setConfirmationValue("");
    setFirstNameVal("");
    setLastNameVal("");
  }, []);

  return (
    <div id="userAssistanceDemo" style="width: 1px; min-width: 100%;">
      <div class="oj-sm-padding-2x-horizontal">
        <h4 class="oj-sm-padding-2x-bottom">User Assistance Examples</h4>

        <h5 class="oj-sm-margin-4x-top">Help Hints</h5>
        <oj-c-form-layout
          maxColumns={1}
          direction="row"
          class="oj-sm-padding-2x-bottom"
        >
          <oj-c-input-text
            value={helpInstructionValue}
            labelHint="help-hints attribute with definition"
            helpHints={{ definition: "custom help definition text" }}
            onvalueChanged={handleHelpInstructionChanged}
          />
          <oj-c-input-text
            value={helpDefinitionValue}
            labelHint="help-hints attribute with source and definition"
            helpHints={{
              source: "https://www.oracle.com",
              definition: "custom help definition text",
            }}
            onvalueChanged={handleHelpDefinitionChanged}
          />
          <oj-c-input-text
            value={helpSourceValue}
            labelHint="help-hints attribute with source and definition and custom source text"
            helpHints={{
              source: "https://www.oracle.com",
              sourceText: "More info.",
              definition: "custom help definition text",
            }}
            onvalueChanged={handleHelpSourceChanged}
          />
        </oj-c-form-layout>

        <h5 class="oj-sm-margin-4x-top">Help Instruction</h5>
        <oj-c-form-layout
          maxColumns={1}
          direction="row"
          class="oj-sm-padding-2x-bottom"
        >
          <oj-c-input-text
            autocomplete="off"
            value={helpInstructionValue}
            labelHint="input with help.instruction attribute"
            help={{ instruction: "enter at least 3 alphanumeric characters" }}
            onvalueChanged={handleHelpInstructionChanged}
          />
          <oj-c-input-text
            autocomplete="off"
            value={helpDefinitionValue}
            labelHint="help.instruction and help-hints.definition attribute"
            help={{
              instruction:
                "this is help instruction. it takes precedence over hints",
            }}
            helpHints={{ definition: "custom help definition text" }}
            onvalueChanged={handleHelpDefinitionChanged}
          />
          <oj-c-input-text
            autocomplete="off"
            value={helpSourceValue}
            labelHint="help.instruction and help-hints.source attribute"
            help={{
              instruction: "this is help instruction with help-hints source",
            }}
            helpHints={{ source: "https://www.oracle.com" }}
            onvalueChanged={handleHelpSourceChanged}
          />
          <oj-c-input-text
            autocomplete="off"
            value={helpInstructionValue}
            labelHint="help.instruction and help-hints.source attribute and custom source text"
            help={{
              instruction: "this is help instruction with help-hints source",
            }}
            helpHints={{
              source: "https://www.oracle.com",
              sourceText: "More info.",
            }}
            onvalueChanged={handleHelpInstructionChanged}
          />
        </oj-c-form-layout>

        <h5 class="oj-sm-margin-4x-top oj-sm-padding-2x-bottom">Messages</h5>
        <oj-c-form-layout
          maxColumns={2}
          direction="row"
          class="oj-sm-padding-2x-bottom"
        >
          <oj-c-input-text
            value={errorValue}
            labelHint="Error Example"
            messagesCustom={errorMessages as any}
            onvalueChanged={handleErrorChanged}
          />
          <oj-c-input-text
            value={warningValue}
            labelHint="Warning Example"
            messagesCustom={warningMessages as any}
            onvalueChanged={handleWarningChanged}
          />
          <oj-c-input-text
            value={infoValue}
            labelHint="Info Example"
            messagesCustom={infoMessages as any}
            onvalueChanged={handleInfoChanged}
          />
          <oj-c-input-text
            value={confirmationValue}
            labelHint="Confirmation Example"
            messagesCustom={confirmationMessages as any}
            onvalueChanged={handleConfirmationChanged}
          />
        </oj-c-form-layout>

        <div id="validation-usecase" class="oj-sm-margin-4x-top">
          <oj-validation-group id="tracker">
            <oj-c-form-layout id="fl1" class="oj-sm-margin-2x-bottom">
              <oj-c-input-text
                id="first"
                value={firstNameVal}
                required={true}
                autocomplete="off"
                labelHint="First Name"
                onvalueChanged={handleFirstNameChanged}
              />
              <oj-c-input-text
                id="last"
                value={lastNameVal}
                required={true}
                autocomplete="off"
                labelHint="Last Name"
                onvalueChanged={handleLastNameChanged}
              />
              <div class="oj-sm-margin-2x-top">
                <oj-c-button id="submit" onojAction={handleSubmit}>
                  Submit
                </oj-c-button>
              </div>
            </oj-c-form-layout>
          </oj-validation-group>
          <div class="oj-sm-margin-2x-top">
            <span>oj-validation-group valid property:</span>
            <span id="namevalid">
              {groupValid !== undefined ? groupValid.toString() : "undefined"}
            </span>
          </div>
        </div>

        <div class="oj-sm-margin-4x-top">
          <oj-c-button label="Clear All Fields" onojAction={handleClearAll} />
        </div>
      </div>
    </div>
  );
};

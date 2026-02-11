import { h } from "preact";
import { useState, useRef, useCallback } from "preact/hooks";
import { ComponentProps } from "preact";

// Legacy JET component imports
import "ojs/ojvalidationgroup";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojbutton";
import "ojs/ojlabelvalue";

// Type imports
import { ojValidationGroup } from "ojs/ojvalidationgroup";
import { ojFormLayout } from "ojs/ojformlayout";
import { ojInputText } from "ojs/ojinputtext";
import { ojButton } from "ojs/ojbutton";
import { ojLabelValue } from "ojs/ojlabelvalue";

export const ValidationGroupExample = () => {
  const [firstNameVal, setFirstNameVal] = useState<string>("");
  const [lastNameVal, setLastNameVal] = useState<string>("");
  const [groupValid, setGroupValid] = useState<boolean | undefined>();

  const validationGroupRef = useRef<any>(null);

  const handleFirstNameChange = useCallback((event: any) => {
    setFirstNameVal(event.detail.value || "");
  }, []);

  const handleLastNameChange = useCallback((event: any) => {
    setLastNameVal(event.detail.value || "");
  }, []);

  const handleValidChanged = useCallback((event: any) => {
    setGroupValid(event.detail.value);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (validationGroupRef.current) {
      await validationGroupRef.current.validate();
    }
  }, []);

  return (
    <div id="componentDemoContent" style="width: 1px; min-width: 100%;">
      <div id="validation-usecase">
        <oj-validation-group
          ref={validationGroupRef}
          onvalidChanged={handleValidChanged}
        >
          <oj-form-layout
            id="fl1"
            class="oj-sm-margin-2x-bottom"
            colspanWrap="wrap"
          >
            <oj-input-text
              id="first"
              value={firstNameVal}
              required={true}
              autocomplete="off"
              labelHint="First Name"
              onvalueChanged={handleFirstNameChange}
            />
            <oj-input-text
              id="last"
              value={lastNameVal}
              required={true}
              autocomplete="off"
              labelHint="Last Name"
              onvalueChanged={handleLastNameChange}
            />
            <oj-label-value colspan={2}>
              <oj-button id="submit" slot="value" onojAction={handleSubmit}>
                Submit
              </oj-button>
            </oj-label-value>
          </oj-form-layout>
        </oj-validation-group>
        <span>oj-validation-group valid property:</span>
        <span id="namevalid">
          {groupValid !== undefined ? groupValid.toString() : ""}
        </span>
      </div>
    </div>
  );
};

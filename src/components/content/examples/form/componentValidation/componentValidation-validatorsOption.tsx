import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/input-text";
import {
  createWeightValidators,
  createUsernameValidators,
} from "./componentValidation-shared";

export default function ValidationUsecasesValidatorsOptionExample() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [userNamePlaceholder, setUserNamePlaceholder] = useState(
    "at least 4 letters",
  );
  const [userNamePattern, setUserNamePattern] = useState("[a-zA-Z]{4,}");
  const [weight, setWeight] = useState<number>(100);
  const [weightMin, setWeightMin] = useState(100);
  const [weightMessages, setWeightMessages] = useState<any[]>([]);

  const userNameValidators = useMemo(
    () => createUsernameValidators(userNamePattern, userNamePlaceholder),
    [userNamePattern, userNamePlaceholder],
  );
  const weightValidators = useMemo(
    () => createWeightValidators(weightMin),
    [weightMin],
  );

  return (
    <div id="validation-usecase-validators">
      <oj-c-input-text
        autocomplete="off"
        labelHint="Username"
        labelEdge="top"
        required={true}
        validators={userNameValidators as any}
        value={userName}
        placeholder={userNamePlaceholder}
        onvalueChanged={(event: any) => {
          setUserName(String(event.detail.value ?? ""));
        }}
      />

      <span>[Component Value: {String(userName)}]</span>

      <oj-c-input-text
        autocomplete="off"
        labelHint="Weight"
        labelEdge="top"
        required={true}
        validators={weightValidators as any}
        messagesCustom={weightMessages as any}
        value={weight as any}
        onvalueChanged={(event: any) => {
          const value = event.detail.value;
          setWeight(value == null || value === "" ? 0 : Number(value));
        }}
      />
      <span>[Component Value: {String(weight)}]</span>

      <div>
        <oj-c-button
          label="Change Validators on Username"
          onojAction={() => {
            setUserNamePattern("[a-zA-Z]{3,}");
            setUserNamePlaceholder("at least 3 letters");
          }}
        />

        <oj-c-button
          label="Change Validators on Weight"
          onojAction={() => setWeightMin(150)}
        />

        <oj-c-button
          label="Verify Weight"
          onojAction={() => {
            if (weight <= weightMin) {
              setWeightMessages([
                {
                  summary: "Your weight barely qualifies our minimum criteria",
                  detail:
                    "Re-enter your average weight in the last 6 months to help us place you in the right group!",
                  severity: "error",
                },
              ]);
            } else {
              setWeightMessages([
                {
                  summary: "Congratulations!",
                  detail: "Your weight meets our minimum requirements",
                  severity: "info",
                },
              ]);
            }
          }}
        />
      </div>
    </div>
  );
}

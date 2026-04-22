import { h } from "preact";
import { useRef, useState } from "preact/hooks";
import "ojs/ojformlayout";
import "ojs/ojlabelvalue";
import "oj-c/button";
import "oj-c/input-text";
import {
  createAgeValidators,
  createCompetitionWeightValidators,
} from "./componentValidation-shared";

export default function ValidationUsecasesResetMethodExample() {
  const ageRef = useRef<any>(null);
  const weightRef = useRef<any>(null);
  const [age, setAge] = useState<number | null>(null);
  const [ageMessagesCustom, setAgeMessagesCustom] = useState<any[]>([]);
  const [ageValid, setAgeValid] = useState("");
  const [weight, setWeight] = useState<number | null>(null);
  const [weightMessagesCustom, setWeightMessagesCustom] = useState<any[]>([]);
  const [weightValid, setWeightValid] = useState("");

  return (
    <oj-form-layout id="validation-usecase">
      <oj-c-input-text
        ref={ageRef}
        id="age"
        autocomplete="off"
        required={true}
        validators={createAgeValidators() as any}
        value={age as any}
        messagesCustom={ageMessagesCustom as any}
        valid={ageValid as any}
        labelHint="Age"
        onvalidChanged={(event: any) => {
          setAgeValid(String(event.detail.value ?? ""));
        }}
        onvalueChanged={(event: any) => {
          const value = event.detail.value;
          setAge(value == null || value === "" ? null : Number(value));
        }}
      />
      <span>[Component&apos;s value: {String(age)}]</span>
      <span>[Component&apos;s valid: {ageValid}]</span>

      <oj-c-input-text
        ref={weightRef}
        id="weight"
        validators={createCompetitionWeightValidators() as any}
        value={weight as any}
        messagesCustom={weightMessagesCustom as any}
        valid={weightValid as any}
        labelHint="Weight"
        onvalidChanged={(event: any) => {
          setWeightValid(String(event.detail.value ?? ""));
        }}
        onvalueChanged={(event: any) => {
          const value = event.detail.value;
          setWeight(value == null || value === "" ? null : Number(value));
        }}
      />
      <span>[Component&apos;s value: {String(weight)}]</span>
      <span>[Component&apos;s valid: {weightValid}]</span>

      <oj-label-value>
        <oj-c-button
          slot="value"
          label="Reset"
          onojAction={() => {
            ageRef.current?.reset?.();
            weightRef.current?.reset?.();
          }}
        />
        <oj-c-button
          slot="value"
          label="Add Custom Message"
          onojAction={() => {
            setAgeMessagesCustom([
              {
                detail:
                  "Not entering your correct age can be grounds for disqualification! Warning messages are not considered invalid.",
                summary: "",
                severity: "warning",
              },
            ]);
            setWeightMessagesCustom([
              {
                detail:
                  "Not entering your correct weight might place you in the wrong competition group! Warning messages are not considered invalid.",
                summary: "",
                severity: "warning",
              },
            ]);
          }}
        />
      </oj-label-value>
    </oj-form-layout>
  );
}

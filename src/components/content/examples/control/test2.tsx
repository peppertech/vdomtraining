/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import "preact"
import { useReducer, useCallback, useEffect } from "preact/hooks";
import "ojs/ojtoolbar";
import "ojs/ojmenu";
import "ojs/ojbutton";
import "oj-c/buttonset-single"
import "ojs/ojlabel"
import { ButtonsetOneElement } from "ojs/ojbutton";

type ENCOUNTERS = "inpatient" | "normal" | "prescription" | "home_medication"

type Props = {
  orderType: string,
  encounterType: ENCOUNTERS
}

type Option = {
  value: string,
  label: string
}

const reducer = (state: Option[], action: string) => {
  let tempList: Option[] = state;
  switch (action) {
    case 'inpatient':
      tempList.push({ value: "inpatient", label: "Inpatient" })
      return tempList;
    case 'normal':
      tempList.push({ value: "normal", label: "Clinic" })
      return tempList;
    default:
      return tempList
  }
}

const initialState: Array<Option> = [
  { value: "prescription", label: "Prescription" },
  { value: "home_medication", label: "Patient-Stated" }
]

export function Test2({ orderType, encounterType }: Props) {
  const [encounterOptions, filterEncounter] = useReducer(reducer, initialState)

  useEffect(() => {
    filterEncounter(encounterType);
  }, [])

  const handleButtonChange = useCallback((event: ButtonsetOneElement.valueChanged) => {
    console.log("Format value: ", event.detail.value);
  }, []);

  return (
    <>
    <oj-label id="encoutersLabel">Choose an encounter type</oj-label>
      <oj-c-buttonset-single
        id="drinkset"
        items={encounterOptions}
        size="sm"
        value={orderType}
        aria-labelledby="encoutersLabel"
        onvalueChanged={handleButtonChange}>
      </oj-c-buttonset-single>
    </>
  );
}
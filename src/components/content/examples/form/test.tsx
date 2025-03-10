// import { Language, LocaleProvider } from "../services/locale";
import "preact"
import {useState} from "preact/hooks"
import "oj-c/input-text";
import "oj-c/input-number";
import "ojs/ojinputtext";
import "oj-c/button";
import "oj-c/form-layout";
import "oj-c/checkboxset";
import "oj-c/input-password";
import "ojs/ojactioncard";
import { ojInputText } from "ojs/ojinputtext";

type Props = {
  tag: string;
  language: string;
};

import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type Class = {
  id:number
  label:string
}

const data:Array<Class> = [
  {id:388, label:"Blood donation - 388"},
  {id:389, label:"Emergency - 389"},
  {id:390, label:"Home health - 390"},
  {id:391, label:"Inpatient - 391"},
  {id:392, label:"Observation - 392"},
]

const encounterClassTypesProvider = new MutableArrayDataProvider<Class["id"],Class>(data, {keyAttributes:"id"})

function TestButtonBar(props: Props) {
  let myLabel = props.language as string;
  const [disableMenu, setDisableMenu] = useState<boolean>(false);
    const [filterEncntrCodes, setFilterEncntrCodes] = useState<Array<number>>([]);

  const testingHandler = (e:ojInputText.valueChanged) => {
    console.log("event: ",e)
  }
  return (
    <div>
      <oj-button
        id="refresh_button"
        label={myLabel}
        onojAction={() => console.log(myLabel)}
      ></oj-button>
      <oj-c-button
        id="refresh_button"
        label={myLabel}
        onojAction={() => console.log(myLabel)}
      ></oj-c-button>
      <oj-input-text labelHint={myLabel}></oj-input-text>
      <oj-c-input-text labelHint="username" autocomplete="on"></oj-c-input-text>
      <oj-action-card>{myLabel}</oj-action-card>
      <oj-c-form-layout labelEdge="start" readonly>
        <oj-c-input-text labelHint="Testing" onvalueChanged={testingHandler}></oj-c-input-text>
        <oj-c-input-number labelHint="Test number" onvalueChanged={testingHandler}></oj-c-input-number>
        <oj-c-checkboxset
            // label-hint="Exclude Selected Encounter Classes"
            labelEdge="inside"
            options={encounterClassTypesProvider}
            value={filterEncntrCodes}
            disabled={false}
            onvalueChanged={testingHandler}
          ></oj-c-checkboxset>
      </oj-c-form-layout>
    </div>
  );
}
export default TestButtonBar;

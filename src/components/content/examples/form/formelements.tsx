import { h, ComponentProps } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import * as NumberConverter from "ojs/ojconverter-number";
import * as ConverterUtilsI18n from "ojs/ojconverterutils-i18n";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojbutton";
import "ojs/ojcheckboxset";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojdatetimepicker";
import "ojs/ojselectsingle";
import "ojs/ojdialog";
import "oj-c/radioset"
import "ojs/ojtreeview"
import "ojs/ojvalidationgroup";
import peopleData from "text!./data/peopleData.json";
import { ojButton } from "ojs/ojbutton";
import { ojDialog } from "ojs/ojdialog";
import { ojCheckboxset } from "ojs/ojcheckboxset";
import { ojValidationGroup } from "ojs/ojvalidationgroup";

const buyers: Array<object> = [];

type Buyer = {
  id: number;
  value: string;
  label: string;
};

type Person = {
  id: number;
  name: string;
  title: string;
  image: string;
  department: string;
};

type InputTextProps = ComponentProps<"oj-input-text">;
JSON.parse(peopleData).map((item: Person) => {
  buyers.push({ id: item.id, value: item.name, label: item.name });
});

type FormLayoutProps = ComponentProps<"oj-form-layout">;

const buyerData = new MutableArrayDataProvider<Buyer["value"], Buyer>(buyers, {
  keyAttributes: "value",
});

// Converter and oj-input-text configurations variables
const hintDefinition: InputTextProps["helpHints"] = {
  definition: "cost of a single item",
};
const placeholder: InputTextProps["placeholder"] = "Enter item cost";
const lblHint: InputTextProps["labelHint"] = "Item Cost";
const eurNumberConverter = new NumberConverter.IntlNumberConverter({
  style: "currency",
  currency: "EUR",
  currencyDisplay: "symbol",
});
let value: string = "598.42";
let name: string = "Kopi Luwak beans (2 lbs)";
let valDateTime: string = ConverterUtilsI18n.IntlConverterUtils.dateToLocalIso(
  new Date()
);

const FormElements = () => {
  const [formData, setFormData] = useState({
    itemName: name,
    itemBuyer: "",
    itemCost: value,
    salesDate: valDateTime,
  });
  
  const [isDisabled, setIsDisabled] = useState(true);
  const [newState, setNewState] = useState(false);
  const [density, setDensity] =
    useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

  const dialogRef = useRef<ojDialog>(null);
  const valGroupRef = useRef<ojValidationGroup>(null);

  const currentColor = "red";
  const colorOptions = [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "red", label: "Red" },
    { value: "lime", label: "Lime" },
    { value: "aqua", label: "Aqua" },
  ];

  const onChange = (event: any) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.detail.value,
    });
  };

  const onSubmit = (event: ojButton.ojAction) => {
    event.preventDefault();
    const valid = _checkValidationGroup();
    if (!valid) return;
    dialogRef.current!.open();
    console.log("formData: " + JSON.stringify(formData));
  };

  const close = () => {
    dialogRef.current!.close();
  };

  const handleAgreement = (
    event: ojCheckboxset.valueChanged<string, Array<string>, Array<string>>
  ) => {
    event.detail.value!.length < 1 ? setIsDisabled(true) : setIsDisabled(false);
  };
  const dataProvider = new MutableArrayTreeDataProvider([
    { title: 1, id: 1 },
    { title: 2, id: 2 }
  ], 'id', {
    keyAttributeScope: 'global'
  });


  const renderItems = (item: any) => {
    return (
      <>
        <span class="oj-treeview-item-icon"></span>
        <span class="oj-treeview-item-text">
          {item.data.title}
        </span>
      </>
    );
  }

  const addField = () => { setNewState(true) };
  const _checkValidationGroup = () => {
    const tracker = valGroupRef.current;
    if (tracker?.valid === 'valid') {
      return true;
    } else {
      // show messages on all the components
      // that have messages hidden.
      tracker?.showMessages();
      tracker?.focusOn('@firstInvalidShown');
      return false;
    }
  }
  return (
    <div>
      <oj-validation-group id="tracker" ref={valGroupRef}>
        <oj-form-layout
          userAssistanceDensity={density}
          labelEdge="inside"
          columns={1}
          class="oj-md-margin-4x-horizontal">
          <oj-input-text
            id="itemName"
            value={formData.itemName}
            labelHint="Name"
            onvalueChanged={onChange}>
            <span
              slot="end"
              class="oj-text-field-start-end-icon oj-ux-ico-coffee oj-sm-margin-4x-end"
              role="presentation"></span>
          </oj-input-text>
          <div style="margin-top:-14">
            {newState && (
              <oj-input-text required labelHint="Testing"></oj-input-text>
            )}
          </div>
          <oj-input-text
            id="itemCost"
            value={formData.itemCost}
            placeholder={placeholder}
            labelHint={lblHint}
            helpHints={hintDefinition}
            required
            onvalueChanged={onChange}
            converter={eurNumberConverter}></oj-input-text>
          <oj-input-date-time
            id="salesDate"
            value={formData.salesDate}
            labelHint="Purchase date"
            onvalueChanged={onChange}></oj-input-date-time>
          <oj-select-single
            id="itemBuyer"
            labelHint="Buyer"
            data={buyerData}
            value={formData.itemBuyer}
            onvalueChanged={onChange}></oj-select-single>
          <oj-checkboxset
            id="checkboxSetAgreeId"
            labelHint="Everything is correct?"
            labelEdge="inside"
            onvalueChanged={handleAgreement}>
            <oj-option value={"agree"}>I Agree</oj-option>
          </oj-checkboxset>
          <oj-c-radioset
            id="radiosetBasicDemoId"
            label-hint="Colors"
            label-edge="inside"
            options={colorOptions}
            value={currentColor}>
          </oj-c-radioset>
          <oj-button onojAction={onSubmit} disabled={isDisabled}>
            Send this stuff
          </oj-button>
          <oj-button onojAction={addField} disabled={isDisabled}>
            Add a field
          </oj-button>
        </oj-form-layout>
        <oj-dialog ref={dialogRef} dialogTitle="Form Data Submitted">
          <div slot="body">
            <oj-form-layout id="desc">
              <oj-input-text
                id="finalName"
                readonly
                value={formData.itemName}
                labelHint="Name"></oj-input-text>
              <oj-input-text
                id="finalPrice"
                readonly
                value={formData.itemCost}
                labelHint="Price"
                converter={eurNumberConverter}></oj-input-text>
              <oj-input-date-time
                id="salesDate"
                value={formData.salesDate}
                labelHint="Purchase date"
                readonly></oj-input-date-time>
            </oj-form-layout>
          </div>
          <div slot="footer">
            <oj-button id="okButton" onojAction={close}>
              OK
            </oj-button>
          </div>
        </oj-dialog>
      </oj-validation-group>
    </div>
  );
};
export default FormElements;
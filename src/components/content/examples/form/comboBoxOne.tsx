import { h, ComponentProps } from "preact";
import { useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojselectcombobox";
import "ojs/ojinputnumber";
import "oj-c/input-number";

import { registerCustomElement } from "ojs/ojvcomponent";

import { useEffect } from "preact/hooks";
import Context = require("ojs/ojcontext");
import "ojs/ojconveyorbelt";
import "ojs/ojbutton";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "ojs/ojnavigationlist";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import "oj-c/input-text";
import {
  BigDecimalStringConverter,
  ConverterOptions,
} from "ojs/ojconverter-nativenumber";
import * as DemoBundle from "ojL10n!../../../resources/nls/demo";

const converter = new BigDecimalStringConverter({
  style: "decimal",
  useGrouping: true,
});

type Browser = {
  id: number;
  label: string;
  value: string;
};
type FormLayoutProps = ComponentProps<"oj-form-layout">;

const browserData = [
  { id: 1, value: "IE", label: "Internet Explorer" },
  { id: 2, value: "FF", label: "Firefox" },
  { id: 3, value: "CH", label: "Chrome" },
  { id: 4, value: "OP", label: "Opera" },
  { id: 5, value: "SA", label: "Safari" },
];
const browserDP = new MutableArrayDataProvider<Browser["value"], Browser>(
  browserData,
  {
    keyAttributes: "value",
  }
);

const ComboBoxOne = () => {
  const [comboboxData, setComboboxData] = useState({ selectedValue: "FF" });
  const [density, setDensity] =
    useState<FormLayoutProps["userAssistanceDensity"]>("efficient");

  const onComboboxChange = (event: any) => {
    //console.log(event.detail.value);
    setComboboxData({
      ...comboboxData,
      selectedValue: event.detail.value,
    });
  };

  const data = [
    {
      name: "Settings",
      id: "settings",
    },
    {
      name: "Tools",
      id: "tools",
    },
    {
      name: "Base",
      id: "base",
    },
    {
      name: "Environment",
      disabled: "true",
      id: "environment",
    },
    {
      name: "SP",
      id: "SP",
    },
    {
      name: "SK",
      id: "SK",
    },
    {
      name: "NP",
      disabled: "true",
      id: "NP",
    },
    {
      name: "Ram",
      id: "Ram",
    },
  ];

  const quantityNumberConverter = new IntlNumberConverter({
    style: "decimal",
    maximumFractionDigits: 7,
  });
  const dataProvider = new ArrayDataProvider(data, {
    keyAttributes: "id",
  });

  const templateRender = (item: any) => {
    return (
      <li class="oj-removable">
        <a href="#">{item.data.name}</a>
      </li>
    );
  };

  const onRemove = (event: CustomEvent) => {
    deleteFunc(event.detail.key);
    event.preventDefault();
    event.stopPropagation();
  };

  const deleteFunc = (id: any) => {
    const hnavlist = document.getElementById("hnavlist");
    if (hnavlist != null) {
      let items = data;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          data.splice(i, 1);
          Context.getContext(hnavlist)
            .getBusyContext()
            .whenReady()
            .then(function () {
              hnavlist.focus();
            });
          break;
        }
      }
    }
  };

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-form-layout
        userAssistanceDensity={density}
        labelEdge="inside"
        columns={1}
        class="oj-md-margin-4x-horizontal"
        direction="row"
        maxColumns={3}
      >
        <h6 class="oj-typography-heading-sm"> Combobox one</h6>
        <oj-combobox-one
          id="comboboxOne"
          value={comboboxData.selectedValue}
          aria-label="combobox one"
          labelHint="Combobox One with Inline Options"
          labelEdge="inside"
          options={browserDP}
          onvalueChanged={onComboboxChange}
          class="oj-form-control-max-width-md"
        ></oj-combobox-one>

        <span>The selected value is: {comboboxData.selectedValue} </span>
        <hr />
      </oj-form-layout>
    </div>
  );
};
export default ComboBoxOne;

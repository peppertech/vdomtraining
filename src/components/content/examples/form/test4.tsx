import { h } from "preact";
import { ojMenu } from "ojs/ojmenu";
import "ojs/ojmenu";
import "ojs/ojbutton";
import "ojs/ojcheckboxset"
import "ojs/ojoption";
import "oj-c/checkboxset"
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  MutableRef,
  useMemo,
} from "preact/hooks";
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

const browsers = [
  { value: 'IE', label: 'Internet Explorer' },
  { value: 'FF', label: 'Firefox' },
  { value: 'CH', label: 'Chrome' },
  { value: 'OP', label: 'Opera' },
  { value: 'SA', label: 'Safari' }
];
const encounterClassTypesProvider = new MutableArrayDataProvider<Class["id"],Class>(data, {keyAttributes:"id"})
const browserDP = new MutableArrayDataProvider(browsers, {keyAttributes:"value"})


export function Test4() {
  console.log("Component rendered");
  const [disableMenu, setDisableMenu] = useState<boolean>(false);
  const [val, setVal] = useState<string[]>();
  const [filterEncntrCodes, setFilterEncntrCodes] = useState<Array<number>>([]);
  function waitForSeconds(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
  const beforeOpen = async (event: ojMenu.ojBeforeOpen) => {
    console.log("beforeOpen Entered");
    console.log("Before waiting");
    setDisableMenu(true);
    await waitForSeconds(2);
    console.log("after waiting");
    setDisableMenu(false);
  };
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h4>Menu standalone test App</h4>
      <oj-menu-button id="menuButton5" chroming="borderless">
        {"Test Menu Button"}
        <oj-menu
          id="options"
          slot="menu"
          aria-label="table_menu"
          onojBeforeOpen={beforeOpen}
        >
          <oj-option value="AddComp" id="AddComp" disabled={disableMenu}>
            <span slot="startIcon" class="oj-ux-ico-add-child"></span>
            {"Option One"}
          </oj-option>
          <oj-option value="AddComp" id="AddComp" disabled={disableMenu}>
            <span slot="startIcon" class="oj-ux-ico-add-child"></span>
            {"Option Two"}
          </oj-option>
        </oj-menu>
      </oj-menu-button>
      <oj-checkboxset
            // label-hint="Exclude Selected Encounter Classes"
            labelEdge="inside"
            options={encounterClassTypesProvider}
            value={filterEncntrCodes}
            optionsKeys={{value:"id"}}
            disabled={false}
          ></oj-checkboxset>
      <oj-checkboxset
            // label-hint="Exclude Selected Encounter Classes"
            labelEdge="inside"
            options={browserDP}
            value={val}
            disabled={false}
          ></oj-checkboxset>
    </div>
  );
}
import { h } from "preact";
import { ojMenu } from "ojs/ojmenu";
import "ojs/ojmenu";
import "ojs/ojbutton";
import "ojs/ojoption";
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  MutableRef,
  useMemo,
} from "preact/hooks";
export function Test4() {
  console.log("Component rendered");
  let [disableMenu, setDisableMenu] = useState<boolean>(false);
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
    </div>
  );
}
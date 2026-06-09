import { h } from "preact";
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import "css!./demo.css";
import "oj-c/button";
import "oj-c/form-layout";
import "oj-c/popup";
import "oj-c/radioset";

type PopupProps = ComponentProps<"oj-c-popup">;
type PopupPlacement = NonNullable<PopupProps["placement"]>;
type PopupTail = NonNullable<PopupProps["tail"]>;
type PopupOpenedChangedEvent = Parameters<NonNullable<PopupProps["onopenedChanged"]>>[0];
type RadioOptions = NonNullable<ComponentProps<"oj-c-radioset">["options"]>;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

type PopupObj = {
  buttonId: string;
  buttonLabel: string;
  popupId: string;
  popupPlacement: PopupPlacement;
};

const popupObjs: PopupObj[] = [
  {
    buttonId: "buttonTopStart",
    buttonLabel: "Top Start",
    popupId: "popupTopStart",
    popupPlacement: "top-start"
  },
  {
    buttonId: "buttonTop",
    buttonLabel: "Top",
    popupId: "popupTop",
    popupPlacement: "top"
  },
  {
    buttonId: "buttonTopEnd",
    buttonLabel: "Top End",
    popupId: "popupTopEnd",
    popupPlacement: "top-end"
  },
  {
    buttonId: "buttonStart",
    buttonLabel: "Start",
    popupId: "popupStart",
    popupPlacement: "start"
  },
  {
    buttonId: "buttonEnd",
    buttonLabel: "End",
    popupId: "popupEnd",
    popupPlacement: "end"
  },
  {
    buttonId: "buttonBottomStart",
    buttonLabel: "Bottom Start",
    popupId: "popupBottomStart",
    popupPlacement: "bottom-start"
  },
  {
    buttonId: "buttonBottom",
    buttonLabel: "Bottom",
    popupId: "popupBottom",
    popupPlacement: "bottom"
  },
  {
    buttonId: "buttonBottomEnd",
    buttonLabel: "Bottom End",
    popupId: "popupBottomEnd",
    popupPlacement: "bottom-end"
  }
];

const popupRows: PopupObj[][] = [
  [popupObjs[0], popupObjs[1], popupObjs[2]],
  [popupObjs[3], popupObjs[4]],
  [popupObjs[5], popupObjs[6], popupObjs[7]]
];

const tailOptions = [
  { label: "none", value: "none" },
  { label: "simple", value: "simple" }
] as RadioOptions;

export const PopupTailCommonPositionscorepack = () => {
  const [tailSelected, setTailSelected] = useState<PopupTail>("simple");
  const [openedPopupId, setOpenedPopupId] = useState<string | null>(null);

  const handleTailSelectedChanged = (event: RadioValueChangedEvent) => {
    const nextValue = event.detail.value;
    if (nextValue === "none" || nextValue === "simple") {
      setTailSelected(nextValue);
    }
  };

  const handlePopupOpenedChanged = (popupId: string, event: PopupOpenedChangedEvent) => {
    setOpenedPopupId((currentPopupId) => {
      if (event.detail.value) {
        return popupId;
      }
      return currentPopupId === popupId ? null : currentPopupId;
    });
  };

  const togglePopup = (popupObj: PopupObj) => {
    setOpenedPopupId((currentPopupId) =>
      currentPopupId === popupObj.popupId ? null : popupObj.popupId
    );
  };

  return (
    <div id="popupDemo" class="demo-wrapper">
      {popupObjs.map((popupObj) => (
        <oj-c-popup
          key={popupObj.popupId}
          id={popupObj.popupId}
          opened={openedPopupId === popupObj.popupId}
          launcher={`#${popupObj.buttonId}`}
          autoDismiss="none"
          modality="modeless"
          tail={tailSelected}
          placement={popupObj.popupPlacement}
          collision="none"
          width="260px"
          aria-labelledby={`${popupObj.popupId}Title`}
          onopenedChanged={(event) => handlePopupOpenedChanged(popupObj.popupId, event)}
        >
          <div class="oj-sm-padding-2x">
            <div id={`${popupObj.popupId}Title`} class="oj-typography-subheading-xs">
              {popupObj.buttonLabel}
            </div>
            <pre class="oj-flex-item demo-position oj-typography-body-sm">
              {"placement = " + popupObj.popupPlacement}
            </pre>
          </div>
        </oj-c-popup>
      ))}

      <oj-c-form-layout maxColumns={1} direction="row">
        <oj-c-radioset
          id="tail"
          direction="row"
          labelHint="Tail"
          labelEdge="inside"
          options={tailOptions}
          onvalueChanged={handleTailSelectedChanged}
          value={tailSelected}
        />
      </oj-c-form-layout>

      <div class="demo-buttons demo-flex demo-flex-column">
        {popupRows.map((row, rowIndex) => (
          <div key={rowIndex} class="demo-flex demo-button-row">
            {row.map((popupObj) => (
              <oj-c-button
                key={popupObj.buttonId}
                id={popupObj.buttonId}
                class="demo-button"
                chroming="outlined"
                onojAction={() => togglePopup(popupObj)}
                label={popupObj.buttonLabel}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopupTailCommonPositionscorepack;

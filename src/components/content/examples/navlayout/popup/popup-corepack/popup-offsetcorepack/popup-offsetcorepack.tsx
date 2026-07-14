import "css!./demo.css";
import "oj-c/button";
import "oj-c/form-layout";
import "oj-c/input-number";
import "oj-c/popup";
import 'preact';
import type { ComponentProps } from "preact";
import { useState } from "preact/hooks";

type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-number">["onvalueChanged"]>
>[0];

export const PopupOffsetcorepack = () => {
  const [opened, setOpened] = useState(false);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(4);

  const handleOffsetXChanged = (event: InputNumberValueChangedEvent) => {
    setOffsetX(event.detail.value ?? 0);
  };

  const handleOffsetYChanged = (event: InputNumberValueChangedEvent) => {
    setOffsetY(event.detail.value ?? 0);
  };

  return (
    <div id="popupWrapper">
      <oj-c-button
        id="demo-launcher"
        onojAction={() => setOpened((current) => !current)}
        label="Toggle Popup"
      />

      <oj-c-popup
        opened={opened}
        launcher="#demo-launcher"
        autoDismiss="none"
        offset={{ x: offsetX, y: offsetY }}
        width="250px"
        aria-labelledby="popup-title"
      >
        <div class="oj-sm-padding-2x">
          <div class="demo-popup-header">
            <span id="popup-title">Popup</span>
            <oj-c-button
              id="btnCancel"
              size="sm"
              display="icons"
              chroming="borderless"
              onojAction={() => setOpened(false)}
              label="Close"
            >
              <span slot="startIcon" class="oj-ux-ico-close" />
            </oj-c-button>
          </div>
        </div>
      </oj-c-popup>

      <oj-c-form-layout columns={2} class="demo-form">
        <oj-c-input-number
          class="oj-sm-margin-4x"
          labelEdge="top"
          labelHint="X Offset (px)"
          max={50}
          min={-20}
          step={10}
          width="135px"
          value={offsetX}
          onvalueChanged={handleOffsetXChanged}
        />
        <oj-c-input-number
          class="oj-sm-margin-4x"
          labelEdge="top"
          labelHint="Y Offset (px)"
          max={50}
          min={-20}
          step={10}
          width="135px"
          value={offsetY}
          onvalueChanged={handleOffsetYChanged}
        />
      </oj-c-form-layout>
    </div>
  );
};

export default PopupOffsetcorepack;

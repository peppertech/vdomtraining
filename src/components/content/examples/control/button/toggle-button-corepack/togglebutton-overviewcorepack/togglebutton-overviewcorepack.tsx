import { h } from "preact";
import { useState } from "preact/hooks";
import "css!./demo.css";
import "oj-c/toggle-button";

export const TogglebuttonOverviewcorepack = () => {
  const [isAdvanced, setIsAdvanced] = useState(false);

  return (
    <div id="buttons-container">
      <h6>Toggle</h6>
      <oj-c-toggle-button
        id="toggle1"
        value={isAdvanced}
        onvalueChanged={(event) => setIsAdvanced(event.detail.value ?? false)}
        label="Advanced mode"
      />
      <h6>Toggle with Icon</h6>
      <div>
        <oj-c-toggle-button id="toggle2" display="icons" label="Icon Toggle">
          <span slot="startIcon" class="oj-ux-ico-information" />
        </oj-c-toggle-button>
        <oj-c-toggle-button id="toggle3" label="Start Slot">
          <span slot="startIcon" class="oj-ux-ico-information" />
        </oj-c-toggle-button>
      </div>
      <h6>Disabled Button (Unselected)</h6>
      <div>
        <oj-c-toggle-button id="toggle4" disabled label="Disabled" />
        <oj-c-toggle-button id="toggle5" disabled label="Disabled Icon">
          <span slot="startIcon" class="oj-ux-ico-information" />
        </oj-c-toggle-button>
      </div>
      <h6>Disabled Button (Selected)</h6>
      <div>
        <oj-c-toggle-button id="toggle4d" value disabled label="Disabled" />
        <oj-c-toggle-button id="toggle5d" value disabled label="Disabled Icon">
          <span slot="startIcon" class="oj-ux-ico-information" />
        </oj-c-toggle-button>
      </div>
      <h6>Chroming</h6>
      <div>
        <oj-c-toggle-button id="toggle6" chroming="borderless" label="borderless" />
        <oj-c-toggle-button id="toggle7" chroming="outlined" label="outlined" />
      </div>
      <h6>Sizes</h6>
      <div>
        <oj-c-toggle-button id="toggle8" size="sm" label="Small" />
        <oj-c-toggle-button id="toggle9" label="Default" />
        <oj-c-toggle-button id="toggle10" size="md" label="Medium" />
        <oj-c-toggle-button id="toggle11" size="lg" label="Large" />
      </div>
      <h6>Tooltip</h6>
      <div>
        <oj-c-toggle-button id="toggle12" label="Tooltip Button" tooltip="Tooltip" />
      </div>
      <h6>Button Width</h6>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel">
        <p>This panel has a toggle button with width="100%".</p>
        <oj-c-toggle-button id="toggle13" width="100%" label="Wide" />
      </div>
    </div>
  );
};

export default TogglebuttonOverviewcorepack;

import { h } from "preact";
import "css!./demo.css";
import "oj-c/button";

export const ButtonsPushButtoncorepack = () => {
  return (
    <div id="buttons-container">
      <h6>Text Button</h6>
      <div>
        <oj-c-button id="button1" label="Button Text 1" />
        <oj-c-button id="button2" label="Button 2" />
      </div>
      <h6>Button with Icon</h6>
      <div>
        <oj-c-button id="icon_button1" display="icons" label="Icon Button">
          <span slot="startIcon" class="oj-ux-ico-information" />
        </oj-c-button>
        <oj-c-button id="icon_button2" label="Start Slot">
          <span slot="startIcon" class="oj-ux-ico-avatar" />
        </oj-c-button>
        <oj-c-button id="icon_button3" label="End Slot">
          <span slot="endIcon" class="oj-ux-ico-avatar" />
        </oj-c-button>
        <oj-c-button id="icon_button4" display="label" label="Label">
          <span slot="startIcon" class="oj-ux-ico-avatar" />
          <span slot="endIcon" class="oj-ux-ico-avatar" />
        </oj-c-button>
      </div>
      <h6>Disabled Button</h6>
      <div>
        <oj-c-button disabled id="dis_button1" label="Disabled" />
        <oj-c-button disabled display="icons" id="dis_button2" label="Disabled Icon">
          <span slot="startIcon" class="oj-ux-ico-delete-circle" />
        </oj-c-button>
      </div>
      <h6>Chroming</h6>
      <div>
        <oj-c-button id="chroming_button0" chroming="ghost" label="Ghost" />
        <oj-c-button id="chroming_button1" chroming="borderless" label="Borderless" />
        <oj-c-button id="chroming_button2" chroming="outlined" label="Outlined" />
        <oj-c-button id="chroming_button3" chroming="solid" label="Solid" />
        <oj-c-button id="chroming_button4" chroming="callToAction" label="Call To Action" />
        <oj-c-button id="chroming_button5" chroming="danger" label="Danger" />
      </div>
      <h6>Sizes</h6>
      <div>
        <oj-c-button id="size_button1" size="sm" label="Small" />
        <oj-c-button id="size_button2" label="Default" />
        <oj-c-button id="size_button3" size="md" label="Medium" />
        <oj-c-button id="size_button4" size="lg" label="Large" />
      </div>
      <h6>Tooltip</h6>
      <div>
        <oj-c-button id="tooltip_button1" label="Tooltip Button" tooltip="Tooltip" />
      </div>
      <h6>Button Width</h6>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel">
        <p>This panel has a button with width="100%".</p>
        <oj-c-button
          id="width_full_button"
          width="100%"
          chroming="callToAction"
          label="Call To Action"
        />
      </div>
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a button with edge="bottom" which should be used for a button that
            stretches to the edge at the bottom.
          </p>
        </div>
        <oj-c-button
          id="stretch_to_edge_button"
          edge="bottom"
          chroming="callToAction"
          label="Call to Action"
        />
      </div>
    </div>
  );
};

export default ButtonsPushButtoncorepack;

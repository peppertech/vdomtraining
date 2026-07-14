import "ojs/ojbutton";
import 'preact';

const Button = () => {
  return (
    <div id="buttons-container" class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Text Button</h6>
      <div>
        <oj-button id="button1">Button Text 1</oj-button>
        <oj-button id="button2">
          <span>Button Text 2</span>
        </oj-button>
      </div>

      <h6>Button with Icon</h6>
      <div>
        <oj-button id="icon_button1" display="icons">
          Icon Button
          <span slot="startIcon" class="oj-ux-ico-information"></span>
        </oj-button>
        <oj-button id="icon_button2">
          <span slot="startIcon" class="oj-ux-ico-avatar"></span>
          Start Slot
        </oj-button>
        <oj-button id="icon_button3">
          <span slot="endIcon" class="oj-ux-ico-avatar"></span>
          End Slot
        </oj-button>
        <oj-button id="icon_button4" display="label">
          <span slot="startIcon" class="oj-ux-ico-avatar"></span>
          <span slot="endIcon" class="oj-ux-ico-avatar"></span>
          Label Only Button
        </oj-button>
      </div>

      <h6>Disabled Button</h6>
      <div>
        <oj-button disabled={true} id="dis_button1">
          Disabled
        </oj-button>
        <oj-button disabled={true} display="icons" id="dis_button2">
          Disabled Icon
          <span slot="startIcon" class="oj-ux-ico-delete-circle"></span>
        </oj-button>
      </div>

      <h6>Chroming</h6>
      <div>
        <oj-button id="chroming_button1" chroming="borderless">
          Borderless
        </oj-button>
        <oj-button id="chroming_button2" chroming="outlined">
          Outlined
        </oj-button>
        <oj-button id="chroming_button3" chroming="solid">
          Solid
        </oj-button>
        <oj-button id="chroming_button4" chroming="callToAction">
          Call To Action
        </oj-button>
        <oj-button id="chroming_button5" chroming="danger">
          Danger
        </oj-button>
      </div>

      <h6>Sizes</h6>
      <div>
        <oj-button id="size_button1" class="oj-button-sm">
          Small
        </oj-button>
        <oj-button id="size_button2">Default</oj-button>
        <oj-button id="size_button3" class="oj-button-lg">
          Large
        </oj-button>
      </div>

      <h6>Button Width</h6>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel">
        <p>
          This panel has a button with class <code>oj-sm-width-full</code>.
        </p>
        <oj-button id="width_full_button" class="oj-sm-width-full" chroming="callToAction">
          Call To Action
        </oj-button>
      </div>

      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a button with class <code>oj-button-full-width</code> which should be used for a button that stretches to the edge.
          </p>
        </div>
        <oj-button id="stretch_to_edge_button" class="oj-button-full-width" chroming="callToAction">
          Call To Action
        </oj-button>
      </div>
    </div>
  );
};

export default Button;

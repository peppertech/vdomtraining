import "ojs/ojbutton";
import 'preact';
//import "ojs/ojbuttonset";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import "ojs/ojoption";

const ButtonSetMany = () => {
  return (
    <div id="buttons-container" class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Multiple Buttons</h6>
      <div>
        <oj-buttonset-many
          id="formatsetMultipleButtons"
          value={["bold", "italic"]}
          aria-label="Choose one or more format options."
        >
          <oj-option value="bold">Bold</oj-option>
          <oj-option value="italic">Italic</oj-option>
          <oj-option value="underline">Underline</oj-option>
        </oj-buttonset-many>
      </div>

      <h6>Toggle(Single Button)</h6>
      <oj-buttonset-many id="advancedWrapper" value={["advanced"]}>
        <oj-option value="advanced">Advanced mode</oj-option>
      </oj-buttonset-many>

      <h6>Buttonset Width</h6>
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a buttonset with class <code>oj-buttonset-width-auto</code> which should be used to make Buttonset Button's widths fit their contents.
          </p>
        </div>
        <oj-buttonset-many
          chroming="borderless"
          class="oj-buttonset-width-auto"
          id="formatsetWidth1"
          value={["bold", "italic"]}
          aria-label="Choose one or more format options."
        >
          <oj-option value="bold">Bold</oj-option>
          <oj-option value="italic">Italic</oj-option>
          <oj-option value="underline">Underline</oj-option>
        </oj-buttonset-many>
      </div>

      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a buttonset with class <code>oj-buttonset-width-equal</code> which should be used to make Buttonset Button's widths equal.
          </p>
        </div>
        <oj-buttonset-many
          chroming="borderless"
          class="oj-buttonset-width-equal"
          id="formatsetWidth2"
          value={["bold", "italic"]}
          aria-label="Choose one or more format options."
        >
          <oj-option value="bold">Bold</oj-option>
          <oj-option value="italic">Italic</oj-option>
          <oj-option value="underline">Underline</oj-option>
        </oj-buttonset-many>
      </div>

      <h6>Responsive</h6>
      <div class="oj-sm-margin-6x-bottom">
        <oj-buttonset-many
          id="itemset"
          value={["Home", "Library"]}
          class="oj-buttonset-width-auto"
          aria-label="Choose only one item."
        >
          <oj-option value="Home">
            <span slot="startIcon" class="oj-ux-ico-home"></span>
            Home
          </oj-option>
          <oj-option value="Library">
            <span slot="startIcon" class="oj-ux-ico-library"></span>
            Library
          </oj-option>
          <oj-option value="Applications">
            <span slot="startIcon" class="oj-ux-ico-apps"></span>
            Applications
          </oj-option>
        </oj-buttonset-many>
      </div>

      <h6>Labelled Buttonset</h6>
      <oj-label-value label-edge="top">
        <oj-label slot="label" id="mainlabelid">
          Drinks
        </oj-label>
        <oj-buttonset-many slot="value" id="buttonsetLabelDemoId" labelled-by="mainlabelid" value={["coffee", "tea"]}>
          <oj-option id="coffee" value="coffee">
            Coffee
          </oj-option>
          <oj-option id="tea" value="tea">
            Tea
          </oj-option>
          <oj-option id="juice" value="juice">
            Juice
          </oj-option>
        </oj-buttonset-many>
      </oj-label-value>
    </div>
  );
};

export default ButtonSetMany;

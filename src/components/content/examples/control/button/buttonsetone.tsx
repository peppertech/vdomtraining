import "ojs/ojbutton";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import "ojs/ojoption";
import 'preact';

const formatOptions = [
  { id: "bold", label: "Bold" },
  { id: "italic", label: "Italic" },
  { id: "underline", label: "Underline" },
];

const itemOptions = [
  { id: "Home", label: "Home", icon: "oj-ux-ico-home" },
  { id: "Library", label: "Library", icon: "oj-ux-ico-library" },
  { id: "Applications", label: "Applications", icon: "oj-ux-ico-apps" },
];

const drinkOptions = [
  { id: "coffee", value: "coffee", label: "Coffee" },
  { id: "tea", value: "tea", label: "Tea" },
  { id: "juice", value: "juice", label: "Juice" },
];

const ButtonSetOne = () => {
  return (
    <div id="buttons-container" class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Basic</h6>
      <div>
        <oj-buttonset-one id="setMultipleButtons" value="bold" aria-label="Choose only one format">
          {formatOptions.map((option) => (
            <oj-option key={option.id} value={option.id}>
              <span>{option.label}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>

      <h6>Buttonset Width</h6>
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a buttonset with class <code>oj-buttonset-width-auto</code> which should be used to make Buttonset Button's widths fit their contents.
          </p>
        </div>
        <oj-buttonset-one
          id="formatsetWidth1"
          value="bold"
          aria-label="Choose only one format"
          chroming="borderless"
          class="oj-buttonset-width-auto"
        >
          {formatOptions.map((option) => (
            <oj-option key={`auto-${option.id}`} value={option.id}>
              <span>{option.label}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>

      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a buttonset with class <code>oj-buttonset-width-equal</code> which should be used to make Buttonset Button's widths equal.
          </p>
        </div>
        <oj-buttonset-one
          id="formatsetWidth2"
          value="bold"
          aria-label="Choose only one format"
          chroming="borderless"
          class="oj-buttonset-width-equal"
        >
          {formatOptions.map((option) => (
            <oj-option key={`equal-${option.id}`} value={option.id}>
              <span>{option.label}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>

      <h6>Responsive</h6>
      <div class="oj-sm-margin-6x-bottom">
        <oj-buttonset-one
          id="itemset"
          class="oj-buttonset-width-auto"
          value="Home"
          aria-label="Choose only one item."
        >
          {itemOptions.map((option) => (
            <oj-option key={option.id} value={option.id}>
              <span slot="startIcon" class={option.icon}></span>
              <span>{option.label}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>

      <h6>Labelled Buttonset</h6>
      <oj-label-value label-edge="top">
        <oj-label slot="label" id="mainlabelid">
          Drinks
        </oj-label>
        <oj-buttonset-one slot="value" id="buttonsetLabelDemoId" labelled-by="mainlabelid" value="coffee">
          {drinkOptions.map((option) => (
            <oj-option key={option.id} id={option.id} value={option.value}>
              {option.label}
            </oj-option>
          ))}
        </oj-buttonset-one>
      </oj-label-value>
    </div>
  );
};

export default ButtonSetOne;

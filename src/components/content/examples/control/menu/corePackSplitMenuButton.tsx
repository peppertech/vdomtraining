import "oj-c/split-menu-button";
import 'preact';
import { ComponentProps,JSX } from 'preact';
import { useMemo,useState } from "preact/hooks";

type SplitMenuButtonProps = ComponentProps<"oj-c-split-menu-button">;
type SplitMenuButtonItem = NonNullable<SplitMenuButtonProps["items"]>[number];

const createIcon = (iconClass: string) => ({
  type: "class" as const,
  class: `oj-button-icon oj-start ${iconClass}`,
});

const createItems = (): SplitMenuButtonItem[] => [
  { key: "copy", label: "Copy", startIcon: createIcon("oj-ux-ico-copy") },
  { key: "duplicate", label: "Duplicate", startIcon: createIcon("oj-ux-ico-copy-all") },
  { type: "separator" },
  { key: "rename", label: "Rename", startIcon: createIcon("oj-ux-ico-edit") },
  { key: "archive", label: "Archive", startIcon: createIcon("oj-ux-ico-archive") },
];

const CorePackSplitMenuButton = () => {
  const [buttonLabel, setButtonLabel] = useState("Primary Action");
  const splitMenuItems = useMemo(createItems, []);
  const buttonRowStyle: JSX.CSSProperties = { gap: "5px" };

  return (
    <div id="buttons-container" class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Split Menu Button</h6>
      <div class="oj-sm-margin-4x-bottom">
        <oj-c-split-menu-button
          id="button1"
          label={buttonLabel}
          items={splitMenuItems}
          onojAction={() => {
            setButtonLabel("Primary Invoked");
          }}
          onojMenuAction={(event) => {
            const key = event.detail.key ?? "Unknown";
            setButtonLabel(`Selected: ${key}`);
          }}
        ></oj-c-split-menu-button>
      </div>

      <h6>Disabled Button</h6>
      <div class="oj-sm-margin-4x-bottom">
        <oj-c-split-menu-button id="dis_button1" label="Disabled" items={splitMenuItems} disabled></oj-c-split-menu-button>
      </div>

      <h6>Chroming</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x oj-sm-margin-4x-bottom" style={buttonRowStyle}>
        <oj-c-split-menu-button id="chroming_button1" label="Outlined" chroming="outlined" items={splitMenuItems}></oj-c-split-menu-button>
        <oj-c-split-menu-button id="chroming_button2" label="Solid" chroming="solid" items={splitMenuItems}></oj-c-split-menu-button>
        <oj-c-split-menu-button
          id="chroming_button3"
          label="Call To Action"
          chroming="callToAction"
          items={splitMenuItems}
        ></oj-c-split-menu-button>
      </div>

      <h6>Sizes</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x oj-sm-margin-4x-bottom" style={buttonRowStyle}>
        <oj-c-split-menu-button id="size_button1" size="sm" label="Small" items={splitMenuItems}></oj-c-split-menu-button>
        <oj-c-split-menu-button id="size_button2" label="Default" items={splitMenuItems}></oj-c-split-menu-button>
        <oj-c-split-menu-button id="size_button3" size="md" label="Medium" items={splitMenuItems}></oj-c-split-menu-button>
        <oj-c-split-menu-button id="size_button4" size="lg" label="Large" items={splitMenuItems}></oj-c-split-menu-button>
      </div>

      <h6>Tooltip</h6>
      <div>
        <oj-c-split-menu-button
          id="tooltip_button"
          label="Tooltip Split Menu Button"
          tooltip="Tooltip"
          items={splitMenuItems}
        ></oj-c-split-menu-button>
      </div>
    </div>
  );
};

export default CorePackSplitMenuButton;

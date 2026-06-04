import { h, ComponentProps, JSX } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojtoolbar";
import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojoption";
import "ojs/ojmenu";
import "oj-c/button";
import "oj-c/menu-button";
import "oj-c/split-menu-button";
import "oj-c/toggle-button";
import "oj-c/progress-button";

type MenuProps = ComponentProps<"oj-menu">;
type MenuActionEvent = Parameters<NonNullable<MenuProps["onojMenuAction"]>>[0];

type MenuItem = {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
};

const fileMenuItems: MenuItem[] = [
  { id: "save", label: "Save", icon: "oj-ux-ico-save" },
  { id: "print", label: "Print", icon: "oj-ux-ico-print" },
  { id: "share", label: "Share", icon: "oj-ux-ico-share" },
  { id: "separator", label: "separator" },
  { id: "disabled", label: "Export", icon: "oj-ux-ico-download", disabled: true },
];

type CMenuButtonItem = NonNullable<ComponentProps<"oj-c-menu-button">["items"]>[number];
type CSplitMenuButtonItem = NonNullable<ComponentProps<"oj-c-split-menu-button">["items"]>[number];
type ButtonsetItem = { id: string; icon: string };

const cMenuButtonItems: CMenuButtonItem[] = [
  { key: "zoomIn", label: "Zoom In" },
  { key: "zoomOut", label: "Zoom Out" },
  { key: "reset", label: "Reset" },
];

const cSplitMenuButtonItems: CSplitMenuButtonItem[] = [
  { key: "copy", label: "Copy", type: "item" },
  { key: "duplicate", label: "Duplicate", type: "item" },
  { type: "separator" },
  { key: "archive", label: "Archive", type: "item" },
];

const buttonsetItems: ButtonsetItem[] = [
  { id: "bold", icon: "oj-ux-ico-bold" },
  { id: "italic", icon: "oj-ux-ico-italics" },
  { id: "underline", icon: "oj-ux-ico-underline" },
];

const ToolbarDemo = () => {
  const [progressLoading, setProgressLoading] = useState(false);
  const [cSplitLabel, setCSplitLabel] = useState("Review");

  const handleMenuAction = (event: MenuActionEvent) => {
    const selectedValue = event.detail.selectedValue ?? "None";
    window.console.log(`Toolbar menu action: ${selectedValue}`);
  };

  const handleProgressAction: ComponentProps<"oj-c-progress-button">["onojAction"] = () => {
    if (progressLoading) return;
    setProgressLoading(true);
    window.setTimeout(() => setProgressLoading(false), 2000);
  };

  const splitItems = useMemo(() => cSplitMenuButtonItems, []);
  const menuItems = useMemo(() => fileMenuItems, []);
  const iconButtons = useMemo(() => buttonsetItems, []);

  const toolbarRowStyle: JSX.CSSProperties = { gap: "5px" };

  return (
    <div id="toolbar-container">
      <h6>Toolbar with Borderless Chroming</h6>
      <oj-toolbar id="toolbarBorderless" aria-label="Editing Toolbar" aria-controls="controlled">
        <oj-button id="chat" display="icons">
          <span slot="startIcon" class="oj-ux-ico-chat"></span>
          Chat
        </oj-button>
        <oj-c-button id="paint" display="icons" label="Paint">
          <span slot="startIcon" class="oj-ux-ico-color-palette"></span>
        </oj-c-button>
        <oj-button id="bookmark" display="icons" disabled>
          <span slot="startIcon" class="oj-ux-ico-bookmark-selected"></span>
          Bookmark
        </oj-button>

        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"></span>

        <oj-menu-button id="menuButton">
          File
          <oj-menu id="menuFile" slot="menu" aria-label="menu with actions" onojMenuAction={handleMenuAction}>
            {menuItems.map((item) =>
              item.label === "separator" ? (
                <oj-option key={item.id}>---</oj-option>
              ) : (
                <oj-option key={item.id} id={item.id} value={item.label} disabled={item.disabled}>
                  {item.icon ? <span slot="startIcon" class={item.icon}></span> : null}
                  {item.label}
                </oj-option>
              ),
            )}
          </oj-menu>
        </oj-menu-button>

        <oj-c-menu-button id="cMenuButton" label="View" items={cMenuButtonItems}></oj-c-menu-button>
        <oj-c-split-menu-button
          id="cSplitMenuButton"
          label={cSplitLabel}
          chroming="outlined"
          items={splitItems}
          onojMenuAction={(event) => {
            const key = event.detail.key ?? "None";
            setCSplitLabel(`Selected: ${key}`);
          }}
        ></oj-c-split-menu-button>

        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"></span>

        <oj-buttonset-many id="iconset" display="icons" focus-management="none">
          {iconButtons.map((button) => (
            <oj-option key={button.id} value={button.id}>
              <span slot="startIcon" class={button.icon}></span>
              <span>{button.id}</span>
            </oj-option>
          ))}
        </oj-buttonset-many>

        <oj-c-toggle-button id="toggle1" display="icons" label="Icon Toggle">
          <span slot="startIcon" class="oj-ux-ico-information"></span>
        </oj-c-toggle-button>

        <oj-c-progress-button
          id="progress1"
          label="Approve"
          is-loading={progressLoading}
          onojAction={handleProgressAction}
        ></oj-c-progress-button>
      </oj-toolbar>
      <div class="oj-typography-body-sm oj-sm-margin-2x-top">
        Note: split menu button doesn't support borderless chroming.
      </div>

      <h6 class="oj-sm-margin-6x-top">Toolbar with Outlined Chroming</h6>
      <oj-toolbar id="toolbarOutlined" aria-label="Editing Toolbar" aria-controls="controlled" chroming="outlined">
        <oj-button id="chatOutlined" display="icons">
          <span slot="startIcon" class="oj-ux-ico-chat"></span>
          Chat
        </oj-button>
        <oj-c-button id="paintOutlined" display="icons" label="Paint">
          <span slot="startIcon" class="oj-ux-ico-color-palette"></span>
        </oj-c-button>
        <oj-button id="bookmarkOutlined" display="icons" disabled>
          <span slot="startIcon" class="oj-ux-ico-bookmark-selected"></span>
          Bookmark
        </oj-button>

        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"></span>

        <oj-menu-button id="menuButtonOutlined">
          File
          <oj-menu id="menuFileOutlined" slot="menu" aria-label="menu with actions" onojMenuAction={handleMenuAction}>
            {menuItems.map((item) =>
              item.label === "separator" ? (
                <oj-option key={item.id}>---</oj-option>
              ) : (
                <oj-option key={item.id} id={item.id} value={item.label} disabled={item.disabled}>
                  {item.icon ? <span slot="startIcon" class={item.icon}></span> : null}
                  {item.label}
                </oj-option>
              ),
            )}
          </oj-menu>
        </oj-menu-button>

        <oj-c-menu-button id="cMenuButtonOutlined" label="View" items={cMenuButtonItems}></oj-c-menu-button>
        <oj-c-split-menu-button
          id="cSplitMenuButtonOutlined"
          label="Review"
          items={splitItems}
        ></oj-c-split-menu-button>

        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"></span>

        <oj-buttonset-many id="iconsetOutlined" display="icons" focus-management="none">
          {iconButtons.map((button) => (
            <oj-option key={button.id} value={button.id}>
              <span slot="startIcon" class={button.icon}></span>
              <span>{button.id}</span>
            </oj-option>
          ))}
        </oj-buttonset-many>

        <oj-c-toggle-button id="toggleOutlined" display="icons" label="Icon Toggle">
          <span slot="startIcon" class="oj-ux-ico-information"></span>
        </oj-c-toggle-button>

        <oj-c-progress-button
          id="progressOutlined"
          label="Approve"
          is-loading={progressLoading}
          onojAction={handleProgressAction}
        ></oj-c-progress-button>
      </oj-toolbar>

      <div class="oj-sm-margin-6x-top oj-typography-body-sm">
        <a id="controlled" href="#">
          Element referenced by toolbar&apos;s aria-controls
        </a>
      </div>
    </div>
  );
};

export default ToolbarDemo;

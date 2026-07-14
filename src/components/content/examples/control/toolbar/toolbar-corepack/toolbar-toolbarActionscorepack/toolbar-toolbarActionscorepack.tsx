import "css!./demo.css";
import "oj-c/toolbar";
import type { CToolbarElement } from "oj-c/toolbar";
import { Toolbar } from "oj-c/toolbar";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";

type ToolbarItems = NonNullable<ComponentProps<typeof Toolbar>["items"]>;

const createToolbarItems = (isLoading: boolean, onProgressAction: () => void): ToolbarItems => [
  {
    type: "button",
    key: "button1",
    label: "Undo",
    display: "icons",
    startIcon: { class: "oj-ux-ico-undo" }
  },
  {
    type: "button",
    key: "button2",
    label: "Redo",
    display: "icons",
    startIcon: { class: "oj-ux-ico-redo" },
    disabled: true
  },
  { type: "separator" },
  {
    type: "menu-button",
    label: "View",
    items: [
      { type: "item", label: "Zoom In", key: "zoomin", startIcon: { class: "oj-ux-ico-zoom-in" } },
      {
        type: "item",
        label: "Zoom Out",
        key: "zoomout",
        startIcon: { class: "oj-ux-ico-zoom-out" },
        disabled: true
      },
      { type: "divider" },
      {
        type: "submenu",
        label: "List Style",
        items: [
          {
            type: "selectsingle",
            key: "listStyle",
            items: [
              {
                label: "Numbered List",
                value: "numberedList",
                endIcon: { class: "oj-ux-ico-number-list" }
              },
              {
                label: "Bulleted List",
                value: "bulletedList",
                endIcon: { class: "oj-ux-ico-bullets" }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: "split-menu-button",
    key: "splitMenuButton1",
    label: "Edit",
    items: [
      { type: "item", label: "Copy", key: "copy" },
      { type: "item", label: "Cut", key: "cut" },
      { type: "item", label: "Paste", key: "paste", disabled: true },
      { type: "divider" },
      { type: "item", label: "Undo", key: "undo" }
    ]
  },
  { type: "separator" },
  {
    type: "buttonset-single",
    key: "buttonset1",
    display: "icons",
    items: [
      { label: "Align Left", value: "alignLeft", startIcon: { class: "oj-ux-ico-align-left" } },
      {
        label: "Align Center",
        value: "alignCenter",
        startIcon: { class: "oj-ux-ico-align-center" }
      },
      {
        label: "Align Right",
        value: "alignRight",
        startIcon: { class: "oj-ux-ico-align-right" }
      }
    ]
  },
  {
    type: "buttonset-multiple",
    key: "buttonset2",
    display: "icons",
    items: [
      { label: "Bold", value: "bold", startIcon: { class: "oj-ux-ico-bold" } },
      { label: "Italics", value: "italics", startIcon: { class: "oj-ux-ico-italics" } },
      {
        label: "Underline",
        value: "underline",
        startIcon: { class: "oj-ux-ico-underline" }
      }
    ]
  },
  {
    type: "toggle-button",
    key: "toggleButton1",
    display: "icons",
    label: "Link",
    startIcon: { class: "oj-ux-ico-link" }
  },
  {
    type: "progress-button",
    key: "progressButton1",
    onAction: onProgressAction,
    display: "icons",
    label: "Save",
    startIcon: { class: "oj-ux-ico-save" },
    isLoading
  }
];

export const ToolbarToolbarActionscorepack = () => {
  const [toolbarAction, setToolbarAction] = useState("(No action performed)");
  const [loading, setLoading] = useState(false);

  const progressHandler = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  const toolbarItems = useMemo(() => createToolbarItems(loading, progressHandler), [loading]);

  const actionHandler = (event: CToolbarElement.ojToolbarAction) => {
    setToolbarAction(event.detail.key ? event.detail.key.toString() : "no key available");
  };

  return (
    <div id="toolbar-container">
      <oj-c-toolbar
        aria-label="Editing Toolbar"
        aria-controls="toolbarAction"
        spacing="lg"
        items={toolbarItems}
        onojToolbarAction={actionHandler}
      />
      <div class="oj-typography-body-md oj-typography-bold oj-sm-margin-5x-top">
        ToolbarAction, Last action item pressed: <span id="toolbarAction">{toolbarAction}</span>
      </div>
    </div>
  );
};

export default ToolbarToolbarActionscorepack;

import type { ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import "css!./demo.css";
import "oj-c/toolbar";
import { Toolbar } from "oj-c/toolbar";
import "oj-c/radioset";
import "oj-c/form-layout";

type ToolbarItems = NonNullable<ComponentProps<typeof Toolbar>["items"]>;
type ToolbarSpacing = NonNullable<ComponentProps<typeof Toolbar>["spacing"]>;
type ToolbarSize = NonNullable<ComponentProps<typeof Toolbar>["size"]>;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const toolbarSpacingItems: Array<{ value: ToolbarSpacing; label: string }> = [
  { value: "lg", label: "lg (default)" },
  { value: "sm", label: "sm" }
];

const toolbarSizeItems: Array<{ value: ToolbarSize; label: string }> = [
  { value: "sm", label: "sm" },
  { value: "md", label: "md (default)" },
  { value: "lg", label: "lg" }
];

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

export const ToolbarOverviewcorepack = () => {
  const [spacing, setSpacing] = useState<ToolbarSpacing>("lg");
  const [size, setSize] = useState<ToolbarSize>("md");
  const [loading, setLoading] = useState(false);

  const progressHandler = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  const toolbarItems = useMemo(() => createToolbarItems(loading, progressHandler), [loading]);

  const handleSpacingChanged = (event: RadioValueChangedEvent) => {
    if (event.detail.value === "lg" || event.detail.value === "sm") {
      setSpacing(event.detail.value);
    }
  };

  const handleSizeChanged = (event: RadioValueChangedEvent) => {
    if (event.detail.value === "sm" || event.detail.value === "md" || event.detail.value === "lg") {
      setSize(event.detail.value);
    }
  };

  return (
    <div id="toolbar-container">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout maxColumns={2} direction="row">
          <oj-c-radioset
            direction="row"
            value={spacing}
            labelHint="Toolbar Spacing Options"
            options={toolbarSpacingItems}
            onvalueChanged={handleSpacingChanged}
          />
          <oj-c-radioset
            direction="row"
            value={size}
            labelHint="Toolbar Size Options"
            options={toolbarSizeItems}
            onvalueChanged={handleSizeChanged}
          />
        </oj-c-form-layout>
      </div>
      <oj-c-toolbar aria-label="Editing Toolbar" size={size} spacing={spacing} items={toolbarItems} />
      <br />
      <h6>Toolbar with Borderless Chroming and 'sm' Spacing</h6>
      <oj-c-toolbar
        aria-label="Editing Toolbar"
        spacing="sm"
        chroming="borderless"
        items={toolbarItems}
      />
      <div class="oj-typography-body-sm oj-sm-margin-2x-top">
        Note: split menu button doesn't support borderless chroming.
      </div>
    </div>
  );
};

export default ToolbarOverviewcorepack;

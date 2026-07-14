import "oj-c/checkbox";
import "oj-c/form-layout";
import "oj-c/toolbar";
import { Toolbar } from "oj-c/toolbar";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";

type ToolbarItems = NonNullable<ComponentProps<typeof Toolbar>["items"]>;
type CheckboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-checkbox">["onvalueChanged"]>
>[0];

const createToolbarItems = (
  removeContent: boolean,
  disableContent: boolean,
  isLoading: boolean,
  onProgressAction: () => void
): ToolbarItems =>
  [
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
      disabled: disableContent,
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
    ...(!removeContent
      ? ([
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
          }
        ] satisfies ToolbarItems)
      : []),
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
    ...(!removeContent
      ? ([
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
          }
        ] satisfies ToolbarItems)
      : []),
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
  ] as ToolbarItems;

export const ToolbarModifyContentcorepack = () => {
  const [removeContentState, setRemoveContentState] = useState(false);
  const [disableContentState, setDisableContentState] = useState(false);
  const [loading, setLoading] = useState(false);

  const progressHandler = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  const toolbarItems = useMemo(
    () => createToolbarItems(removeContentState, disableContentState, loading, progressHandler),
    [removeContentState, disableContentState, loading]
  );

  const handleRemoveContentChanged = (event: CheckboxValueChangedEvent) => {
    setRemoveContentState(Boolean(event.detail.value));
  };

  const handleDisableContentChanged = (event: CheckboxValueChangedEvent) => {
    setDisableContentState(Boolean(event.detail.value));
  };

  return (
    <div id="toolbar-container">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout maxColumns={2} direction="row">
          <oj-c-checkbox
            id="removeContent"
            value={removeContentState}
            onvalueChanged={handleRemoveContentChanged}
          >
            Remove Content
          </oj-c-checkbox>
          <oj-c-checkbox
            id="disableContent"
            value={disableContentState}
            onvalueChanged={handleDisableContentChanged}
          >
            Disable Content
          </oj-c-checkbox>
        </oj-c-form-layout>
      </div>
      <oj-c-toolbar aria-label="Editing Toolbar" spacing="lg" items={toolbarItems} />
    </div>
  );
};

export default ToolbarModifyContentcorepack;

import "css!./demo.css";
import "oj-c/form-layout";
import "oj-c/radioset";
import "oj-c/tab-bar";
import type { TabData } from "oj-c/tab-bar";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";

type TabKey = "payslip" | "procurement" | "expenses" | "admin" | "tools";
type Edge = NonNullable<ComponentProps<"oj-c-tab-bar">["edge"]>;
type TabBarContextMenuConfig = NonNullable<ComponentProps<"oj-c-tab-bar">["contextMenuConfig"]>;
type SelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-tab-bar">["onselectionChanged"]>
>[0];
type ReorderEvent = Parameters<NonNullable<ComponentProps<"oj-c-tab-bar">["onojReorder"]>>[0];
type RemoveEvent = Parameters<NonNullable<ComponentProps<"oj-c-tab-bar">["onojRemove"]>>[0];
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const edgeOptions = [
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" }
];

const initialTabs: TabData<TabKey>[] = [
  { label: "Payslip", itemKey: "payslip", isRemovable: true },
  { label: "Procurement", itemKey: "procurement", isRemovable: true },
  { label: "Expenses", itemKey: "expenses", isRemovable: true },
  { label: "Admin", itemKey: "admin", isRemovable: false },
  { label: "Tools", itemKey: "tools", isRemovable: false }
];

export const TabBarContextMenucorepack = () => {
  const [data, setData] = useState<TabData<TabKey>[]>(initialTabs);
  const [edge, setEdge] = useState<Edge>("top");
  const [selectedItem, setSelectedItem] = useState<TabKey>("payslip");
  const [launchedFromItem, setLaunchedFromItem] = useState("None launched yet");
  const [selectedMenuItem, setSelectedMenuItem] = useState("None selected yet");
  const [selectedSubMenuItem, setSelectedSubMenuItem] = useState("None selected yet");

  const contextMenuConfig = useMemo<TabBarContextMenuConfig>(
    () => ({
      items: (context) => {
        const tabItem = data.find(
          (item) => item.itemKey === context.itemKey
        );
        setLaunchedFromItem(tabItem?.label ?? "");

        const isAdmin = context.itemKey === "admin";
        return [
          ...(isAdmin
            ? [
                {
                  label: "Settings",
                  key: "settings",
                  onAction: () => setSelectedMenuItem("settings")
                }
              ]
            : []),
          {
            label: "Print",
            key: "print",
            onAction: () => setSelectedMenuItem("print")
          },
          {
            label: "View",
            key: "view",
            onAction: () => setSelectedMenuItem("view")
          },
          ...(context.hasDefaultMenuItems ? [{ type: "separator" as const }] : []),
          "defaultMenuItems",
          {
            type: "submenu" as const,
            label: "Move to",
            key: "moveto",
            items: [
              {
                label: "Inbox",
                key: "inbox",
                startIcon: { class: "oj-ux-ico-inbox" },
                onAction: () => setSelectedSubMenuItem("inbox")
              },
              {
                label: "Archive",
                key: "archive",
                startIcon: { class: "oj-ux-ico-archive" },
                onAction: () => setSelectedSubMenuItem("archive")
              }
            ]
          }
        ];
      },
      accessibleLabel: "actions"
    }),
    [data]
  );

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    setSelectedItem(String(event.detail.value) as TabKey);
  };

  const handleReorder = (event: ReorderEvent) => {
    const reorderedKeys = event.detail.reorderedKeys.map((key) => String(key));
    setData((currentData) =>
      [...currentData].sort((sourceTab, destinationTab) => {
        const sourceIndex = reorderedKeys.indexOf(String(sourceTab.itemKey));
        const destinationIndex = reorderedKeys.indexOf(String(destinationTab.itemKey));
        return sourceIndex - destinationIndex;
      })
    );
  };

  const handleRemove = (event: RemoveEvent) => {
    const removedKey = String(event.detail.key) as TabKey;
    setData((currentData) => currentData.filter((item) => item.itemKey !== removedKey));
    if (selectedItem === removedKey) {
      const nextTab = data.find((item) => item.itemKey !== removedKey);
      if (nextTab) {
        setSelectedItem(nextTab.itemKey);
      }
    }
  };

  const handleEdgeChanged = (event: RadioValueChangedEvent) => {
    if (event.detail.value === "top" || event.detail.value === "bottom") {
      setEdge(event.detail.value);
    }
  };

  return (
    <div id="tab-bar-container">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout maxColumns={4} direction="row">
          <oj-c-radioset
            id="edgeRadioId"
            value={edge}
            labelHint="Edge"
            labelEdge="inside"
            options={edgeOptions}
            onvalueChanged={handleEdgeChanged}
          />
        </oj-c-form-layout>
      </div>

      <oj-c-tab-bar
        data={data}
        selection={selectedItem}
        edge={edge}
        reorderable="enabled"
        onselectionChanged={handleSelectionChanged}
        onojReorder={handleReorder}
        onojRemove={handleRemove}
        contextMenuConfig={contextMenuConfig}
      />

      <div class="oj-sm-margin-4x-top">
        <p>
          Last selected menu action: <span id="selected">{selectedMenuItem}</span>
        </p>
        <p>
          Last selected sub menu action: <span id="selectedSelection">{selectedSubMenuItem}</span>
        </p>
        <p>
          Launched from: <span id="launched">{launchedFromItem}</span>
        </p>
      </div>
    </div>
  );
};

export default TabBarContextMenucorepack;

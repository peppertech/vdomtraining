import "oj-c/button";
import "oj-c/checkbox";
import "oj-c/dialog";
import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/tab-bar";
import type { TabData } from "oj-c/tab-bar";
import type { ComponentProps } from "preact";
import { useRef,useState } from "preact/hooks";

type InitialTabKey = "settings" | "tools" | "base" | "environment" | "security";
type DynamicTabKey = `tid${number}`;
type TabKey = InitialTabKey | DynamicTabKey;
type TabBarProps = ComponentProps<"oj-c-tab-bar">;
type CheckboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-checkbox">["onvalueChanged"]>
>[0];
type DialogOpenedChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-dialog">["onopenedChanged"]>
>[0];
type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-text">["onvalueChanged"]>
>[0];
type RemoveEvent = Parameters<NonNullable<TabBarProps["onojRemove"]>>[0];
type SelectionChangedEvent = Parameters<NonNullable<TabBarProps["onselectionChanged"]>>[0];
type TabItem = TabData<TabKey>;

const initialTabs: TabItem[] = [
  { label: "Settings", itemKey: "settings" },
  { label: "Tools", itemKey: "tools", isRemovable: true },
  { label: "Base", itemKey: "base", isRemovable: true },
  { label: "Environment", itemKey: "environment" },
  { label: "Security", itemKey: "security", isRemovable: true }
];

const createNextSelection = (
  currentTabs: TabItem[],
  nextTabs: TabItem[],
  removedKey: TabKey,
  selectedItem: TabKey
): TabKey => {
  if (selectedItem !== removedKey) {
    return selectedItem;
  }

  const removedIndex = currentTabs.findIndex((item) => item.itemKey === removedKey);
  const fallbackTab =
    nextTabs[removedIndex] ?? nextTabs[removedIndex - 1] ?? nextTabs[0] ?? initialTabs[0];

  return fallbackTab.itemKey;
};

export const TabBarAddAndRemovecorepack = () => {
  const nextIdRef = useRef(1);
  const [tabs, setTabs] = useState<TabItem[]>(initialTabs);
  const [selectedItem, setSelectedItem] = useState<TabKey>("settings");
  const [newTabTitle, setNewTabTitle] = useState("Tab 1");
  const [isContrastBackground, setIsContrastBackground] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const [accInfo, setAccInfo] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const tabbarContainerClass = `tabbarcontainer oj-sm-margin-1x-top oj-sm-margin-4x-bottom${
    isContrastBackground ? " oj-bg-neutral-170 oj-color-invert" : ""
  }`;

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    setSelectedItem(event.detail.value as TabKey);
  };

  const handleCondenseChanged = (event: CheckboxValueChangedEvent) => {
    setIsCondensed(Boolean(event.detail.value));
  };

  const handleContrastChanged = (event: CheckboxValueChangedEvent) => {
    setIsContrastBackground(Boolean(event.detail.value));
  };

  const handleDialogOpenedChanged = (event: DialogOpenedChangedEvent) => {
    setIsDialogOpen(Boolean(event.detail.value));
  };

  const handleNewTabTitleChanged = (event: InputTextValueChangedEvent) => {
    setNewTabTitle((event.detail.value as string | null) ?? "");
  };

  const handleOpenDialog = () => {
    const nextLabel = `Tab ${nextIdRef.current + 1}`;
    setNewTabTitle(nextLabel);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddTab = () => {
    const trimmedTitle = newTabTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    nextIdRef.current += 1;
    const tabKey = `tid${nextIdRef.current}` as DynamicTabKey;
    const newTab: TabItem = {
      itemKey: tabKey,
      label: trimmedTitle
    };

    setTabs((currentTabs) => [...currentTabs, newTab]);
    setSelectedItem(tabKey);
    setAccInfo(`Added ${trimmedTitle}`);
    setIsDialogOpen(false);
  };

  const handleRemove = (event: RemoveEvent) => {
    const removedKey = event.detail.key as TabKey;
    let removedLabel = "";
    let nextSelection = selectedItem;

    setTabs((currentTabs) => {
      const removedTab = currentTabs.find((item) => item.itemKey === removedKey);
      if (!removedTab) {
        return currentTabs;
      }

      removedLabel = removedTab.label;
      const nextTabs = currentTabs.filter((item) => item.itemKey !== removedKey);
      nextSelection = createNextSelection(currentTabs, nextTabs, removedKey, selectedItem);
      return nextTabs;
    });

    setSelectedItem(nextSelection);
    if (removedLabel) {
      setAccInfo(`Removed ${removedLabel}`);
    }
  };

  return (
    <div id="tabbardemo">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout maxColumns={2} direction="row">
          <oj-c-checkbox id="condense" value={isCondensed} onvalueChanged={handleCondenseChanged}>
            Condense
          </oj-c-checkbox>
          <oj-c-checkbox
            id="contrastBgSwitch"
            value={isContrastBackground}
            onvalueChanged={handleContrastChanged}
          >
            Dark Background
          </oj-c-checkbox>
        </oj-c-form-layout>
      </div>

      <oj-c-dialog
        id="tabDialog"
        dialogTitle="Tab data"
        opened={isDialogOpen}
        launcher="#addTab"
        onopenedChanged={handleDialogOpenedChanged}
      >
        <div slot="body">
          <oj-c-form-layout>
            <oj-c-input-text
              id="new-tab-title"
              value={newTabTitle}
              labelHint="Title"
              labelEdge="inside"
              maxWidth="md"
              onvalueChanged={handleNewTabTitleChanged}
            />
          </oj-c-form-layout>
        </div>
        <div slot="footer">
          <oj-c-button id="idOK" onojAction={handleAddTab} disabled={!newTabTitle.trim()} label="OK" />
          <oj-c-button id="idCancel" onojAction={handleCloseDialog} label="Cancel" />
        </div>
      </oj-c-dialog>

      <oj-c-button id="addTab" onojAction={handleOpenDialog} label="Add Tab" />
      <div class={tabbarContainerClass}>
        <oj-c-tab-bar
          id="hnavlist"
          aria-label="Add and remove tabs"
          data={tabs}
          edge="top"
          layout={isCondensed ? "condense" : "stretch"}
          selection={selectedItem}
          onselectionChanged={handleSelectionChanged}
          onojRemove={handleRemove}
        />
        <div id="tabBarRemoveInfo" class="oj-helper-hidden-accessible" aria-live="polite">
          {accInfo}
        </div>
      </div>
      <div>
        <p class="bold">
          Last selected list item:
          <span id="results">{selectedItem}</span>
        </p>
      </div>
    </div>
  );
};

export default TabBarAddAndRemovecorepack;

import type { ComponentProps } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import "oj-c/tab-bar";
import type { TabLinkItemData } from "oj-c/tab-bar";

type TabKey = "home" | "support" | "cookbook";
type SelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-tab-bar">["onselectionChanged"]>
>[0];

const selectionParamName = "selection";

const readSelectionFromHash = (): TabKey => {
  const currentHash = window.location.hash;
  const queryText = currentHash.startsWith("#/?") ? currentHash.slice(3) : currentHash.replace(/^#/, "");
  const params = new URLSearchParams(queryText);
  const nextValue = params.get(selectionParamName);
  if (nextValue === "home" || nextValue === "support" || nextValue === "cookbook") {
    return nextValue;
  }
  return "home";
};

const updateHash = (selection: TabKey) => {
  const params = new URLSearchParams();
  params.set(selectionParamName, selection);
  window.location.hash = `/?${params.toString()}`;
};

export const TabBarLinkcorepack = () => {
  const [selection, setSelection] = useState<TabKey>(() => readSelectionFromHash());

  const tabData = useMemo<TabLinkItemData<TabKey>[]>(
    () => [
      { label: "Home", itemKey: "home", href: "#/?selection=home", tabPanelId: "pageContent" },
      {
        label: "Support",
        itemKey: "support",
        href: "#/?selection=support",
        tabPanelId: "pageContent"
      },
      {
        label: "Cookbook",
        itemKey: "cookbook",
        href: "#/?selection=cookbook",
        tabPanelId: "pageContent"
      }
    ],
    []
  );

  useEffect(() => {
    const handleHashChange = () => {
      setSelection(readSelectionFromHash());
    };

    if (!window.location.hash) {
      updateHash(selection);
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    const nextSelection = String(event.detail.value) as TabKey;
    setSelection(nextSelection);
    updateHash(nextSelection);
  };

  return (
    <div id="tab-bar-container">
      <oj-c-tab-bar
        data={tabData}
        selection={selection}
        onselectionChanged={handleSelectionChanged}
        aria-label="TabBar with link"
      />
      <hr />
      <div id="pageContent" class="oj-panel oj-bg-neutral-30" role="tabpanel" tabIndex={0}>
        <h3>
          <b>Router path:</b> {selection}
        </h3>
        <h3>
          <b>Path label:</b> {tabData.find((item) => item.itemKey === selection)?.label}
        </h3>
      </div>
    </div>
  );
};

export default TabBarLinkcorepack;

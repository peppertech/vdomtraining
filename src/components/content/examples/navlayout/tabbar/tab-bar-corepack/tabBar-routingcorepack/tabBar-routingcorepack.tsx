import type { ComponentProps } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import "oj-c/tab-bar";
import type { TabData } from "oj-c/tab-bar";

type RouteKey = "dashboard" | "incidents" | "customers" | "about";
type SelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-tab-bar">["onselectionChanged"]>
>[0];

const routeParamName = "route";

const routeData: TabData<RouteKey>[] = [
  { itemKey: "dashboard", label: "Dashboard" },
  { itemKey: "incidents", label: "Incidents" },
  { itemKey: "customers", label: "Customers" },
  { itemKey: "about", label: "About" }
];

const readRouteFromHash = (): RouteKey => {
  const currentHash = window.location.hash;
  const queryText = currentHash.startsWith("#/?") ? currentHash.slice(3) : currentHash.replace(/^#/, "");
  const params = new URLSearchParams(queryText);
  const nextValue = params.get(routeParamName);
  if (
    nextValue === "dashboard" ||
    nextValue === "incidents" ||
    nextValue === "customers" ||
    nextValue === "about"
  ) {
    return nextValue;
  }
  return "dashboard";
};

const updateRouteHash = (route: RouteKey) => {
  const params = new URLSearchParams();
  params.set(routeParamName, route);
  window.location.hash = `/?${params.toString()}`;
};

export const TabBarRoutingcorepack = () => {
  const [selection, setSelection] = useState<RouteKey>(() => readRouteFromHash());
  const routeLabel = useMemo(
    () => routeData.find((item) => item.itemKey === selection)?.label ?? "",
    [selection]
  );

  useEffect(() => {
    const handleHashChange = () => {
      setSelection(readRouteFromHash());
    };

    if (!window.location.hash) {
      updateRouteHash(selection);
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    const nextSelection = String(event.detail.value) as RouteKey;
    setSelection(nextSelection);
    updateRouteHash(nextSelection);
  };

  return (
    <div id="routing-container">
      <oj-c-tab-bar
        data={routeData}
        selection={selection}
        onselectionChanged={handleSelectionChanged}
        aria-label="TabBar with core router"
      />
      <hr />
      <div id="pageContent" class="oj-panel oj-bg-neutral-30" tabIndex={0}>
        <h3>
          <b>Router path:</b> {selection}
        </h3>
        <h3>
          <b>Path label:</b> {routeLabel}
        </h3>
      </div>
    </div>
  );
};

export default TabBarRoutingcorepack;

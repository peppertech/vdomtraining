import "oj-c/tab-bar-mixed";
import 'preact';
import type { ComponentProps } from "preact";
import { useEffect,useMemo,useState } from "preact/hooks";

type TabBarMixedProps = ComponentProps<"oj-c-tab-bar-mixed">;
type SelectionChangedEvent = Parameters<
  NonNullable<TabBarMixedProps["onselectionChanged"]>
>[0];
type RemoveEvent = Parameters<NonNullable<TabBarMixedProps["onojRemove"]>>[0];

const staticTabs = [
  {
    itemKey: "home",
    label: "Home",
    icon: {
      type: "class",
      class: "oj-ux-ico-home"
    }
  },
  {
    itemKey: "resources",
    label: "Resources",
    icon: {
      type: "class",
      class: "oj-ux-ico-library"
    }
  }
] satisfies NonNullable<TabBarMixedProps["staticTabs"]>;

const initialDynamicTabs = [
  { badge: 3, itemKey: "lisa", label: "Lisa Hernandez" },
  { itemKey: "tim", label: "Tim Anderson" },
  { itemKey: "stephanie", label: "Stephanie Kim" },
  { itemKey: "adam", label: "Adam Susanto" },
  { badge: 7, itemKey: "denis", label: "Denis Dorsey" },
  { itemKey: "lochlan", label: "Lochlan Camacho" },
  { badge: 1, itemKey: "izaak", label: "Izaak Calderon" },
  { itemKey: "nancy", label: "Nancy Richardson" }
] satisfies NonNullable<TabBarMixedProps["dynamicTabs"]>;

const getViewportWidth = () => (typeof window === "undefined" ? 1280 : innerWidth);

export const TabBarMixedResponsivecorepack = () => {
  const [dynamicTabs, setDynamicTabs] =
    useState<NonNullable<TabBarMixedProps["dynamicTabs"]>>(initialDynamicTabs);
  const [selection, setSelection] = useState("home");
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(getViewportWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsiveSettings = useMemo(() => {
    const isSmall = viewportWidth < 768;
    const isMedium = viewportWidth >= 768 && viewportWidth < 1280;

    return {
      dynamicTabsOverflow: isSmall ? "popup" : "conveyor" as NonNullable<TabBarMixedProps["dynamicTabsOverflow"]>,
      separatorPadding: isSmall ? "0rem" : isMedium ? "2rem" : "3rem",
      size: (isSmall ? "md" : "lg") as NonNullable<TabBarMixedProps["size"]>,
      staticTabsDisplay: (viewportWidth < 1280 ? "icons" : "standard") as NonNullable<
        TabBarMixedProps["staticTabsDisplay"]
      >
    };
  }, [viewportWidth]);

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    setSelection(String(event.detail.value));
  };

  const handleRemove = (event: RemoveEvent) => {
    setDynamicTabs((currentTabs) => currentTabs.filter((item) => item.itemKey !== event.detail.key));
  };

  return (
    <div id="tab-bar-mixed-container">
      <oj-c-tab-bar-mixed
        dynamicTabs={dynamicTabs}
        dynamicTabsOverflow={responsiveSettings.dynamicTabsOverflow}
        onojRemove={handleRemove}
        selection={selection}
        onselectionChanged={handleSelectionChanged}
        separatorPadding={responsiveSettings.separatorPadding}
        size={responsiveSettings.size}
        staticTabs={staticTabs}
        staticTabsDisplay={responsiveSettings.staticTabsDisplay}
      />
    </div>
  );
};

export default TabBarMixedResponsivecorepack;

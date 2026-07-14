import "oj-c/tab-bar";
import type { TabData } from "oj-c/tab-bar";
import * as ResponsiveUtils from "ojs/ojresponsiveutils";
import type { ComponentProps } from "preact";
import { useEffect,useState } from "preact/hooks";

type TabKey = "home" | "gettingstarted" | "cookbook" | "library";
type SelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-tab-bar">["onselectionChanged"]>
>[0];
type TabBarDisplay = NonNullable<ComponentProps<"oj-c-tab-bar">["display"]>;
type TabBarLayout = NonNullable<ComponentProps<"oj-c-tab-bar">["layout"]>;

const smQuery = ResponsiveUtils.getFrameworkQuery("sm-only") || "(max-width: 599px)";
const lgQuery = ResponsiveUtils.getFrameworkQuery("lg-up") || "(min-width: 1024px)";

const tabData: TabData<TabKey>[] = [
  {
    label: "Home",
    itemKey: "home",
    icon: {
      type: "class",
      class: "oj-ux-ico-home"
    }
  },
  {
    label: "Getting Started",
    itemKey: "gettingstarted",
    icon: {
      type: "class",
      class: "oj-ux-ico-education"
    }
  },
  {
    label: "Cookbook",
    itemKey: "cookbook",
    icon: {
      type: "class",
      class: "oj-ux-ico-book"
    }
  },
  {
    label: "Library",
    itemKey: "library",
    icon: {
      type: "class",
      class: "oj-ux-ico-library"
    }
  }
];

const getResponsiveState = () => ({
  isSmall: typeof window !== "undefined" ? matchMedia(smQuery).matches : false,
  isLarge: typeof window !== "undefined" ? matchMedia(lgQuery).matches : true
});

export const TabBarResponsivecorepack = () => {
  const [selectedItem, setSelectedItem] = useState<TabKey>("home");
  const [responsiveState, setResponsiveState] = useState(getResponsiveState);

  useEffect(() => {
    const smallMediaQuery = matchMedia(smQuery);
    const largeMediaQuery = matchMedia(lgQuery);
    const listener = () => setResponsiveState(getResponsiveState());

    smallMediaQuery.addEventListener("change", listener);
    largeMediaQuery.addEventListener("change", listener);
    return () => {
      smallMediaQuery.removeEventListener("change", listener);
      largeMediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    setSelectedItem(String(event.detail.value) as TabKey);
  };

  const display: TabBarDisplay = responsiveState.isSmall ? "icons" : "standard";
  const layout: TabBarLayout = responsiveState.isLarge ? "stretch" : "condense";

  return (
    <div id="tabbardemo">
      <oj-c-tab-bar
        selection={selectedItem}
        onselectionChanged={handleSelectionChanged}
        display={display}
        layout={layout}
        data={tabData}
        id="tabbar"
        aria-label="TabBar with responsive behavior"
      />
    </div>
  );
};

export default TabBarResponsivecorepack;

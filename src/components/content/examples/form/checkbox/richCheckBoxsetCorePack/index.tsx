import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojnavigationlist";
import { ojNavigationList } from "ojs/ojnavigationlist";
import 'preact';
import { type ComponentChildren,type FunctionComponent } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import RichCheckBoxsetCorePackBasicExample from "./richCheckBoxsetCorePack-basic";
import {
  richCheckBoxsetCorePackDocs,
  type RichCheckBoxsetCorePackDemoId,
} from "./richCheckBoxsetCorePack-docs";
import RichCheckBoxsetCorePackExactExample from "./richCheckBoxsetCorePack-exact";
import RichCheckBoxsetCorePackLayoutExample from "./richCheckBoxsetCorePack-layout";
import RichCheckBoxsetCorePackMaximumExample from "./richCheckBoxsetCorePack-maximum";
import RichCheckBoxsetCorePackMinimumExample from "./richCheckBoxsetCorePack-minimum";
import RichCheckBoxsetCorePackOverviewExample from "./richCheckBoxsetCorePack-overview";
import RichCheckBoxsetCorePackRangeExample from "./richCheckBoxsetCorePack-range";
import RichCheckBoxsetCorePackUserAssistanceExample from "./richCheckBoxsetCorePack-userAssistance";
import richCheckBoxsetCorePackBasicPlaygroundSource from "./richCheckBoxsetCorePack-basic-source";
import richCheckBoxsetCorePackExactPlaygroundSource from "./richCheckBoxsetCorePack-exact-source";
import richCheckBoxsetCorePackLayoutPlaygroundSource from "./richCheckBoxsetCorePack-layout-source";
import richCheckBoxsetCorePackMaximumPlaygroundSource from "./richCheckBoxsetCorePack-maximum-source";
import richCheckBoxsetCorePackMinimumPlaygroundSource from "./richCheckBoxsetCorePack-minimum-source";
import richCheckBoxsetCorePackOverviewPlaygroundSource from "./richCheckBoxsetCorePack-overview-source";
import richCheckBoxsetCorePackRangePlaygroundSource from "./richCheckBoxsetCorePack-range-source";
import richCheckBoxsetCorePackUserAssistancePlaygroundSource from "./richCheckBoxsetCorePack-userAssistance-source";
import {
  avatarOptions,
  confirmationMessages,
  controlStateOptions,
  errorMessages,
  iconOptions,
  industryOptions,
  infoMessages,
  noMediaOptions,
  warningMessages,
} from "./richCheckBoxsetCorePack-shared";

type RichCheckBoxsetCorePackNavItem = {
  id: RichCheckBoxsetCorePackDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
  playground?: PlaygroundConfig;
};

const richCheckBoxsetCorePackNavItems: RichCheckBoxsetCorePackNavItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: richCheckBoxsetCorePackDocs.overview.description,
    recipe: richCheckBoxsetCorePackDocs.overview.recipe,
    Component: RichCheckBoxsetCorePackOverviewExample,
    playground: {
      initialSource: richCheckBoxsetCorePackOverviewPlaygroundSource,
      fileName: "richCheckBoxsetCorePack-overview.tsx",
      runtimeBindings: {
        confirmationMessages,
        errorMessages,
        industryOptions,
        infoMessages,
        warningMessages,
      },
    },
  },
  {
    id: "basic",
    name: "Basic",
    description: richCheckBoxsetCorePackDocs.basic.description,
    recipe: richCheckBoxsetCorePackDocs.basic.recipe,
    Component: RichCheckBoxsetCorePackBasicExample,
    playground: {
      initialSource: richCheckBoxsetCorePackBasicPlaygroundSource,
      fileName: "richCheckBoxsetCorePack-basic.tsx",
      runtimeBindings: {
        industryOptions,
      },
    },
  },
  {
    id: "layout",
    name: "Layout and Media",
    description: richCheckBoxsetCorePackDocs.layout.description,
    recipe: richCheckBoxsetCorePackDocs.layout.recipe,
    Component: RichCheckBoxsetCorePackLayoutExample,
    playground: {
      initialSource: richCheckBoxsetCorePackLayoutPlaygroundSource,
      fileName: "richCheckBoxsetCorePack-layout.tsx",
      runtimeBindings: {
        avatarOptions,
        iconOptions,
        industryOptions,
        noMediaOptions,
      },
    },
  },
  {
    id: "user-assistance",
    name: "User Assistance",
    description: richCheckBoxsetCorePackDocs["user-assistance"].description,
    recipe: richCheckBoxsetCorePackDocs["user-assistance"].recipe,
    Component: RichCheckBoxsetCorePackUserAssistanceExample,
    playground: {
      initialSource: richCheckBoxsetCorePackUserAssistancePlaygroundSource,
      fileName: "richCheckBoxsetCorePack-userAssistance.tsx",
      runtimeBindings: {
        avatarOptions,
        controlStateOptions,
      },
    },
  },
  {
    id: "minimum",
    name: "Minimum Selection",
    description: richCheckBoxsetCorePackDocs.minimum.description,
    recipe: richCheckBoxsetCorePackDocs.minimum.recipe,
    Component: RichCheckBoxsetCorePackMinimumExample,
    playground: {
      initialSource: richCheckBoxsetCorePackMinimumPlaygroundSource,
      fileName: "richCheckBoxsetCorePack-minimum.tsx",
      runtimeBindings: {
        avatarOptions,
      },
    },
  },
  {
    id: "maximum",
    name: "Maximum Selection",
    description: richCheckBoxsetCorePackDocs.maximum.description,
    recipe: richCheckBoxsetCorePackDocs.maximum.recipe,
    Component: RichCheckBoxsetCorePackMaximumExample,
    playground: {
      initialSource: richCheckBoxsetCorePackMaximumPlaygroundSource,
      fileName: "richCheckBoxsetCorePack-maximum.tsx",
      runtimeBindings: {
        avatarOptions,
      },
    },
  },
  {
    id: "range",
    name: "Range Selection",
    description: richCheckBoxsetCorePackDocs.range.description,
    recipe: richCheckBoxsetCorePackDocs.range.recipe,
    Component: RichCheckBoxsetCorePackRangeExample,
    playground: {
      initialSource: richCheckBoxsetCorePackRangePlaygroundSource,
      fileName: "richCheckBoxsetCorePack-range.tsx",
      runtimeBindings: {
        avatarOptions,
      },
    },
  },
  {
    id: "exact",
    name: "Exact Selection",
    description: richCheckBoxsetCorePackDocs.exact.description,
    recipe: richCheckBoxsetCorePackDocs.exact.recipe,
    Component: RichCheckBoxsetCorePackExactExample,
    playground: {
      initialSource: richCheckBoxsetCorePackExactPlaygroundSource,
      fileName: "richCheckBoxsetCorePack-exact.tsx",
      runtimeBindings: {
        avatarOptions,
      },
    },
  },
];

const richCheckBoxsetCorePackNavDataProvider = new MutableArrayTreeDataProvider<
  RichCheckBoxsetCorePackNavItem["id"],
  RichCheckBoxsetCorePackNavItem
>(richCheckBoxsetCorePackNavItems, "id", {
  keyAttributeScope: "global",
});

export default function RichCheckBoxsetCorePackIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<RichCheckBoxsetCorePackDemoId>("overview");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        RichCheckBoxsetCorePackNavItem["id"],
        RichCheckBoxsetCorePackNavItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId((event.detail.value as RichCheckBoxsetCorePackDemoId));
      }
    },
    [],
  );

  const renderNavigationItem = useCallback(
    (
      item: ojNavigationList.ItemContext<
        RichCheckBoxsetCorePackNavItem["id"],
        RichCheckBoxsetCorePackNavItem
      >,
    ) => (
      <li id={item.data.id}>
        <a href="#" style="color: inherit; text-decoration: none;">
          {item.data.name}
        </a>
      </li>
    ),
    [],
  );

  const activeExample = useMemo(
    () =>
      richCheckBoxsetCorePackNavItems.find(
        (item) => item.id === activeExampleId,
      ) ?? richCheckBoxsetCorePackNavItems[0],
    [activeExampleId],
  );

  const ActiveExampleComponent = activeExample.Component;

  return (
    <div
      id="richCheckBoxsetCorePackNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="navListDemoLayout">
        <oj-navigation-list
          aria-label="Rich Checkbox Set core pack examples"
          selection={activeExampleId}
          data={richCheckBoxsetCorePackNavDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="oj-flex-item">
        <DemoLayoutTemplate
          componentType="oj-c-rich-checkboxset"
          packLabel="Core Pack"
          demoName={activeExample.name}
          description={activeExample.description}
          recipe={activeExample.recipe}
          demo={<ActiveExampleComponent />}
          playground={activeExample.playground}
        />
      </div>
    </div>
  );
}

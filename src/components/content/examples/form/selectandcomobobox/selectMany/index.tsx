import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojnavigationlist";
import { ojNavigationList } from "ojs/ojnavigationlist";
import 'preact';
import { type ComponentChildren,type FunctionComponent } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import SelectManyBasicExample from "./selectMany-basic";
import selectManyBasicPlaygroundSource from "./selectMany-basic-source";
import SelectManyDataMappingExample from "./selectMany-dataMapping";
import selectManyDataMappingPlaygroundSource from "./selectMany-dataMapping-source";
import {
  selectManyDocs,
  type SelectManyDemoId,
} from "./selectMany-docs";
import SelectManyEventsExample from "./selectMany-events";
import selectManyEventsPlaygroundSource from "./selectMany-events-source";
import SelectManyGroupingExample from "./selectMany-grouping";
import selectManyGroupingPlaygroundSource from "./selectMany-grouping-source";
import SelectManyItemImgExample from "./selectMany-itemImg";
import selectManyItemImgPlaygroundSource from "./selectMany-itemImg-source";
import SelectManyMaximumResultCountExample from "./selectMany-maximumResultCount";
import selectManyMaximumResultCountPlaygroundSource from "./selectMany-maximumResultCount-source";
import SelectManyMinimumResultsForSearchExample from "./selectMany-minimumResultsForSearch";
import selectManyMinimumResultsForSearchPlaygroundSource from "./selectMany-minimumResultsForSearch-source";
import SelectManyOverviewExample from "./selectMany-overview";
import selectManyOverviewPlaygroundSource from "./selectMany-overview-source";
import {
  confirmationMessages,
  createBrowserDataProvider,
  createEmployeeMappedDataProvider,
  createGroupedStatesDataProvider,
  createStatesDataProvider,
  errorMessages,
  formatEventDetail,
  infoMessages,
  renderOptionWithBadge,
  warningMessages,
} from "./selectMany-shared";
import SelectManyValueOptionsExample from "./selectMany-valueOptions";
import selectManyValueOptionsPlaygroundSource from "./selectMany-valueOptions-source";
import SelectManyWidthExample from "./selectMany-width";
import selectManyWidthPlaygroundSource from "./selectMany-width-source";

type SelectManyNavItem = {
  id: SelectManyDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
  playground?: PlaygroundConfig;
};

const selectManyNavItems: SelectManyNavItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: selectManyDocs.overview.description,
    recipe: selectManyDocs.overview.recipe,
    Component: SelectManyOverviewExample,
    playground: {
      initialSource: selectManyOverviewPlaygroundSource,
      fileName: "selectMany-overview.tsx",
      runtimeBindings: {
        confirmationMessages,
        createBrowserDataProvider,
        errorMessages,
        infoMessages,
        warningMessages,
      },
    },
  },
  {
    id: "basic",
    name: "Basic",
    description: selectManyDocs.basic.description,
    recipe: selectManyDocs.basic.recipe,
    Component: SelectManyBasicExample,
    playground: {
      initialSource: selectManyBasicPlaygroundSource,
      fileName: "selectMany-basic.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "grouping",
    name: "Grouping",
    description: selectManyDocs.grouping.description,
    recipe: selectManyDocs.grouping.recipe,
    Component: SelectManyGroupingExample,
    playground: {
      initialSource: selectManyGroupingPlaygroundSource,
      fileName: "selectMany-grouping.tsx",
      runtimeBindings: {
        createGroupedStatesDataProvider,
      },
    },
  },
  {
    id: "width",
    name: "Width",
    description: selectManyDocs.width.description,
    recipe: selectManyDocs.width.recipe,
    Component: SelectManyWidthExample,
    playground: {
      initialSource: selectManyWidthPlaygroundSource,
      fileName: "selectMany-width.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "events",
    name: "Events",
    description: selectManyDocs.events.description,
    recipe: selectManyDocs.events.recipe,
    Component: SelectManyEventsExample,
    playground: {
      initialSource: selectManyEventsPlaygroundSource,
      fileName: "selectMany-events.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
        formatEventDetail,
      },
    },
  },
  {
    id: "value-options",
    name: "Page Load Performance",
    description: selectManyDocs["value-options"].description,
    recipe: selectManyDocs["value-options"].recipe,
    Component: SelectManyValueOptionsExample,
    playground: {
      initialSource: selectManyValueOptionsPlaygroundSource,
      fileName: "selectMany-valueOptions.tsx",
      runtimeBindings: {
        createStatesDataProvider,
      },
    },
  },
  {
    id: "data-mapping",
    name: "Data Mapping",
    description: selectManyDocs["data-mapping"].description,
    recipe: selectManyDocs["data-mapping"].recipe,
    Component: SelectManyDataMappingExample,
    playground: {
      initialSource: selectManyDataMappingPlaygroundSource,
      fileName: "selectMany-dataMapping.tsx",
      runtimeBindings: {
        createEmployeeMappedDataProvider,
      },
    },
  },
  {
    id: "minimum-results-for-search",
    name: "Minimum Results For Search",
    description: selectManyDocs["minimum-results-for-search"].description,
    recipe: selectManyDocs["minimum-results-for-search"].recipe,
    Component: SelectManyMinimumResultsForSearchExample,
    playground: {
      initialSource: selectManyMinimumResultsForSearchPlaygroundSource,
      fileName: "selectMany-minimumResultsForSearch.tsx",
      runtimeBindings: {
        createStatesDataProvider,
      },
    },
  },
  {
    id: "maximum-result-count",
    name: "Maximum Result Count",
    description: selectManyDocs["maximum-result-count"].description,
    recipe: selectManyDocs["maximum-result-count"].recipe,
    Component: SelectManyMaximumResultCountExample,
    playground: {
      initialSource: selectManyMaximumResultCountPlaygroundSource,
      fileName: "selectMany-maximumResultCount.tsx",
      runtimeBindings: {
        createStatesDataProvider,
      },
    },
  },
  {
    id: "item-image",
    name: "Item with Image",
    description: selectManyDocs["item-image"].description,
    recipe: selectManyDocs["item-image"].recipe,
    Component: SelectManyItemImgExample,
    playground: {
      initialSource: selectManyItemImgPlaygroundSource,
      fileName: "selectMany-itemImg.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
        renderOptionWithBadge,
      },
    },
  },
];

const selectManyNavDataProvider = new MutableArrayTreeDataProvider<
  SelectManyNavItem["id"],
  SelectManyNavItem
>(selectManyNavItems, "id", {
  keyAttributeScope: "global",
});

export default function SelectManyIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<SelectManyDemoId>("overview");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        SelectManyNavItem["id"],
        SelectManyNavItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId((event.detail.value as SelectManyDemoId));
      }
    },
    [],
  );

  const renderNavigationItem = useCallback(
    (
      item: ojNavigationList.ItemContext<
        SelectManyNavItem["id"],
        SelectManyNavItem
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
      selectManyNavItems.find((item) => item.id === activeExampleId) ??
      selectManyNavItems[0],
    [activeExampleId],
  );

  const ActiveExampleComponent = activeExample.Component;

  return (
    <div
      id="selectManyNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="navListDemoLayout">
        <oj-navigation-list
          aria-label="Select Many examples"
          selection={activeExampleId}
          data={selectManyNavDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="oj-flex-item">
        <DemoLayoutTemplate
          componentType="oj-select-many"
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

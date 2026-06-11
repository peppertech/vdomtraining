import { h, type ComponentChildren, type FunctionComponent } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import SelectManyBasicExample from "./selectMany-basic";
import {
  selectManyDocs,
  type SelectManyDemoId,
} from "./selectMany-docs";
import SelectManyEventsExample from "./selectMany-events";
import SelectManyGroupingExample from "./selectMany-grouping";
import SelectManyItemImgExample from "./selectMany-itemImg";
import SelectManyMaximumResultCountExample from "./selectMany-maximumResultCount";
import SelectManyMinimumResultsForSearchExample from "./selectMany-minimumResultsForSearch";
import SelectManyOverviewExample from "./selectMany-overview";
import SelectManyDataMappingExample from "./selectMany-dataMapping";
import SelectManyValueOptionsExample from "./selectMany-valueOptions";
import SelectManyWidthExample from "./selectMany-width";

type SelectManyNavItem = {
  id: SelectManyDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const selectManyNavItems: SelectManyNavItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: selectManyDocs.overview.description,
    recipe: selectManyDocs.overview.recipe,
    Component: SelectManyOverviewExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: selectManyDocs.basic.description,
    recipe: selectManyDocs.basic.recipe,
    Component: SelectManyBasicExample,
  },
  {
    id: "grouping",
    name: "Grouping",
    description: selectManyDocs.grouping.description,
    recipe: selectManyDocs.grouping.recipe,
    Component: SelectManyGroupingExample,
  },
  {
    id: "width",
    name: "Width",
    description: selectManyDocs.width.description,
    recipe: selectManyDocs.width.recipe,
    Component: SelectManyWidthExample,
  },
  {
    id: "events",
    name: "Events",
    description: selectManyDocs.events.description,
    recipe: selectManyDocs.events.recipe,
    Component: SelectManyEventsExample,
  },
  {
    id: "value-options",
    name: "Page Load Performance",
    description: selectManyDocs["value-options"].description,
    recipe: selectManyDocs["value-options"].recipe,
    Component: SelectManyValueOptionsExample,
  },
  {
    id: "data-mapping",
    name: "Data Mapping",
    description: selectManyDocs["data-mapping"].description,
    recipe: selectManyDocs["data-mapping"].recipe,
    Component: SelectManyDataMappingExample,
  },
  {
    id: "minimum-results-for-search",
    name: "Minimum Results For Search",
    description: selectManyDocs["minimum-results-for-search"].description,
    recipe: selectManyDocs["minimum-results-for-search"].recipe,
    Component: SelectManyMinimumResultsForSearchExample,
  },
  {
    id: "maximum-result-count",
    name: "Maximum Result Count",
    description: selectManyDocs["maximum-result-count"].description,
    recipe: selectManyDocs["maximum-result-count"].recipe,
    Component: SelectManyMaximumResultCountExample,
  },
  {
    id: "item-image",
    name: "Item with Image",
    description: selectManyDocs["item-image"].description,
    recipe: selectManyDocs["item-image"].recipe,
    Component: SelectManyItemImgExample,
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
        <a href="" style="color: inherit; text-decoration: none;">
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
        />
      </div>
    </div>
  );
}

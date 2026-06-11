import { h, type ComponentChildren, type FunctionComponent } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import ComboboxManyBasicExample from "./comboboxMany-basic";
import ComboboxManyConverterExample from "./comboboxMany-converter";
import ComboboxManyConverterWithDataMappingExample from "./comboboxMany-converterWithDataMapping";
import ComboboxManyCustomTemplateExample from "./comboboxMany-customTemplate";
import ComboboxManyDataMappingExample from "./comboboxMany-dataMapping";
import ComboboxManyEventsExample from "./comboboxMany-events";
import ComboboxManyGroupingExample from "./comboboxMany-grouping";
import ComboboxManyItemImgExample from "./comboboxMany-itemImg";
import ComboboxManyMaximumResultCountExample from "./comboboxMany-maximumResultCount";
import ComboboxManyMinLengthExample from "./comboboxMany-minLength";
import ComboboxManyOverviewExample from "./comboboxMany-overview";
import ComboboxManyValidatorExample from "./comboboxMany-validator";
import ComboboxManyValueOptionsExample from "./comboboxMany-valueOptions";
import ComboboxManyWidthExample from "./comboboxMany-width";
import {
  comboboxManyDocs,
  type ComboboxManyDemoId,
} from "./comboboxMany-docs";

type ComboboxManyNavItem = {
  id: ComboboxManyDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const comboboxManyNavItems: ComboboxManyNavItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: comboboxManyDocs.overview.description,
    recipe: comboboxManyDocs.overview.recipe,
    Component: ComboboxManyOverviewExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: comboboxManyDocs.basic.description,
    recipe: comboboxManyDocs.basic.recipe,
    Component: ComboboxManyBasicExample,
  },
  {
    id: "grouping",
    name: "Grouping",
    description: comboboxManyDocs.grouping.description,
    recipe: comboboxManyDocs.grouping.recipe,
    Component: ComboboxManyGroupingExample,
  },
  {
    id: "width",
    name: "Width",
    description: comboboxManyDocs.width.description,
    recipe: comboboxManyDocs.width.recipe,
    Component: ComboboxManyWidthExample,
  },
  {
    id: "events",
    name: "Events",
    description: comboboxManyDocs.events.description,
    recipe: comboboxManyDocs.events.recipe,
    Component: ComboboxManyEventsExample,
  },
  {
    id: "value-options",
    name: "Page Load Performance",
    description: comboboxManyDocs["value-options"].description,
    recipe: comboboxManyDocs["value-options"].recipe,
    Component: ComboboxManyValueOptionsExample,
  },
  {
    id: "data-mapping",
    name: "Data Provider Mapping",
    description: comboboxManyDocs["data-mapping"].description,
    recipe: comboboxManyDocs["data-mapping"].recipe,
    Component: ComboboxManyDataMappingExample,
  },
  {
    id: "custom-template",
    name: "Custom Renderer",
    description: comboboxManyDocs["custom-template"].description,
    recipe: comboboxManyDocs["custom-template"].recipe,
    Component: ComboboxManyCustomTemplateExample,
  },
  {
    id: "item-image",
    name: "Item with Image",
    description: comboboxManyDocs["item-image"].description,
    recipe: comboboxManyDocs["item-image"].recipe,
    Component: ComboboxManyItemImgExample,
  },
  {
    id: "min-length",
    name: "Minimum Chars To Filter",
    description: comboboxManyDocs["min-length"].description,
    recipe: comboboxManyDocs["min-length"].recipe,
    Component: ComboboxManyMinLengthExample,
  },
  {
    id: "maximum-result-count",
    name: "Maximum Result Count",
    description: comboboxManyDocs["maximum-result-count"].description,
    recipe: comboboxManyDocs["maximum-result-count"].recipe,
    Component: ComboboxManyMaximumResultCountExample,
  },
  {
    id: "converter",
    name: "Converter",
    description: comboboxManyDocs.converter.description,
    recipe: comboboxManyDocs.converter.recipe,
    Component: ComboboxManyConverterExample,
  },
  {
    id: "converter-with-data-mapping",
    name: "Converter (with unformatted data)",
    description: comboboxManyDocs["converter-with-data-mapping"].description,
    recipe: comboboxManyDocs["converter-with-data-mapping"].recipe,
    Component: ComboboxManyConverterWithDataMappingExample,
  },
  {
    id: "validator",
    name: "Validator",
    description: comboboxManyDocs.validator.description,
    recipe: comboboxManyDocs.validator.recipe,
    Component: ComboboxManyValidatorExample,
  },
];

const comboboxManyNavDataProvider = new MutableArrayTreeDataProvider<
  ComboboxManyNavItem["id"],
  ComboboxManyNavItem
>(comboboxManyNavItems, "id", {
  keyAttributeScope: "global",
});

export default function ComboboxManyIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<ComboboxManyDemoId>("overview");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        ComboboxManyNavItem["id"],
        ComboboxManyNavItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId((event.detail.value as ComboboxManyDemoId));
      }
    },
    [],
  );

  const renderNavigationItem = useCallback(
    (
      item: ojNavigationList.ItemContext<
        ComboboxManyNavItem["id"],
        ComboboxManyNavItem
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
      comboboxManyNavItems.find((item) => item.id === activeExampleId) ??
      comboboxManyNavItems[0],
    [activeExampleId],
  );

  const ActiveExampleComponent = activeExample.Component;

  return (
    <div
      id="comboboxManyNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="navListDemoLayout">
        <oj-navigation-list
          aria-label="Combobox Many examples"
          selection={activeExampleId}
          data={comboboxManyNavDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="oj-flex-item">
        <DemoLayoutTemplate
          componentType="oj-combobox-many"
          demoName={activeExample.name}
          description={activeExample.description}
          recipe={activeExample.recipe}
          demo={<ActiveExampleComponent />}
        />
      </div>
    </div>
  );
}

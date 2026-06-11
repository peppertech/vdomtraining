import { h, type ComponentChildren, type FunctionComponent } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import ComboboxOneBasicExample from "./comboBoxOne-basic";
import ComboboxOneConverterExample from "./comboBoxOne-converter";
import ComboboxOneConverterWithDataMappingExample from "./comboBoxOne-converterWithDataMapping";
import ComboboxOneCustomTemplateExample from "./comboBoxOne-customTemplate";
import ComboboxOneDataMappingExample from "./comboBoxOne-dataMapping";
import {
  comboboxOneDocs,
  type ComboboxOneDemoId,
} from "./comboBoxOne-docs";
import ComboboxOneEventsExample from "./comboBoxOne-events";
import ComboboxOneGroupingExample from "./comboBoxOne-grouping";
import ComboboxOneItemImgExample from "./comboBoxOne-itemImg";
import ComboboxOneMaximumResultCountExample from "./comboBoxOne-maximumResultCount";
import ComboboxOneMinLengthExample from "./comboBoxOne-minLength";
import ComboboxOneOverviewExample from "./comboBoxOne-overview";
import ComboboxOneValidatorExample from "./comboBoxOne-validator";
import ComboboxOneValueOptionExample from "./comboBoxOne-valueOption";
import ComboboxOneWidthExample from "./comboBoxOne-width";

type ComboboxOneNavItem = {
  id: ComboboxOneDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const comboboxOneNavItems: ComboboxOneNavItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: comboboxOneDocs.overview.description,
    recipe: comboboxOneDocs.overview.recipe,
    Component: ComboboxOneOverviewExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: comboboxOneDocs.basic.description,
    recipe: comboboxOneDocs.basic.recipe,
    Component: ComboboxOneBasicExample,
  },
  {
    id: "grouping",
    name: "Grouping",
    description: comboboxOneDocs.grouping.description,
    recipe: comboboxOneDocs.grouping.recipe,
    Component: ComboboxOneGroupingExample,
  },
  {
    id: "width",
    name: "Width",
    description: comboboxOneDocs.width.description,
    recipe: comboboxOneDocs.width.recipe,
    Component: ComboboxOneWidthExample,
  },
  {
    id: "events",
    name: "Events",
    description: comboboxOneDocs.events.description,
    recipe: comboboxOneDocs.events.recipe,
    Component: ComboboxOneEventsExample,
  },
  {
    id: "value-option",
    name: "Page Load Performance",
    description: comboboxOneDocs["value-option"].description,
    recipe: comboboxOneDocs["value-option"].recipe,
    Component: ComboboxOneValueOptionExample,
  },
  {
    id: "data-mapping",
    name: "Data Mapping",
    description: comboboxOneDocs["data-mapping"].description,
    recipe: comboboxOneDocs["data-mapping"].recipe,
    Component: ComboboxOneDataMappingExample,
  },
  {
    id: "custom-template",
    name: "Custom Renderer",
    description: comboboxOneDocs["custom-template"].description,
    recipe: comboboxOneDocs["custom-template"].recipe,
    Component: ComboboxOneCustomTemplateExample,
  },
  {
    id: "item-image",
    name: "Item with Image",
    description: comboboxOneDocs["item-image"].description,
    recipe: comboboxOneDocs["item-image"].recipe,
    Component: ComboboxOneItemImgExample,
  },
  {
    id: "min-length",
    name: "Minimum Chars To Filter",
    description: comboboxOneDocs["min-length"].description,
    recipe: comboboxOneDocs["min-length"].recipe,
    Component: ComboboxOneMinLengthExample,
  },
  {
    id: "maximum-result-count",
    name: "Maximum Result Count",
    description: comboboxOneDocs["maximum-result-count"].description,
    recipe: comboboxOneDocs["maximum-result-count"].recipe,
    Component: ComboboxOneMaximumResultCountExample,
  },
  {
    id: "converter",
    name: "Converter",
    description: comboboxOneDocs.converter.description,
    recipe: comboboxOneDocs.converter.recipe,
    Component: ComboboxOneConverterExample,
  },
  {
    id: "converter-with-data-mapping",
    name: "Converter (with unformatted data)",
    description: comboboxOneDocs["converter-with-data-mapping"].description,
    recipe: comboboxOneDocs["converter-with-data-mapping"].recipe,
    Component: ComboboxOneConverterWithDataMappingExample,
  },
  {
    id: "validator",
    name: "Validator",
    description: comboboxOneDocs.validator.description,
    recipe: comboboxOneDocs.validator.recipe,
    Component: ComboboxOneValidatorExample,
  },
];

const comboboxOneNavDataProvider = new MutableArrayTreeDataProvider<
  ComboboxOneNavItem["id"],
  ComboboxOneNavItem
>(comboboxOneNavItems, "id", {
  keyAttributeScope: "global",
});

export default function ComboboxOneIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<ComboboxOneDemoId>("overview");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        ComboboxOneNavItem["id"],
        ComboboxOneNavItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId(event.detail.value);
      }
    },
    [],
  );

  const renderNavigationItem = useCallback(
    (
      item: ojNavigationList.ItemContext<
        ComboboxOneNavItem["id"],
        ComboboxOneNavItem
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
      comboboxOneNavItems.find((item) => item.id === activeExampleId) ??
      comboboxOneNavItems[0],
    [activeExampleId],
  );

  const ActiveExampleComponent = activeExample.Component;

  return (
    <div
      id="comboboxOneNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="navListDemoLayout">
        <oj-navigation-list
          aria-label="Combobox One examples"
          selection={activeExampleId}
          data={comboboxOneNavDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="oj-flex-item">
        <DemoLayoutTemplate
          componentType="oj-combobox-one"
          demoName={activeExample.name}
          description={activeExample.description}
          recipe={activeExample.recipe}
          demo={<ActiveExampleComponent />}
        />
      </div>
    </div>
  );
}

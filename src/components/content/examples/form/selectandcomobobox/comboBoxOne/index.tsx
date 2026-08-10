import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojnavigationlist";
import { ojNavigationList } from "ojs/ojnavigationlist";
import 'preact';
import { type ComponentChildren,type FunctionComponent } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import ComboboxOneBasicExample from "./comboBoxOne-basic";
import comboBoxOneBasicPlaygroundSource from "./comboBoxOne-basic-source";
import ComboboxOneConverterExample from "./comboBoxOne-converter";
import comboBoxOneConverterPlaygroundSource from "./comboBoxOne-converter-source";
import ComboboxOneConverterWithDataMappingExample from "./comboBoxOne-converterWithDataMapping";
import comboBoxOneConverterWithDataMappingPlaygroundSource from "./comboBoxOne-converterWithDataMapping-source";
import ComboboxOneCustomTemplateExample from "./comboBoxOne-customTemplate";
import comboBoxOneCustomTemplatePlaygroundSource from "./comboBoxOne-customTemplate-source";
import ComboboxOneDataMappingExample from "./comboBoxOne-dataMapping";
import comboBoxOneDataMappingPlaygroundSource from "./comboBoxOne-dataMapping-source";
import {
  comboboxOneDocs,
  type ComboboxOneDemoId,
} from "./comboBoxOne-docs";
import ComboboxOneEventsExample from "./comboBoxOne-events";
import comboBoxOneEventsPlaygroundSource from "./comboBoxOne-events-source";
import ComboboxOneGroupingExample from "./comboBoxOne-grouping";
import comboBoxOneGroupingPlaygroundSource from "./comboBoxOne-grouping-source";
import ComboboxOneItemImgExample from "./comboBoxOne-itemImg";
import comboBoxOneItemImgPlaygroundSource from "./comboBoxOne-itemImg-source";
import ComboboxOneMaximumResultCountExample from "./comboBoxOne-maximumResultCount";
import comboBoxOneMaximumResultCountPlaygroundSource from "./comboBoxOne-maximumResultCount-source";
import ComboboxOneMinLengthExample from "./comboBoxOne-minLength";
import comboBoxOneMinLengthPlaygroundSource from "./comboBoxOne-minLength-source";
import ComboboxOneOverviewExample from "./comboBoxOne-overview";
import comboBoxOneOverviewPlaygroundSource from "./comboBoxOne-overview-source";
import {
  browserOptionsWithDisabled,
  confirmationMessages,
  createBrowserDataProvider,
  createEmailDataProvider,
  createEmployeeMappedDataProvider,
  createFormattedCurrencyDataProvider,
  createGroupedEmployeeDataProvider,
  createGroupedStatesDataProvider,
  createStatesDataProvider,
  createUnformattedCurrencyDataProvider,
  emailValidator,
  errorMessages,
  formatEventDetail,
  infoMessages,
  renderEmployeeOption,
  renderOptionWithBadge,
  usdCurrencyConverter,
  warningMessages,
} from "./comboBoxOne-shared";
import ComboboxOneValidatorExample from "./comboBoxOne-validator";
import comboBoxOneValidatorPlaygroundSource from "./comboBoxOne-validator-source";
import ComboboxOneValueOptionExample from "./comboBoxOne-valueOption";
import comboBoxOneValueOptionPlaygroundSource from "./comboBoxOne-valueOption-source";
import ComboboxOneWidthExample from "./comboBoxOne-width";
import comboBoxOneWidthPlaygroundSource from "./comboBoxOne-width-source";

type ComboboxOneNavItem = {
  id: ComboboxOneDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
  playground?: PlaygroundConfig;
};

const comboboxOneNavItems: ComboboxOneNavItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: comboboxOneDocs.overview.description,
    recipe: comboboxOneDocs.overview.recipe,
    Component: ComboboxOneOverviewExample,
    playground: {
      initialSource: comboBoxOneOverviewPlaygroundSource,
      fileName: "comboBoxOne-overview.tsx",
      runtimeBindings: {
        browserOptionsWithDisabled,
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
    description: comboboxOneDocs.basic.description,
    recipe: comboboxOneDocs.basic.recipe,
    Component: ComboboxOneBasicExample,
    playground: {
      initialSource: comboBoxOneBasicPlaygroundSource,
      fileName: "comboBoxOne-basic.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "grouping",
    name: "Grouping",
    description: comboboxOneDocs.grouping.description,
    recipe: comboboxOneDocs.grouping.recipe,
    Component: ComboboxOneGroupingExample,
    playground: {
      initialSource: comboBoxOneGroupingPlaygroundSource,
      fileName: "comboBoxOne-grouping.tsx",
      runtimeBindings: {
        createGroupedStatesDataProvider,
      },
    },
  },
  {
    id: "width",
    name: "Width",
    description: comboboxOneDocs.width.description,
    recipe: comboboxOneDocs.width.recipe,
    Component: ComboboxOneWidthExample,
    playground: {
      initialSource: comboBoxOneWidthPlaygroundSource,
      fileName: "comboBoxOne-width.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
      },
    },
  },
  {
    id: "events",
    name: "Events",
    description: comboboxOneDocs.events.description,
    recipe: comboboxOneDocs.events.recipe,
    Component: ComboboxOneEventsExample,
    playground: {
      initialSource: comboBoxOneEventsPlaygroundSource,
      fileName: "comboBoxOne-events.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
        formatEventDetail,
      },
    },
  },
  {
    id: "value-option",
    name: "Page Load Performance",
    description: comboboxOneDocs["value-option"].description,
    recipe: comboboxOneDocs["value-option"].recipe,
    Component: ComboboxOneValueOptionExample,
    playground: {
      initialSource: comboBoxOneValueOptionPlaygroundSource,
      fileName: "comboBoxOne-valueOption.tsx",
      runtimeBindings: {
        createStatesDataProvider,
      },
    },
  },
  {
    id: "data-mapping",
    name: "Data Mapping",
    description: comboboxOneDocs["data-mapping"].description,
    recipe: comboboxOneDocs["data-mapping"].recipe,
    Component: ComboboxOneDataMappingExample,
    playground: {
      initialSource: comboBoxOneDataMappingPlaygroundSource,
      fileName: "comboBoxOne-dataMapping.tsx",
      runtimeBindings: {
        createEmployeeMappedDataProvider,
      },
    },
  },
  {
    id: "custom-template",
    name: "Custom Renderer",
    description: comboboxOneDocs["custom-template"].description,
    recipe: comboboxOneDocs["custom-template"].recipe,
    Component: ComboboxOneCustomTemplateExample,
    playground: {
      initialSource: comboBoxOneCustomTemplatePlaygroundSource,
      fileName: "comboBoxOne-customTemplate.tsx",
      runtimeBindings: {
        createGroupedEmployeeDataProvider,
        renderEmployeeOption,
      },
    },
  },
  {
    id: "item-image",
    name: "Item with Image",
    description: comboboxOneDocs["item-image"].description,
    recipe: comboboxOneDocs["item-image"].recipe,
    Component: ComboboxOneItemImgExample,
    playground: {
      initialSource: comboBoxOneItemImgPlaygroundSource,
      fileName: "comboBoxOne-itemImg.tsx",
      runtimeBindings: {
        createBrowserDataProvider,
        renderOptionWithBadge,
      },
    },
  },
  {
    id: "min-length",
    name: "Minimum Chars To Filter",
    description: comboboxOneDocs["min-length"].description,
    recipe: comboboxOneDocs["min-length"].recipe,
    Component: ComboboxOneMinLengthExample,
    playground: {
      initialSource: comboBoxOneMinLengthPlaygroundSource,
      fileName: "comboBoxOne-minLength.tsx",
      runtimeBindings: {
        createStatesDataProvider,
      },
    },
  },
  {
    id: "maximum-result-count",
    name: "Maximum Result Count",
    description: comboboxOneDocs["maximum-result-count"].description,
    recipe: comboboxOneDocs["maximum-result-count"].recipe,
    Component: ComboboxOneMaximumResultCountExample,
    playground: {
      initialSource: comboBoxOneMaximumResultCountPlaygroundSource,
      fileName: "comboBoxOne-maximumResultCount.tsx",
      runtimeBindings: {
        createStatesDataProvider,
      },
    },
  },
  {
    id: "converter",
    name: "Converter",
    description: comboboxOneDocs.converter.description,
    recipe: comboboxOneDocs.converter.recipe,
    Component: ComboboxOneConverterExample,
    playground: {
      initialSource: comboBoxOneConverterPlaygroundSource,
      fileName: "comboBoxOne-converter.tsx",
      runtimeBindings: {
        createFormattedCurrencyDataProvider,
        usdCurrencyConverter,
      },
    },
  },
  {
    id: "converter-with-data-mapping",
    name: "Converter (with unformatted data)",
    description: comboboxOneDocs["converter-with-data-mapping"].description,
    recipe: comboboxOneDocs["converter-with-data-mapping"].recipe,
    Component: ComboboxOneConverterWithDataMappingExample,
    playground: {
      initialSource: comboBoxOneConverterWithDataMappingPlaygroundSource,
      fileName: "comboBoxOne-converterWithDataMapping.tsx",
      runtimeBindings: {
        createUnformattedCurrencyDataProvider,
        usdCurrencyConverter,
      },
    },
  },
  {
    id: "validator",
    name: "Validator",
    description: comboboxOneDocs.validator.description,
    recipe: comboboxOneDocs.validator.recipe,
    Component: ComboboxOneValidatorExample,
    playground: {
      initialSource: comboBoxOneValidatorPlaygroundSource,
      fileName: "comboBoxOne-validator.tsx",
      runtimeBindings: {
        createEmailDataProvider,
        emailValidator,
      },
    },
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
        setActiveExampleId((event.detail.value as ComboboxOneDemoId));
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
          playground={activeExample.playground}
        />
      </div>
    </div>
  );
}

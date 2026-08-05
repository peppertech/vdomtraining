import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojnavigationlist";
import { ojNavigationList } from "ojs/ojnavigationlist";
import 'preact';
import { type ComponentChildren,type FunctionComponent } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import {
  textAreaCorePackDocs,
  type TextAreaCorePackDemoId,
} from "./textAreaCorePack-docs";
import TextAreaCorePackLengthMaxExample from "./textAreaCorePack-lengthMax";
import textAreaCorePackLengthMaxPlaygroundSource from "./textAreaCorePack-lengthMax-source";
import TextAreaCorePackMaxRowsExample from "./textAreaCorePack-maxRows";
import textAreaCorePackMaxRowsPlaygroundSource from "./textAreaCorePack-maxRows-source";
import TextAreaCorePackOverviewExample from "./textAreaCorePack-overview";
import textAreaCorePackOverviewPlaygroundSource from "./textAreaCorePack-overview-source";
import TextAreaCorePackResizeExample from "./textAreaCorePack-resize";
import textAreaCorePackResizePlaygroundSource from "./textAreaCorePack-resize-source";
import {
  confirmationMessages,
  errorMessages,
  helpDefinition,
  helpInstruction,
  helpSource,
  hiddenLengthConfig,
  infoMessages,
  labelEdgeOptions,
  lengthSampleValue,
  longValue,
  maxRowsDefaultValue,
  maxRowsPositiveValue,
  maxRowsStretchValue,
  overviewLengthConfig,
  remainingLengthConfig,
  sampleValue,
  warningMessages,
} from "./textAreaCorePack-shared";
import TextAreaCorePackWidthExample from "./textAreaCorePack-width";
import textAreaCorePackWidthPlaygroundSource from "./textAreaCorePack-width-source";

type TextAreaCorePackNavItem = {
  id: TextAreaCorePackDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
  playground?: PlaygroundConfig;
};

const textAreaCorePackNavItems: TextAreaCorePackNavItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: textAreaCorePackDocs.overview.description,
    recipe: textAreaCorePackDocs.overview.recipe,
    Component: TextAreaCorePackOverviewExample,
    playground: {
      initialSource: textAreaCorePackOverviewPlaygroundSource,
      fileName: "textAreaCorePack-overview.tsx",
      runtimeBindings: {
        confirmationMessages,
        errorMessages,
        helpDefinition,
        helpInstruction,
        helpSource,
        infoMessages,
        overviewLengthConfig,
        sampleValue,
        warningMessages,
      },
    },
  },
  {
    id: "width",
    name: "Width",
    description: textAreaCorePackDocs.width.description,
    recipe: textAreaCorePackDocs.width.recipe,
    Component: TextAreaCorePackWidthExample,
    playground: {
      initialSource: textAreaCorePackWidthPlaygroundSource,
      fileName: "textAreaCorePack-width.tsx",
      runtimeBindings: { labelEdgeOptions, longValue },
    },
  },
  {
    id: "resize",
    name: "Resize Behavior",
    description: textAreaCorePackDocs.resize.description,
    recipe: textAreaCorePackDocs.resize.recipe,
    Component: TextAreaCorePackResizeExample,
    playground: {
      initialSource: textAreaCorePackResizePlaygroundSource,
      fileName: "textAreaCorePack-resize.tsx",
      runtimeBindings: { longValue },
    },
  },
  {
    id: "length-max",
    name: "Length Max",
    description: textAreaCorePackDocs["length-max"].description,
    recipe: textAreaCorePackDocs["length-max"].recipe,
    Component: TextAreaCorePackLengthMaxExample,
    playground: {
      initialSource: textAreaCorePackLengthMaxPlaygroundSource,
      fileName: "textAreaCorePack-lengthMax.tsx",
      runtimeBindings: {
        hiddenLengthConfig,
        lengthSampleValue,
        remainingLengthConfig,
      },
    },
  },
  {
    id: "max-rows",
    name: "Max Rows",
    description: textAreaCorePackDocs["max-rows"].description,
    recipe: textAreaCorePackDocs["max-rows"].recipe,
    Component: TextAreaCorePackMaxRowsExample,
    playground: {
      initialSource: textAreaCorePackMaxRowsPlaygroundSource,
      fileName: "textAreaCorePack-maxRows.tsx",
      runtimeBindings: {
        maxRowsDefaultValue,
        maxRowsPositiveValue,
        maxRowsStretchValue,
      },
    },
  },
];

const textAreaCorePackNavDataProvider = new MutableArrayTreeDataProvider<
  TextAreaCorePackNavItem["id"],
  TextAreaCorePackNavItem
>(textAreaCorePackNavItems, "id", {
  keyAttributeScope: "global",
});

export default function TextAreaCorePackIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<TextAreaCorePackDemoId>("overview");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        TextAreaCorePackNavItem["id"],
        TextAreaCorePackNavItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId((event.detail.value as TextAreaCorePackDemoId));
      }
    },
    [],
  );

  const renderNavigationItem = useCallback(
    (
      item: ojNavigationList.ItemContext<
        TextAreaCorePackNavItem["id"],
        TextAreaCorePackNavItem
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
      textAreaCorePackNavItems.find((item) => item.id === activeExampleId) ??
      textAreaCorePackNavItems[0],
    [activeExampleId],
  );

  const ActiveExampleComponent = activeExample.Component;

  return (
    <div
      id="textAreaCorePackNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="navListDemoLayout">
        <oj-navigation-list
          aria-label="Text Area core pack examples"
          selection={activeExampleId}
          data={textAreaCorePackNavDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="oj-flex-item">
        <DemoLayoutTemplate
          componentType="oj-c-text-area"
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

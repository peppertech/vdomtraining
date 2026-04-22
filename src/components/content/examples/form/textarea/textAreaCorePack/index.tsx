import { h, type ComponentChildren, type FunctionComponent } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import {
  textAreaCorePackDocs,
  type TextAreaCorePackDemoId,
} from "./textAreaCorePack-docs";
import TextAreaCorePackLengthMaxExample from "./textAreaCorePack-lengthMax";
import TextAreaCorePackMaxRowsExample from "./textAreaCorePack-maxRows";
import TextAreaCorePackOverviewExample from "./textAreaCorePack-overview";
import TextAreaCorePackResizeExample from "./textAreaCorePack-resize";
import TextAreaCorePackWidthExample from "./textAreaCorePack-width";

type TextAreaCorePackNavItem = {
  id: TextAreaCorePackDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const textAreaCorePackNavItems: TextAreaCorePackNavItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: textAreaCorePackDocs.overview.description,
    recipe: textAreaCorePackDocs.overview.recipe,
    Component: TextAreaCorePackOverviewExample,
  },
  {
    id: "width",
    name: "Width",
    description: textAreaCorePackDocs.width.description,
    recipe: textAreaCorePackDocs.width.recipe,
    Component: TextAreaCorePackWidthExample,
  },
  {
    id: "resize",
    name: "Resize Behavior",
    description: textAreaCorePackDocs.resize.description,
    recipe: textAreaCorePackDocs.resize.recipe,
    Component: TextAreaCorePackResizeExample,
  },
  {
    id: "length-max",
    name: "Length Max",
    description: textAreaCorePackDocs["length-max"].description,
    recipe: textAreaCorePackDocs["length-max"].recipe,
    Component: TextAreaCorePackLengthMaxExample,
  },
  {
    id: "max-rows",
    name: "Max Rows",
    description: textAreaCorePackDocs["max-rows"].description,
    recipe: textAreaCorePackDocs["max-rows"].recipe,
    Component: TextAreaCorePackMaxRowsExample,
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
        setActiveExampleId(event.detail.value);
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
        <a href="" style="color: inherit; text-decoration: none;">
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
        />
      </div>
    </div>
  );
}

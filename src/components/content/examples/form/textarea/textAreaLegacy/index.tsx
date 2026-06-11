import { h, type ComponentChildren, type FunctionComponent } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import TextAreaBindingExample from "./textArea-binding";
import {
  textAreaLegacyDocs,
  type TextAreaLegacyDemoId,
} from "./textArea-docs";
import TextAreaMaxLengthExample from "./textArea-maxLength";
import TextAreaMaxRowsExample from "./textArea-maxRows";
import TextAreaOverviewExample from "./textArea-overview";
import TextAreaResizeExample from "./textArea-resize";
import TextAreaWidthExample from "./textArea-width";

type TextAreaLegacyNavItem = {
  id: TextAreaLegacyDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const textAreaLegacyNavItems: TextAreaLegacyNavItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: textAreaLegacyDocs.overview.description,
    recipe: textAreaLegacyDocs.overview.recipe,
    Component: TextAreaOverviewExample,
  },
  {
    id: "binding",
    name: "Binding",
    description: textAreaLegacyDocs.binding.description,
    recipe: textAreaLegacyDocs.binding.recipe,
    Component: TextAreaBindingExample,
  },
  {
    id: "width",
    name: "Width",
    description: textAreaLegacyDocs.width.description,
    recipe: textAreaLegacyDocs.width.recipe,
    Component: TextAreaWidthExample,
  },
  {
    id: "resize",
    name: "Resize Behavior",
    description: textAreaLegacyDocs.resize.description,
    recipe: textAreaLegacyDocs.resize.recipe,
    Component: TextAreaResizeExample,
  },
  {
    id: "max-length",
    name: "Max Length",
    description: textAreaLegacyDocs["max-length"].description,
    recipe: textAreaLegacyDocs["max-length"].recipe,
    Component: TextAreaMaxLengthExample,
  },
  {
    id: "max-rows",
    name: "Max Rows",
    description: textAreaLegacyDocs["max-rows"].description,
    recipe: textAreaLegacyDocs["max-rows"].recipe,
    Component: TextAreaMaxRowsExample,
  },
];

const textAreaLegacyNavDataProvider = new MutableArrayTreeDataProvider<
  TextAreaLegacyNavItem["id"],
  TextAreaLegacyNavItem
>(textAreaLegacyNavItems, "id", {
  keyAttributeScope: "global",
});

export default function TextAreaLegacyIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<TextAreaLegacyDemoId>("overview");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        TextAreaLegacyNavItem["id"],
        TextAreaLegacyNavItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId((event.detail.value as TextAreaLegacyDemoId));
      }
    },
    [],
  );

  const renderNavigationItem = useCallback(
    (
      item: ojNavigationList.ItemContext<
        TextAreaLegacyNavItem["id"],
        TextAreaLegacyNavItem
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
      textAreaLegacyNavItems.find((item) => item.id === activeExampleId) ??
      textAreaLegacyNavItems[0],
    [activeExampleId],
  );

  const ActiveExampleComponent = activeExample.Component;

  return (
    <div
      id="textAreaLegacyNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div
        class="navListDemoLayout"
      >
        <oj-navigation-list
          aria-label="Text Area legacy examples"
          selection={activeExampleId}
          data={textAreaLegacyNavDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div
        class="oj-flex-item"
      >
        <DemoLayoutTemplate
          componentType="oj-text-area"
          demoName={activeExample.name}
          description={activeExample.description}
          recipe={activeExample.recipe}
          demo={<ActiveExampleComponent />}
        />
      </div>
    </div>
  );
}

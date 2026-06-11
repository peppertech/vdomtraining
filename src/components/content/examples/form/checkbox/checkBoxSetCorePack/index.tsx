import { h, type ComponentChildren, type FunctionComponent } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
import { DemoLayoutTemplate } from "../../../../../shared/demo-page-layout/demo-layout-template";
import CheckBoxSetCorePackBasicExample from "./checkBoxSetCorePack-basic";
import CheckBoxSetCorePackDataProviderExample from "./checkBoxSetCorePack-dataProvider";
import {
  checkBoxSetCorePackDocs,
  type CheckBoxSetCorePackDemoId,
} from "./checkBoxSetCorePack-docs";
import CheckBoxSetCorePackOverviewExample from "./checkBoxSetCorePack-overview";
import CheckBoxSetCorePackUserAssistanceExample from "./checkBoxSetCorePack-userAssistance";
import CheckBoxSetCorePackValidationExample from "./checkBoxSetCorePack-validation";

type CheckBoxSetCorePackNavItem = {
  id: CheckBoxSetCorePackDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

const checkBoxSetCorePackNavItems: CheckBoxSetCorePackNavItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: checkBoxSetCorePackDocs.overview.description,
    recipe: checkBoxSetCorePackDocs.overview.recipe,
    Component: CheckBoxSetCorePackOverviewExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: checkBoxSetCorePackDocs.basic.description,
    recipe: checkBoxSetCorePackDocs.basic.recipe,
    Component: CheckBoxSetCorePackBasicExample,
  },
  {
    id: "data-provider",
    name: "Using Data Provider",
    description: checkBoxSetCorePackDocs["data-provider"].description,
    recipe: checkBoxSetCorePackDocs["data-provider"].recipe,
    Component: CheckBoxSetCorePackDataProviderExample,
  },
  {
    id: "user-assistance",
    name: "User Assistance",
    description: checkBoxSetCorePackDocs["user-assistance"].description,
    recipe: checkBoxSetCorePackDocs["user-assistance"].recipe,
    Component: CheckBoxSetCorePackUserAssistanceExample,
  },
  {
    id: "validation",
    name: "Validation",
    description: checkBoxSetCorePackDocs.validation.description,
    recipe: checkBoxSetCorePackDocs.validation.recipe,
    Component: CheckBoxSetCorePackValidationExample,
  },
];

const checkBoxSetCorePackNavDataProvider = new MutableArrayTreeDataProvider<
  CheckBoxSetCorePackNavItem["id"],
  CheckBoxSetCorePackNavItem
>(checkBoxSetCorePackNavItems, "id", {
  keyAttributeScope: "global",
});

export default function CheckBoxSetCorePackIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<CheckBoxSetCorePackDemoId>("overview");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        CheckBoxSetCorePackNavItem["id"],
        CheckBoxSetCorePackNavItem
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
        CheckBoxSetCorePackNavItem["id"],
        CheckBoxSetCorePackNavItem
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
      checkBoxSetCorePackNavItems.find((item) => item.id === activeExampleId) ??
      checkBoxSetCorePackNavItems[0],
    [activeExampleId],
  );

  const ActiveExampleComponent = activeExample.Component; 

  return (
    <div
      id="checkBoxSetCorePackNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="navListDemoLayout">
        <oj-navigation-list
          aria-label="Checkbox Set core pack examples"
          selection={activeExampleId}
          data={checkBoxSetCorePackNavDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="oj-flex-item">
        <DemoLayoutTemplate
          componentType="oj-c-checkboxset"
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

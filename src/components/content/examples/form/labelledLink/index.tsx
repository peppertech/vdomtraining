import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojnavigationlist";
import { ojNavigationList } from "ojs/ojnavigationlist";
import 'preact';
import { type ComponentChildren,type FunctionComponent } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import { DemoLayoutTemplate } from "../../../../shared/demo-page-layout/demo-layout-template";
import type { PlaygroundConfig } from "../../../../shared/code-playground/tsx-playground";
import LabelledLinkCustomActionExample from "./labelledLink-customAction";
import labelledLinkCustomActionPlaygroundSource from "./labelledLink-customAction-source";
import {
  labelledLinkDocs,
  type LabelledLinkDemoId,
} from "./labelledLink-docs";
import LabelledLinkEditableExample from "./labelledLink-editable";
import labelledLinkEditablePlaygroundSource from "./labelledLink-editable-source";
import LabelledLinkStatesExample from "./labelledLink-states";
import labelledLinkStatesPlaygroundSource from "./labelledLink-states-source";

type LabelledLinkNavItem = {
  id: LabelledLinkDemoId;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
  playground?: PlaygroundConfig;
};

const labelledLinkNavItems: LabelledLinkNavItem[] = [
  {
    id: "states",
    name: "Overview",
    description: labelledLinkDocs.states.description,
    recipe: labelledLinkDocs.states.recipe,
    Component: LabelledLinkStatesExample,
    playground: {
      initialSource: labelledLinkStatesPlaygroundSource,
      fileName: "labelledLink-states.tsx",
    },
  },
  {
    id: "editable",
    name: "Editable",
    description: labelledLinkDocs.editable.description,
    recipe: labelledLinkDocs.editable.recipe,
    Component: LabelledLinkEditableExample,
    playground: {
      initialSource: labelledLinkEditablePlaygroundSource,
      fileName: "labelledLink-editable.tsx",
    },
  },
  {
    id: "custom-action",
    name: "Custom Action",
    description: labelledLinkDocs["custom-action"].description,
    recipe: labelledLinkDocs["custom-action"].recipe,
    Component: LabelledLinkCustomActionExample,
    playground: {
      initialSource: labelledLinkCustomActionPlaygroundSource,
      fileName: "labelledLink-customAction.tsx",
    },
  },
];

const labelledLinkNavDataProvider = new MutableArrayTreeDataProvider<
  LabelledLinkNavItem["id"],
  LabelledLinkNavItem
>(labelledLinkNavItems, "id", {
  keyAttributeScope: "global",
});

export default function LabelledLinkIndex() {
  const [activeExampleId, setActiveExampleId] =
    useState<LabelledLinkDemoId>("states");

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        LabelledLinkNavItem["id"],
        LabelledLinkNavItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId((event.detail.value as LabelledLinkDemoId));
      }
    },
    [],
  );

  const renderNavigationItem = useCallback(
    (
      item: ojNavigationList.ItemContext<
        LabelledLinkNavItem["id"],
        LabelledLinkNavItem
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
      labelledLinkNavItems.find((item) => item.id === activeExampleId) ??
      labelledLinkNavItems[0],
    [activeExampleId],
  );

  const ActiveExampleComponent = activeExample.Component;

  return (
    <div
      id="labelledLinkNavigationLayout"
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="navListDemoLayout">
        <oj-navigation-list
          aria-label="Labelled Link examples"
          selection={activeExampleId}
          data={labelledLinkNavDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="oj-flex-item">
        <DemoLayoutTemplate
          componentType="oj-c-labelled-link"
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

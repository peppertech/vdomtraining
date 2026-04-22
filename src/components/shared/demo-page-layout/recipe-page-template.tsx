import { h, type ComponentChildren, type FunctionComponent } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojnavigationlist";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
import { DemoLayoutTemplate } from "./demo-layout-template";

export type RecipePageItem = {
  id: string;
  name: string;
  description: ComponentChildren;
  recipe: ComponentChildren;
  Component: FunctionComponent;
};

type RecipePageTemplateProps = {
  ariaLabel: string;
  componentType: string;
  packLabel?: string;
  items: RecipePageItem[];
  initialItemId?: string;
  layoutId?: string;
};

export function RecipePageTemplate({
  ariaLabel,
  componentType,
  packLabel,
  items,
  initialItemId,
  layoutId,
}: RecipePageTemplateProps) {
  const [activeExampleId, setActiveExampleId] = useState<string>(
    initialItemId ?? items[0]?.id ?? "",
  );

  const navDataProvider = useMemo(
    () =>
      new MutableArrayTreeDataProvider<RecipePageItem["id"], RecipePageItem>(
        items,
        "id",
        { keyAttributeScope: "global" },
      ),
    [items],
  );

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        RecipePageItem["id"],
        RecipePageItem
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
        RecipePageItem["id"],
        RecipePageItem
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
    () => items.find((item) => item.id === activeExampleId) ?? items[0],
    [activeExampleId, items],
  );

  if (!activeExample) {
    return null;
  }

  const ActiveExampleComponent = activeExample.Component;

  if (items.length === 1) {
    return (
      <main class="oj-web-applayout-max-width oj-web-applayout-content oj-sm-padding-4x">
        <DemoLayoutTemplate
          componentType={componentType}
          packLabel={packLabel}
          demoName={activeExample.name}
          description={activeExample.description}
          recipe={activeExample.recipe}
          demo={<ActiveExampleComponent />}
        />
      </main>
    );
  }

  return (
    <div
      id={layoutId}
      class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="navListDemoLayout">
        <oj-navigation-list
          aria-label={ariaLabel}
          selection={activeExampleId}
          data={navDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="oj-flex-item">
        <DemoLayoutTemplate
          componentType={componentType}
          packLabel={packLabel}
          demoName={activeExample.name}
          description={activeExample.description}
          recipe={activeExample.recipe}
          demo={<ActiveExampleComponent />}
        />
      </div>
    </div>
  );
}

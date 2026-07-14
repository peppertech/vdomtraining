import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojnavigationlist";
import { ojNavigationList } from "ojs/ojnavigationlist";
import 'preact';
import { type ComponentChildren,type FunctionComponent } from 'preact';
import { useCallback,useEffect,useMemo,useRef,useState } from "preact/hooks";
import { useExampleRoute } from "../../content/examples/example-route-context";
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
  navigationTitle?: string;
  routeSegments?: string[];
  showNavigationForSingleItem?: boolean;
};

export function RecipePageTemplate({
  ariaLabel,
  componentType,
  packLabel,
  items,
  initialItemId,
  layoutId,
  navigationTitle,
  routeSegments,
  showNavigationForSingleItem,
}: RecipePageTemplateProps) {
  const exampleRoute = useExampleRoute();
  const navigationListRef = useRef<HTMLElement | null>(null);
  const routeItemId =
    routeSegments &&
    routeSegments.every(
      (segment, index) => exampleRoute.segments[index] === segment,
    )
      ? exampleRoute.segments[routeSegments.length]
      : exampleRoute.segments[exampleRoute.segments.length - 1];
  const initialActiveItemId =
    initialItemId ?? items[0]?.id ?? "";
  const activeRouteItem = items.some((item) => item.id === routeItemId)
    ? routeItemId
    : undefined;
  const [activeExampleId, setActiveExampleId] = useState<string>(
    activeRouteItem ?? initialActiveItemId,
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

  const selectExample = useCallback(
    (itemId: string) => {
      setActiveExampleId(itemId);

      if (exampleRoute.category) {
        const nextSegments = routeSegments
          ? [...routeSegments]
          : [...exampleRoute.segments];
        const lastSegment = nextSegments[nextSegments.length - 1];

        if (!routeSegments && items.some((item) => item.id === lastSegment)) {
          nextSegments[nextSegments.length - 1] = itemId;
        } else {
          nextSegments.push(itemId);
        }

        exampleRoute.routeTo(nextSegments);
      }
    },
    [exampleRoute, items, routeSegments],
  );

  const handleNavigationChange = useCallback(
    (
      event: ojNavigationList.selectionChanged<
        RecipePageItem["id"],
        RecipePageItem
      >,
    ) => {
      if (event.detail.updatedFrom === "internal") {
        selectExample(event.detail.value);
      }
    },
    [selectExample],
  );

  useEffect(() => {
    if (activeRouteItem && activeRouteItem !== activeExampleId) {
      setActiveExampleId(activeRouteItem);
    }
  }, [activeExampleId, activeRouteItem]);

  useEffect(() => {
    const navigationList = navigationListRef.current;

    if (!navigationList) {
      return;
    }

    const handleNavigationClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest(
        "a[data-recipe-page-item-id]",
      ) as HTMLAnchorElement | null;
      const itemId = anchor?.dataset.recipePageItemId;

      if (!anchor || !itemId || !navigationList.contains(anchor)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      selectExample(itemId);
    };

    navigationList.addEventListener("click", handleNavigationClick, true);

    return () => {
      navigationList.removeEventListener("click", handleNavigationClick, true);
    };
  }, [selectExample]);

  const renderNavigationItem = useCallback(
    (
      item: ojNavigationList.ItemContext<
        RecipePageItem["id"],
        RecipePageItem
      >,
    ) => (
      <li id={item.data.id}>
        <a
          href="#"
          class="recipe-page-template__navigation-link"
          data-recipe-page-item-id={item.data.id}
          style="color: inherit; text-decoration: none;"
        >
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

  if (items.length === 1 && !showNavigationForSingleItem) {
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
      class="recipe-page-template recipe-page-template--with-nav oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x"
    >
      <div class="recipe-page-template__navigation navListDemoLayout">
        <oj-navigation-list
          ref={navigationListRef}
          aria-label={ariaLabel}
          selection={activeExampleId}
          data={navDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      </div>
      <div class="recipe-page-template__content oj-flex-item">
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

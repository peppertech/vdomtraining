import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { CollapsibleBasicCollapsiblecorepack } from "./collapsible-basicCollapsiblecorepack/collapsible-basicCollapsiblecorepack";
import { collapsibleBasicCollapsiblecorepackDescription } from "./collapsible-basicCollapsiblecorepack/description";
import { collapsibleBasicCollapsiblecorepackRecipe } from "./collapsible-basicCollapsiblecorepack/recipe";
import { CollapsibleBorderscorepack } from "./collapsible-borderscorepack/collapsible-borderscorepack";
import { collapsibleBorderscorepackDescription } from "./collapsible-borderscorepack/description";
import { collapsibleBorderscorepackRecipe } from "./collapsible-borderscorepack/recipe";
import { CollapsibleDeferredRenderingcorepack } from "./collapsible-deferredRenderingcorepack/collapsible-deferredRenderingcorepack";
import { collapsibleDeferredRenderingcorepackDescription } from "./collapsible-deferredRenderingcorepack/description";
import { collapsibleDeferredRenderingcorepackRecipe } from "./collapsible-deferredRenderingcorepack/recipe";
import { CollapsibleEventscorepack } from "./collapsible-eventscorepack/collapsible-eventscorepack";
import { collapsibleEventscorepackDescription } from "./collapsible-eventscorepack/description";
import { collapsibleEventscorepackRecipe } from "./collapsible-eventscorepack/recipe";
import { CollapsibleHeaderBehaviorcorepack } from "./collapsible-headerBehaviorcorepack/collapsible-headerBehaviorcorepack";
import { collapsibleHeaderBehaviorcorepackDescription } from "./collapsible-headerBehaviorcorepack/description";
import { collapsibleHeaderBehaviorcorepackRecipe } from "./collapsible-headerBehaviorcorepack/recipe";
import { CollapsibleHeaderLevelscorepack } from "./collapsible-headerLevelscorepack/collapsible-headerLevelscorepack";
import { collapsibleHeaderLevelscorepackDescription } from "./collapsible-headerLevelscorepack/description";
import { collapsibleHeaderLevelscorepackRecipe } from "./collapsible-headerLevelscorepack/recipe";
import { CollapsibleIconPositioncorepack } from "./collapsible-iconPositioncorepack/collapsible-iconPositioncorepack";
import { collapsibleIconPositioncorepackDescription } from "./collapsible-iconPositioncorepack/description";
import { collapsibleIconPositioncorepackRecipe } from "./collapsible-iconPositioncorepack/recipe";
import { CollapsibleNestedCollapsiblecorepack } from "./collapsible-nestedCollapsiblecorepack/collapsible-nestedCollapsiblecorepack";
import { collapsibleNestedCollapsiblecorepackDescription } from "./collapsible-nestedCollapsiblecorepack/description";
import { collapsibleNestedCollapsiblecorepackRecipe } from "./collapsible-nestedCollapsiblecorepack/recipe";
import { CollapsibleVetoableEventscorepack } from "./collapsible-vetoableEventscorepack/collapsible-vetoableEventscorepack";
import { collapsibleVetoableEventscorepackDescription } from "./collapsible-vetoableEventscorepack/description";
import { collapsibleVetoableEventscorepackRecipe } from "./collapsible-vetoableEventscorepack/recipe";

const collapsibleCorePackItems = [
  {
    id: "basic",
    name: "Basic",
    description: collapsibleBasicCollapsiblecorepackDescription,
    recipe: collapsibleBasicCollapsiblecorepackRecipe,
    Component: CollapsibleBasicCollapsiblecorepack,
  },
  {
    id: "header-levels",
    name: "Header Levels",
    description: collapsibleHeaderLevelscorepackDescription,
    recipe: collapsibleHeaderLevelscorepackRecipe,
    Component: CollapsibleHeaderLevelscorepack,
  },
  {
    id: "icon-position",
    name: "Icon Position",
    description: collapsibleIconPositioncorepackDescription,
    recipe: collapsibleIconPositioncorepackRecipe,
    Component: CollapsibleIconPositioncorepack,
  },
  {
    id: "borders",
    name: "Borders",
    description: collapsibleBorderscorepackDescription,
    recipe: collapsibleBorderscorepackRecipe,
    Component: CollapsibleBorderscorepack,
  },
  {
    id: "header-behavior",
    name: "Header Behavior",
    description: collapsibleHeaderBehaviorcorepackDescription,
    recipe: collapsibleHeaderBehaviorcorepackRecipe,
    Component: CollapsibleHeaderBehaviorcorepack,
  },
  {
    id: "nested-collapsible",
    name: "Nested Collapsible",
    description: collapsibleNestedCollapsiblecorepackDescription,
    recipe: collapsibleNestedCollapsiblecorepackRecipe,
    Component: CollapsibleNestedCollapsiblecorepack,
  },
  {
    id: "events",
    name: "Events",
    description: collapsibleEventscorepackDescription,
    recipe: collapsibleEventscorepackRecipe,
    Component: CollapsibleEventscorepack,
  },
  {
    id: "vetoable-events",
    name: "Vetoable Events",
    description: collapsibleVetoableEventscorepackDescription,
    recipe: collapsibleVetoableEventscorepackRecipe,
    Component: CollapsibleVetoableEventscorepack,
  },
  {
    id: "deferred-rendering",
    name: "Deferred Rendering",
    description: collapsibleDeferredRenderingcorepackDescription,
    recipe: collapsibleDeferredRenderingcorepackRecipe,
    Component: CollapsibleDeferredRenderingcorepack,
  }
];

export default function CollapsibleCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Collapsible Core Pack examples"
      componentType="oj-c-collapsible"
      items={collapsibleCorePackItems}
      initialItemId="basic"
      navigationTitle="Collapsible Core Pack"
    />
  );
}

import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { CollapsibleBasicCollapsible } from "./collapsible-basicCollapsible/collapsible-basicCollapsible";
import { collapsibleBasicCollapsibleDescription } from "./collapsible-basicCollapsible/description";
import { collapsibleBasicCollapsibleRecipe } from "./collapsible-basicCollapsible/recipe";
import { CollapsibleBorders } from "./collapsible-borders/collapsible-borders";
import { collapsibleBordersDescription } from "./collapsible-borders/description";
import { collapsibleBordersRecipe } from "./collapsible-borders/recipe";
import { CollapsibleDeferredRendering } from "./collapsible-deferredRendering/collapsible-deferredRendering";
import { collapsibleDeferredRenderingDescription } from "./collapsible-deferredRendering/description";
import { collapsibleDeferredRenderingRecipe } from "./collapsible-deferredRendering/recipe";
import { CollapsibleEvents } from "./collapsible-events/collapsible-events";
import { collapsibleEventsDescription } from "./collapsible-events/description";
import { collapsibleEventsRecipe } from "./collapsible-events/recipe";
import { CollapsibleHeaderBehavior } from "./collapsible-headerBehavior/collapsible-headerBehavior";
import { collapsibleHeaderBehaviorDescription } from "./collapsible-headerBehavior/description";
import { collapsibleHeaderBehaviorRecipe } from "./collapsible-headerBehavior/recipe";
import { CollapsibleHeaderLevels } from "./collapsible-headerLevels/collapsible-headerLevels";
import { collapsibleHeaderLevelsDescription } from "./collapsible-headerLevels/description";
import { collapsibleHeaderLevelsRecipe } from "./collapsible-headerLevels/recipe";
import { CollapsibleNestedCollapsible } from "./collapsible-nestedCollapsible/collapsible-nestedCollapsible";
import { collapsibleNestedCollapsibleDescription } from "./collapsible-nestedCollapsible/description";
import { collapsibleNestedCollapsibleRecipe } from "./collapsible-nestedCollapsible/recipe";
import { CollapsibleVetoableEvents } from "./collapsible-vetoableEvents/collapsible-vetoableEvents";
import { collapsibleVetoableEventsDescription } from "./collapsible-vetoableEvents/description";
import { collapsibleVetoableEventsRecipe } from "./collapsible-vetoableEvents/recipe";

const collapsibleLegacyItems = [
  {
    id: "basic",
    name: "Basic",
    description: collapsibleBasicCollapsibleDescription,
    recipe: collapsibleBasicCollapsibleRecipe,
    Component: CollapsibleBasicCollapsible,
  },
  {
    id: "header-levels",
    name: "Header Levels",
    description: collapsibleHeaderLevelsDescription,
    recipe: collapsibleHeaderLevelsRecipe,
    Component: CollapsibleHeaderLevels,
  },
  {
    id: "header-behavior",
    name: "Header Behavior",
    description: collapsibleHeaderBehaviorDescription,
    recipe: collapsibleHeaderBehaviorRecipe,
    Component: CollapsibleHeaderBehavior,
  },
  {
    id: "borders",
    name: "Borders",
    description: collapsibleBordersDescription,
    recipe: collapsibleBordersRecipe,
    Component: CollapsibleBorders,
  },
  {
    id: "nested-collapsible",
    name: "Nested Collapsible",
    description: collapsibleNestedCollapsibleDescription,
    recipe: collapsibleNestedCollapsibleRecipe,
    Component: CollapsibleNestedCollapsible,
  },
  {
    id: "events",
    name: "Events",
    description: collapsibleEventsDescription,
    recipe: collapsibleEventsRecipe,
    Component: CollapsibleEvents,
  },
  {
    id: "vetoable-events",
    name: "Vetoable Events",
    description: collapsibleVetoableEventsDescription,
    recipe: collapsibleVetoableEventsRecipe,
    Component: CollapsibleVetoableEvents,
  },
  {
    id: "deferred-rendering",
    name: "Deferred Rendering",
    description: collapsibleDeferredRenderingDescription,
    recipe: collapsibleDeferredRenderingRecipe,
    Component: CollapsibleDeferredRendering,
  }
];

export default function CollapsibleLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Collapsible examples"
      componentType="oj-collapsible"
      items={collapsibleLegacyItems}
      initialItemId="basic"
      navigationTitle="Collapsible"
    />
  );
}

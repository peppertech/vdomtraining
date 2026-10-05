import 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { rowExpanderPlaygrounds } from "./playgrounds";
import { BufferingTreeDataProviderTableRowExpanderMutations } from "./bufferingTreeDataProvider-tableRowExpanderMutations/bufferingTreeDataProvider-tableRowExpanderMutations";
import { bufferingTreeDataProviderTableRowExpanderMutationsDescription } from "./bufferingTreeDataProvider-tableRowExpanderMutations/description";
import { bufferingTreeDataProviderTableRowExpanderMutationsRecipe } from "./bufferingTreeDataProvider-tableRowExpanderMutations/recipe";
import { rowExpanderTableExpandedRowExpanderDescription } from "./rowExpanderTable-expandedRowExpander/description";
import { rowExpanderTableExpandedRowExpanderRecipe } from "./rowExpanderTable-expandedRowExpander/recipe";
import { RowExpanderTableExpandedRowExpander } from "./rowExpanderTable-expandedRowExpander/rowExpanderTable-expandedRowExpander";
import { rowExpanderTableTableAnimationRowExpanderDescription } from "./rowExpanderTable-tableAnimationRowExpander/description";
import { rowExpanderTableTableAnimationRowExpanderRecipe } from "./rowExpanderTable-tableAnimationRowExpander/recipe";
import { RowExpanderTableTableAnimationRowExpander } from "./rowExpanderTable-tableAnimationRowExpander/rowExpanderTable-tableAnimationRowExpander";
import { rowExpanderTableTableCollectionRowExpanderDescription } from "./rowExpanderTable-tableCollectionRowExpander/description";
import { rowExpanderTableTableCollectionRowExpanderRecipe } from "./rowExpanderTable-tableCollectionRowExpander/recipe";
import { RowExpanderTableTableCollectionRowExpander } from "./rowExpanderTable-tableCollectionRowExpander/rowExpanderTable-tableCollectionRowExpander";
import { rowExpanderTableTablePerformanceRowExpanderDescription } from "./rowExpanderTable-tablePerformanceRowExpander/description";
import { rowExpanderTableTablePerformanceRowExpanderRecipe } from "./rowExpanderTable-tablePerformanceRowExpander/recipe";
import { RowExpanderTableTablePerformanceRowExpander } from "./rowExpanderTable-tablePerformanceRowExpander/rowExpanderTable-tablePerformanceRowExpander";
import { rowExpanderTableTableRowExpanderDescription } from "./rowExpanderTable-tableRowExpander/description";
import { rowExpanderTableTableRowExpanderRecipe } from "./rowExpanderTable-tableRowExpander/recipe";
import { RowExpanderTableTableRowExpander } from "./rowExpanderTable-tableRowExpander/rowExpanderTable-tableRowExpander";

const rowExpanderItems = [
  {
    id: "table-row-expander",
    name: "Basic",
    description: rowExpanderTableTableRowExpanderDescription,
    recipe: rowExpanderTableTableRowExpanderRecipe,
    Component: RowExpanderTableTableRowExpander,
    playground: rowExpanderPlaygrounds["rowExpanderTable-tableRowExpander"],
  },
  {
    id: "table-collection-row-expander",
    name: "Lazy loading",
    description: rowExpanderTableTableCollectionRowExpanderDescription,
    recipe: rowExpanderTableTableCollectionRowExpanderRecipe,
    Component: RowExpanderTableTableCollectionRowExpander,
    playground: rowExpanderPlaygrounds["rowExpanderTable-tableCollectionRowExpander"],
  },
  {
    id: "table-animation-row-expander",
    name: "Custom Animations",
    description: rowExpanderTableTableAnimationRowExpanderDescription,
    recipe: rowExpanderTableTableAnimationRowExpanderRecipe,
    Component: RowExpanderTableTableAnimationRowExpander,
    playground: rowExpanderPlaygrounds["rowExpanderTable-tableAnimationRowExpander"],
  },
  {
    id: "expanded-row-expander",
    name: "Programatically Expanding Rows",
    description: rowExpanderTableExpandedRowExpanderDescription,
    recipe: rowExpanderTableExpandedRowExpanderRecipe,
    Component: RowExpanderTableExpandedRowExpander,
    playground: rowExpanderPlaygrounds["rowExpanderTable-expandedRowExpander"],
  },
  {
    id: "table-performance-row-expander",
    name: "Performance: Data Set Size",
    description: rowExpanderTableTablePerformanceRowExpanderDescription,
    recipe: rowExpanderTableTablePerformanceRowExpanderRecipe,
    Component: RowExpanderTableTablePerformanceRowExpander,
    playground: rowExpanderPlaygrounds["rowExpanderTable-tablePerformanceRowExpander"],
  },
  {
    id: "table-row-expander-mutations",
    name: "Mutations",
    description: bufferingTreeDataProviderTableRowExpanderMutationsDescription,
    recipe: bufferingTreeDataProviderTableRowExpanderMutationsRecipe,
    Component: BufferingTreeDataProviderTableRowExpanderMutations,
    playground: rowExpanderPlaygrounds["bufferingTreeDataProvider-tableRowExpanderMutations"],
  }
];

export default function RowExpanderRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Row Expander examples"
      componentType="oj-row-expander"
      items={rowExpanderItems}
      initialItemId="table-row-expander"
      navigationTitle="Row Expander"
    />
  );
}

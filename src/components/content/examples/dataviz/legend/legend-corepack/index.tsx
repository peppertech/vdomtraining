import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { legendContextMenucorepackDescription } from "./legend-contextMenucorepack/description";
import { LegendContextMenucorepack } from "./legend-contextMenucorepack/legend-contextMenucorepack";
import { legendContextMenucorepackRecipe } from "./legend-contextMenucorepack/recipe";
import { legendDefaultcorepackDescription } from "./legend-defaultcorepack/description";
import { LegendDefaultcorepack } from "./legend-defaultcorepack/legend-defaultcorepack";
import { legendDefaultcorepackRecipe } from "./legend-defaultcorepack/recipe";
import { legendItemscorepackDescription } from "./legend-itemscorepack/description";
import { LegendItemscorepack } from "./legend-itemscorepack/legend-itemscorepack";
import { legendItemscorepackRecipe } from "./legend-itemscorepack/recipe";
import { legendLayoutcorepackDescription } from "./legend-layoutcorepack/description";
import { LegendLayoutcorepack } from "./legend-layoutcorepack/legend-layoutcorepack";
import { legendLayoutcorepackRecipe } from "./legend-layoutcorepack/recipe";
import { legendSectionscorepackDescription } from "./legend-sectionscorepack/description";
import { LegendSectionscorepack } from "./legend-sectionscorepack/legend-sectionscorepack";
import { legendSectionscorepackRecipe } from "./legend-sectionscorepack/recipe";
import { legendShapedDatacorepackDescription } from "./legend-shapedDatacorepack/description";
import { LegendShapedDatacorepack } from "./legend-shapedDatacorepack/legend-shapedDatacorepack";
import { legendShapedDatacorepackRecipe } from "./legend-shapedDatacorepack/recipe";
import { legendStylescorepackDescription } from "./legend-stylescorepack/description";
import { LegendStylescorepack } from "./legend-stylescorepack/legend-stylescorepack";
import { legendStylescorepackRecipe } from "./legend-stylescorepack/recipe";

const legendItems: RecipePageItem[] = [
  {
    id: "default",
    name: "Basic",
    description: legendDefaultcorepackDescription,
    recipe: legendDefaultcorepackRecipe,
    Component: LegendDefaultcorepack,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: legendShapedDatacorepackDescription,
    recipe: legendShapedDatacorepackRecipe,
    Component: LegendShapedDatacorepack,
  },
  {
    id: "items",
    name: "Icons",
    description: legendItemscorepackDescription,
    recipe: legendItemscorepackRecipe,
    Component: LegendItemscorepack,
  },
  {
    id: "sections",
    name: "Sections",
    description: legendSectionscorepackDescription,
    recipe: legendSectionscorepackRecipe,
    Component: LegendSectionscorepack,
  },

  {
    id: "layout",
    name: "Layout",
    description: legendLayoutcorepackDescription,
    recipe: legendLayoutcorepackRecipe,
    Component: LegendLayoutcorepack,
  },

  {
    id: "styles",
    name: "Styles",
    description: legendStylescorepackDescription,
    recipe: legendStylescorepackRecipe,
    Component: LegendStylescorepack,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: legendContextMenucorepackDescription,
    recipe: legendContextMenucorepackRecipe,
    Component: LegendContextMenucorepack,
  },
];

export default function LegendCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Legend examples"
      componentType="oj-c-legend"
      packLabel="Core Pack"
      layoutId="legendNavigationLayout"
      items={legendItems}
      initialItemId="default"
      navigationTitle="Legend"
    />
  );
}

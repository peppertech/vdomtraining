import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { LegendContextMenucorepack } from "./legend-contextMenucorepack/legend-contextMenucorepack";
import { legendContextMenucorepackDescription } from "./legend-contextMenucorepack/description";
import { legendContextMenucorepackRecipe } from "./legend-contextMenucorepack/recipe";
import { LegendDefaultcorepack } from "./legend-defaultcorepack/legend-defaultcorepack";
import { legendDefaultcorepackDescription } from "./legend-defaultcorepack/description";
import { legendDefaultcorepackRecipe } from "./legend-defaultcorepack/recipe";
import { LegendItemscorepack } from "./legend-itemscorepack/legend-itemscorepack";
import { legendItemscorepackDescription } from "./legend-itemscorepack/description";
import { legendItemscorepackRecipe } from "./legend-itemscorepack/recipe";
import { LegendLayoutcorepack } from "./legend-layoutcorepack/legend-layoutcorepack";
import { legendLayoutcorepackDescription } from "./legend-layoutcorepack/description";
import { legendLayoutcorepackRecipe } from "./legend-layoutcorepack/recipe";
import { LegendSectionscorepack } from "./legend-sectionscorepack/legend-sectionscorepack";
import { legendSectionscorepackDescription } from "./legend-sectionscorepack/description";
import { legendSectionscorepackRecipe } from "./legend-sectionscorepack/recipe";
import { LegendShapedDatacorepack } from "./legend-shapedDatacorepack/legend-shapedDatacorepack";
import { legendShapedDatacorepackDescription } from "./legend-shapedDatacorepack/description";
import { legendShapedDatacorepackRecipe } from "./legend-shapedDatacorepack/recipe";
import { LegendStylescorepack } from "./legend-stylescorepack/legend-stylescorepack";
import { legendStylescorepackDescription } from "./legend-stylescorepack/description";
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

import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { PictoChartBasiccorepack } from "./pictoChart-basiccorepack/pictoChart-basiccorepack";
import { pictoChartBasiccorepackDescription } from "./pictoChart-basiccorepack/description";
import { pictoChartBasiccorepackRecipe } from "./pictoChart-basiccorepack/recipe";
import { PictoChartContextMenucorepack } from "./pictoChart-contextMenucorepack/pictoChart-contextMenucorepack";
import { pictoChartContextMenucorepackDescription } from "./pictoChart-contextMenucorepack/description";
import { pictoChartContextMenucorepackRecipe } from "./pictoChart-contextMenucorepack/recipe";
import { PictoChartDashboardcorepack } from "./pictoChart-dashboardcorepack/pictoChart-dashboardcorepack";
import { pictoChartDashboardcorepackDescription } from "./pictoChart-dashboardcorepack/description";
import { pictoChartDashboardcorepackRecipe } from "./pictoChart-dashboardcorepack/recipe";
import { PictoChartFractionscorepack } from "./pictoChart-fractionscorepack/pictoChart-fractionscorepack";
import { pictoChartFractionscorepackDescription } from "./pictoChart-fractionscorepack/description";
import { pictoChartFractionscorepackRecipe } from "./pictoChart-fractionscorepack/recipe";
import { PictoChartLayoutcorepack } from "./pictoChart-layoutcorepack/pictoChart-layoutcorepack";
import { pictoChartLayoutcorepackDescription } from "./pictoChart-layoutcorepack/description";
import { pictoChartLayoutcorepackRecipe } from "./pictoChart-layoutcorepack/recipe";
import { PictoChartMixedSizescorepack } from "./pictoChart-mixedSizescorepack/pictoChart-mixedSizescorepack";
import { pictoChartMixedSizescorepackDescription } from "./pictoChart-mixedSizescorepack/description";
import { pictoChartMixedSizescorepackRecipe } from "./pictoChart-mixedSizescorepack/recipe";
import { PictoChartPerformancecorepack } from "./pictoChart-performancecorepack/pictoChart-performancecorepack";
import { pictoChartPerformancecorepackDescription } from "./pictoChart-performancecorepack/description";
import { pictoChartPerformancecorepackRecipe } from "./pictoChart-performancecorepack/recipe";
import { PictoChartSelectioncorepack } from "./pictoChart-selectioncorepack/pictoChart-selectioncorepack";
import { pictoChartSelectioncorepackDescription } from "./pictoChart-selectioncorepack/description";
import { pictoChartSelectioncorepackRecipe } from "./pictoChart-selectioncorepack/recipe";
import { PictoChartShapedcorepack } from "./pictoChart-shapedcorepack/pictoChart-shapedcorepack";
import { pictoChartShapedcorepackDescription } from "./pictoChart-shapedcorepack/description";
import { pictoChartShapedcorepackRecipe } from "./pictoChart-shapedcorepack/recipe";
import { PictoChartSingletoncorepack } from "./pictoChart-singletoncorepack/pictoChart-singletoncorepack";
import { pictoChartSingletoncorepackDescription } from "./pictoChart-singletoncorepack/description";
import { pictoChartSingletoncorepackRecipe } from "./pictoChart-singletoncorepack/recipe";

const pictoChartCorePackItems: RecipePageItem[] = [
  {
    id: "basic",
    name: "Basic",
    description: pictoChartBasiccorepackDescription,
    recipe: pictoChartBasiccorepackRecipe,
    Component: PictoChartBasiccorepack,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: pictoChartContextMenucorepackDescription,
    recipe: pictoChartContextMenucorepackRecipe,
    Component: PictoChartContextMenucorepack,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: pictoChartDashboardcorepackDescription,
    recipe: pictoChartDashboardcorepackRecipe,
    Component: PictoChartDashboardcorepack,
  },
  {
    id: "fractions",
    name: "Fractions",
    description: pictoChartFractionscorepackDescription,
    recipe: pictoChartFractionscorepackRecipe,
    Component: PictoChartFractionscorepack,
  },
  {
    id: "layout",
    name: "Layout",
    description: pictoChartLayoutcorepackDescription,
    recipe: pictoChartLayoutcorepackRecipe,
    Component: PictoChartLayoutcorepack,
  },
  {
    id: "mixed-sizes",
    name: "Mixed Sizes",
    description: pictoChartMixedSizescorepackDescription,
    recipe: pictoChartMixedSizescorepackRecipe,
    Component: PictoChartMixedSizescorepack,
  },
  {
    id: "performance",
    name: "Performance",
    description: pictoChartPerformancecorepackDescription,
    recipe: pictoChartPerformancecorepackRecipe,
    Component: PictoChartPerformancecorepack,
  },
  {
    id: "selection",
    name: "Selection",
    description: pictoChartSelectioncorepackDescription,
    recipe: pictoChartSelectioncorepackRecipe,
    Component: PictoChartSelectioncorepack,
  },
  {
    id: "shaped",
    name: "Shaped",
    description: pictoChartShapedcorepackDescription,
    recipe: pictoChartShapedcorepackRecipe,
    Component: PictoChartShapedcorepack,
  },
  {
    id: "singleton",
    name: "Singleton",
    description: pictoChartSingletoncorepackDescription,
    recipe: pictoChartSingletoncorepackRecipe,
    Component: PictoChartSingletoncorepack,
  },
];

export default function PictoChartCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Picto Chart Core Pack examples"
      componentType="oj-c-picto-chart"
      packLabel="Core Pack"
      layoutId="pictoChartCorePackNavigationLayout"
      items={pictoChartCorePackItems}
      initialItemId="basic"
      navigationTitle="Picto Chart Core Pack"
    />
  );
}

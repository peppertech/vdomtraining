import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { pictoChartBasiccorepackDescription } from "./pictoChart-basiccorepack/description";
import { PictoChartBasiccorepack } from "./pictoChart-basiccorepack/pictoChart-basiccorepack";
import { pictoChartBasiccorepackRecipe } from "./pictoChart-basiccorepack/recipe";
import { pictoChartContextMenucorepackDescription } from "./pictoChart-contextMenucorepack/description";
import { PictoChartContextMenucorepack } from "./pictoChart-contextMenucorepack/pictoChart-contextMenucorepack";
import { pictoChartContextMenucorepackRecipe } from "./pictoChart-contextMenucorepack/recipe";
import { pictoChartDashboardcorepackDescription } from "./pictoChart-dashboardcorepack/description";
import { PictoChartDashboardcorepack } from "./pictoChart-dashboardcorepack/pictoChart-dashboardcorepack";
import { pictoChartDashboardcorepackRecipe } from "./pictoChart-dashboardcorepack/recipe";
import { pictoChartFractionscorepackDescription } from "./pictoChart-fractionscorepack/description";
import { PictoChartFractionscorepack } from "./pictoChart-fractionscorepack/pictoChart-fractionscorepack";
import { pictoChartFractionscorepackRecipe } from "./pictoChart-fractionscorepack/recipe";
import { pictoChartLayoutcorepackDescription } from "./pictoChart-layoutcorepack/description";
import { PictoChartLayoutcorepack } from "./pictoChart-layoutcorepack/pictoChart-layoutcorepack";
import { pictoChartLayoutcorepackRecipe } from "./pictoChart-layoutcorepack/recipe";
import { pictoChartMixedSizescorepackDescription } from "./pictoChart-mixedSizescorepack/description";
import { PictoChartMixedSizescorepack } from "./pictoChart-mixedSizescorepack/pictoChart-mixedSizescorepack";
import { pictoChartMixedSizescorepackRecipe } from "./pictoChart-mixedSizescorepack/recipe";
import { pictoChartPerformancecorepackDescription } from "./pictoChart-performancecorepack/description";
import { PictoChartPerformancecorepack } from "./pictoChart-performancecorepack/pictoChart-performancecorepack";
import { pictoChartPerformancecorepackRecipe } from "./pictoChart-performancecorepack/recipe";
import { pictoChartSelectioncorepackDescription } from "./pictoChart-selectioncorepack/description";
import { PictoChartSelectioncorepack } from "./pictoChart-selectioncorepack/pictoChart-selectioncorepack";
import { pictoChartSelectioncorepackRecipe } from "./pictoChart-selectioncorepack/recipe";
import { pictoChartShapedcorepackDescription } from "./pictoChart-shapedcorepack/description";
import { PictoChartShapedcorepack } from "./pictoChart-shapedcorepack/pictoChart-shapedcorepack";
import { pictoChartShapedcorepackRecipe } from "./pictoChart-shapedcorepack/recipe";
import { pictoChartSingletoncorepackDescription } from "./pictoChart-singletoncorepack/description";
import { PictoChartSingletoncorepack } from "./pictoChart-singletoncorepack/pictoChart-singletoncorepack";
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
    name: "Selection & Drilling",
    description: pictoChartSelectioncorepackDescription,
    recipe: pictoChartSelectioncorepackRecipe,
    Component: PictoChartSelectioncorepack,
  },
  {
    id: "shaped",
    name: "Shaped Data",
    description: pictoChartShapedcorepackDescription,
    recipe: pictoChartShapedcorepackRecipe,
    Component: PictoChartShapedcorepack,
  },
  {
    id: "dashboard",
    name: "Use Case: Dashboard",
    description: pictoChartDashboardcorepackDescription,
    recipe: pictoChartDashboardcorepackRecipe,
    Component: PictoChartDashboardcorepack,
  },
  {
    id: "singleton",
    name: "Use Case: Singleton",
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

import { h } from "preact";
import { RecipePageTemplate } from "../../../../../../shared/demo-page-layout/recipe-page-template";
import { AreaChartBasiccorepack } from "./areaChart-basiccorepack/areaChart-basiccorepack";
import { areaChartBasiccorepackDescription } from "./areaChart-basiccorepack/description";
import { areaChartBasiccorepackRecipe } from "./areaChart-basiccorepack/recipe";
import { AreaChartHideShowcorepack } from "./areaChart-hideShowcorepack/areaChart-hideShowcorepack";
import { areaChartHideShowcorepackDescription } from "./areaChart-hideShowcorepack/description";
import { areaChartHideShowcorepackRecipe } from "./areaChart-hideShowcorepack/recipe";
import { AreaChartLineTypescorepack } from "./areaChart-lineTypescorepack/areaChart-lineTypescorepack";
import { areaChartLineTypescorepackDescription } from "./areaChart-lineTypescorepack/description";
import { areaChartLineTypescorepackRecipe } from "./areaChart-lineTypescorepack/recipe";
import { AreaChartSelectioncorepack } from "./areaChart-selectioncorepack/areaChart-selectioncorepack";
import { areaChartSelectioncorepackDescription } from "./areaChart-selectioncorepack/description";
import { areaChartSelectioncorepackRecipe } from "./areaChart-selectioncorepack/recipe";
import { AreaChartShapedDatacorepack } from "./areaChart-shapedDatacorepack/areaChart-shapedDatacorepack";
import { areaChartShapedDatacorepackDescription } from "./areaChart-shapedDatacorepack/description";
import { areaChartShapedDatacorepackRecipe } from "./areaChart-shapedDatacorepack/recipe";
import { AreaChartStylescorepack } from "./areaChart-stylescorepack/areaChart-stylescorepack";
import { areaChartStylescorepackDescription } from "./areaChart-stylescorepack/description";
import { areaChartStylescorepackRecipe } from "./areaChart-stylescorepack/recipe";

const areaChartCorePackItems = [
  {
    id: "overview",
    name: "Basic",
    description: areaChartBasiccorepackDescription,
    recipe: areaChartBasiccorepackRecipe,
    Component: AreaChartBasiccorepack,
  },
  {
    id: "hide-show",
    name: "Hide & Show",
    description: areaChartHideShowcorepackDescription,
    recipe: areaChartHideShowcorepackRecipe,
    Component: AreaChartHideShowcorepack,
  },
  {
    id: "line-types",
    name: "Line Types",
    description: areaChartLineTypescorepackDescription,
    recipe: areaChartLineTypescorepackRecipe,
    Component: AreaChartLineTypescorepack,
  },
  {
    id: "selection",
    name: "Selection",
    description: areaChartSelectioncorepackDescription,
    recipe: areaChartSelectioncorepackRecipe,
    Component: AreaChartSelectioncorepack,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: areaChartShapedDatacorepackDescription,
    recipe: areaChartShapedDatacorepackRecipe,
    Component: AreaChartShapedDatacorepack,
  },

  {
    id: "styling",
    name: "Styles",
    description: areaChartStylescorepackDescription,
    recipe: areaChartStylescorepackRecipe,
    Component: AreaChartStylescorepack,
  },
];

export default function AreaChartCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Area chart core pack examples"
      componentType="oj-c-area-chart"
      packLabel="Core Pack"
      layoutId="areaChartCorePackNavigationLayout"
      items={areaChartCorePackItems}
      initialItemId="overview"
      navigationTitle="Area Chart"
    />
  );
}

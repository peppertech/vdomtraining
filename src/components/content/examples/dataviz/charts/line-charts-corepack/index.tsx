import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { LineChartBasiccorepack } from "./lineChart-basiccorepack/lineChart-basiccorepack";
import { lineChartBasiccorepackDescription } from "./lineChart-basiccorepack/description";
import { lineChartBasiccorepackRecipe } from "./lineChart-basiccorepack/recipe";
import { LineChartDataLabelscorepack } from "./lineChart-dataLabelscorepack/lineChart-dataLabelscorepack";
import { lineChartDataLabelscorepackDescription } from "./lineChart-dataLabelscorepack/description";
import { lineChartDataLabelscorepackRecipe } from "./lineChart-dataLabelscorepack/recipe";
import { LineChartDualYcorepack } from "./lineChart-dualYcorepack/lineChart-dualYcorepack";
import { lineChartDualYcorepackDescription } from "./lineChart-dualYcorepack/description";
import { lineChartDualYcorepackRecipe } from "./lineChart-dualYcorepack/recipe";
import { LineChartHideShowcorepack } from "./lineChart-hideShowcorepack/lineChart-hideShowcorepack";
import { lineChartHideShowcorepackDescription } from "./lineChart-hideShowcorepack/description";
import { lineChartHideShowcorepackRecipe } from "./lineChart-hideShowcorepack/recipe";
import { LineChartLineTypescorepack } from "./lineChart-lineTypescorepack/lineChart-lineTypescorepack";
import { lineChartLineTypescorepackDescription } from "./lineChart-lineTypescorepack/description";
import { lineChartLineTypescorepackRecipe } from "./lineChart-lineTypescorepack/recipe";
import { LineChartSelectioncorepack } from "./lineChart-selectioncorepack/lineChart-selectioncorepack";
import { lineChartSelectioncorepackDescription } from "./lineChart-selectioncorepack/description";
import { lineChartSelectioncorepackRecipe } from "./lineChart-selectioncorepack/recipe";
import { LineChartShapedDatacorepack } from "./lineChart-shapedDatacorepack/lineChart-shapedDatacorepack";
import { lineChartShapedDatacorepackDescription } from "./lineChart-shapedDatacorepack/description";
import { lineChartShapedDatacorepackRecipe } from "./lineChart-shapedDatacorepack/recipe";
import { LineChartStylescorepack } from "./lineChart-stylescorepack/lineChart-stylescorepack";
import { lineChartStylescorepackDescription } from "./lineChart-stylescorepack/description";
import { lineChartStylescorepackRecipe } from "./lineChart-stylescorepack/recipe";

const lineChartCorePackItems = [
  {
    id: "overview",
    name: "Basic",
    description: lineChartBasiccorepackDescription,
    recipe: lineChartBasiccorepackRecipe,
    Component: LineChartBasiccorepack,
  },
  {
    id: "data-labels",
    name: "Data Labels",
    description: lineChartDataLabelscorepackDescription,
    recipe: lineChartDataLabelscorepackRecipe,
    Component: LineChartDataLabelscorepack,
  },
  {
    id: "dual-y-axis",
    name: "Dual Y Axis",
    description: lineChartDualYcorepackDescription,
    recipe: lineChartDualYcorepackRecipe,
    Component: LineChartDualYcorepack,
  },
  {
    id: "hide-show",
    name: "Hide & Show",
    description: lineChartHideShowcorepackDescription,
    recipe: lineChartHideShowcorepackRecipe,
    Component: LineChartHideShowcorepack,
  },
  {
    id: "line-types",
    name: "Line Types",
    description: lineChartLineTypescorepackDescription,
    recipe: lineChartLineTypescorepackRecipe,
    Component: LineChartLineTypescorepack,
  },
  {
    id: "selection",
    name: "Selection",
    description: lineChartSelectioncorepackDescription,
    recipe: lineChartSelectioncorepackRecipe,
    Component: LineChartSelectioncorepack,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: lineChartShapedDatacorepackDescription,
    recipe: lineChartShapedDatacorepackRecipe,
    Component: LineChartShapedDatacorepack,
  },
  {
    id: "styling",
    name: "Styles",
    description: lineChartStylescorepackDescription,
    recipe: lineChartStylescorepackRecipe,
    Component: LineChartStylescorepack,
  },
];

export default function LineChartsCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Line chart core pack examples"
      componentType="oj-c-line-chart"
      packLabel="Core Pack"
      layoutId="lineChartCorePackNavigationLayout"
      items={lineChartCorePackItems}
      initialItemId="overview"
      navigationTitle="Line Chart"
    />
  );
}

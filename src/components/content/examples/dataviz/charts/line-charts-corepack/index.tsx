import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { lineChartBasiccorepackDescription } from "./lineChart-basiccorepack/description";
import { LineChartBasiccorepack } from "./lineChart-basiccorepack/lineChart-basiccorepack";
import { lineChartBasiccorepackRecipe } from "./lineChart-basiccorepack/recipe";
import { lineChartDataLabelscorepackDescription } from "./lineChart-dataLabelscorepack/description";
import { LineChartDataLabelscorepack } from "./lineChart-dataLabelscorepack/lineChart-dataLabelscorepack";
import { lineChartDataLabelscorepackRecipe } from "./lineChart-dataLabelscorepack/recipe";
import { lineChartDualYcorepackDescription } from "./lineChart-dualYcorepack/description";
import { LineChartDualYcorepack } from "./lineChart-dualYcorepack/lineChart-dualYcorepack";
import { lineChartDualYcorepackRecipe } from "./lineChart-dualYcorepack/recipe";
import { lineChartHideShowcorepackDescription } from "./lineChart-hideShowcorepack/description";
import { LineChartHideShowcorepack } from "./lineChart-hideShowcorepack/lineChart-hideShowcorepack";
import { lineChartHideShowcorepackRecipe } from "./lineChart-hideShowcorepack/recipe";
import { lineChartLineTypescorepackDescription } from "./lineChart-lineTypescorepack/description";
import { LineChartLineTypescorepack } from "./lineChart-lineTypescorepack/lineChart-lineTypescorepack";
import { lineChartLineTypescorepackRecipe } from "./lineChart-lineTypescorepack/recipe";
import { lineChartSelectioncorepackDescription } from "./lineChart-selectioncorepack/description";
import { LineChartSelectioncorepack } from "./lineChart-selectioncorepack/lineChart-selectioncorepack";
import { lineChartSelectioncorepackRecipe } from "./lineChart-selectioncorepack/recipe";
import { lineChartShapedDatacorepackDescription } from "./lineChart-shapedDatacorepack/description";
import { LineChartShapedDatacorepack } from "./lineChart-shapedDatacorepack/lineChart-shapedDatacorepack";
import { lineChartShapedDatacorepackRecipe } from "./lineChart-shapedDatacorepack/recipe";
import { lineChartStylescorepackDescription } from "./lineChart-stylescorepack/description";
import { LineChartStylescorepack } from "./lineChart-stylescorepack/lineChart-stylescorepack";
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

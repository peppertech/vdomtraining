import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { FunnelChartAnimation } from "./funnelChart-animation/funnelChart-animation";
import { funnelChartAnimationDescription } from "./funnelChart-animation/description";
import { funnelChartAnimationRecipe } from "./funnelChart-animation/recipe";
import { FunnelChartDefault } from "./funnelChart-default/funnelChart-default";
import { funnelChartDefaultDescription } from "./funnelChart-default/description";
import { funnelChartDefaultRecipe } from "./funnelChart-default/recipe";
import { FunnelChartLegend } from "./funnelChart-legend/funnelChart-legend";
import { funnelChartLegendDescription } from "./funnelChart-legend/description";
import { funnelChartLegendRecipe } from "./funnelChart-legend/recipe";
import { FunnelChartSelection } from "./funnelChart-selection/funnelChart-selection";
import { funnelChartSelectionDescription } from "./funnelChart-selection/description";
import { funnelChartSelectionRecipe } from "./funnelChart-selection/recipe";
import { FunnelChartShapedData } from "./funnelChart-shapedData/funnelChart-shapedData";
import { funnelChartShapedDataDescription } from "./funnelChart-shapedData/description";
import { funnelChartShapedDataRecipe } from "./funnelChart-shapedData/recipe";
import { FunnelChartStyles } from "./funnelChart-styles/funnelChart-styles";
import { funnelChartStylesDescription } from "./funnelChart-styles/description";
import { funnelChartStylesRecipe } from "./funnelChart-styles/recipe";
import { FunnelChartTargetValues } from "./funnelChart-targetValues/funnelChart-targetValues";
import { funnelChartTargetValuesDescription } from "./funnelChart-targetValues/description";
import { funnelChartTargetValuesRecipe } from "./funnelChart-targetValues/recipe";

const funnelChartItems = [
  { id: "overview", name: "Overview", description: funnelChartDefaultDescription, recipe: funnelChartDefaultRecipe, Component: FunnelChartDefault },
  { id: "shaped-data", name: "Shaped Data", description: funnelChartShapedDataDescription, recipe: funnelChartShapedDataRecipe, Component: FunnelChartShapedData },
  { id: "selection", name: "Selection", description: funnelChartSelectionDescription, recipe: funnelChartSelectionRecipe, Component: FunnelChartSelection },
  { id: "legend", name: "Legend", description: funnelChartLegendDescription, recipe: funnelChartLegendRecipe, Component: FunnelChartLegend },
  { id: "target-values", name: "Target Values", description: funnelChartTargetValuesDescription, recipe: funnelChartTargetValuesRecipe, Component: FunnelChartTargetValues },
  { id: "animation", name: "Animation", description: funnelChartAnimationDescription, recipe: funnelChartAnimationRecipe, Component: FunnelChartAnimation },
  { id: "styling", name: "Styling", description: funnelChartStylesDescription, recipe: funnelChartStylesRecipe, Component: FunnelChartStyles },
];

export default function FunnelChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Funnel chart examples"
      componentType="oj-chart"
      layoutId="funnelChartsNavigationLayout"
      items={funnelChartItems}
      initialItemId="overview"
      navigationTitle="Funnel Charts"
    />
  );
}

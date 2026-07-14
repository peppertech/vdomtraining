import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { sparkChartAnimationDescription } from "./sparkChart-animation/description";
import { sparkChartAnimationRecipe } from "./sparkChart-animation/recipe";
import { SparkChartAnimation } from "./sparkChart-animation/sparkChart-animation";
import { sparkChartDefaultDescription } from "./sparkChart-default/description";
import { sparkChartDefaultRecipe } from "./sparkChart-default/recipe";
import { SparkChartDefault } from "./sparkChart-default/sparkChart-default";
import { sparkChartRefObjectDescription } from "./sparkChart-refObject/description";
import { sparkChartRefObjectRecipe } from "./sparkChart-refObject/recipe";
import { SparkChartRefObject } from "./sparkChart-refObject/sparkChart-refObject";
import { sparkChartShapedDataDescription } from "./sparkChart-shapedData/description";
import { sparkChartShapedDataRecipe } from "./sparkChart-shapedData/recipe";
import { SparkChartShapedData } from "./sparkChart-shapedData/sparkChart-shapedData";
import { sparkChartStylesDescription } from "./sparkChart-styles/description";
import { sparkChartStylesRecipe } from "./sparkChart-styles/recipe";
import { SparkChartStyles } from "./sparkChart-styles/sparkChart-styles";

const sparkChartItems = [
  {
    id: "overview",
    name: "Basic",
    description: sparkChartDefaultDescription,
    recipe: sparkChartDefaultRecipe,
    Component: SparkChartDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: sparkChartAnimationDescription,
    recipe: sparkChartAnimationRecipe,
    Component: SparkChartAnimation,
  },
  {
    id: "reference-objects",
    name: "Reference Objects",
    description: sparkChartRefObjectDescription,
    recipe: sparkChartRefObjectRecipe,
    Component: SparkChartRefObject,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: sparkChartShapedDataDescription,
    recipe: sparkChartShapedDataRecipe,
    Component: SparkChartShapedData,
  },
  {
    id: "styling",
    name: "Styles",
    description: sparkChartStylesDescription,
    recipe: sparkChartStylesRecipe,
    Component: SparkChartStyles,
  },
];

export default function SparkChartsRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Spark chart examples"
      componentType="oj-spark-chart"
      layoutId="sparkChartsNavigationLayout"
      items={sparkChartItems}
      initialItemId="overview"
      navigationTitle="Spark Charts"
    />
  );
}

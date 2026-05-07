import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { PictoChartAnimation } from "./pictoChart-animation/pictoChart-animation";
import { pictoChartAnimationDescription } from "./pictoChart-animation/description";
import { pictoChartAnimationRecipe } from "./pictoChart-animation/recipe";
import { PictoChartCustomImages } from "./pictoChart-customImages/pictoChart-customImages";
import { pictoChartCustomImagesDescription } from "./pictoChart-customImages/description";
import { pictoChartCustomImagesRecipe } from "./pictoChart-customImages/recipe";
import { PictoChartCustomShapes } from "./pictoChart-customShapes/pictoChart-customShapes";
import { pictoChartCustomShapesDescription } from "./pictoChart-customShapes/description";
import { pictoChartCustomShapesRecipe } from "./pictoChart-customShapes/recipe";
import { PictoChartDashboard } from "./pictoChart-dashboard/pictoChart-dashboard";
import { pictoChartDashboardDescription } from "./pictoChart-dashboard/description";
import { pictoChartDashboardRecipe } from "./pictoChart-dashboard/recipe";
import { PictoChartDefault } from "./pictoChart-default/pictoChart-default";
import { pictoChartDefaultDescription } from "./pictoChart-default/description";
import { pictoChartDefaultRecipe } from "./pictoChart-default/recipe";
import { PictoChartFractions } from "./pictoChart-fractions/pictoChart-fractions";
import { pictoChartFractionsDescription } from "./pictoChart-fractions/description";
import { pictoChartFractionsRecipe } from "./pictoChart-fractions/recipe";
import { PictoChartLayout } from "./pictoChart-layout/pictoChart-layout";
import { pictoChartLayoutDescription } from "./pictoChart-layout/description";
import { pictoChartLayoutRecipe } from "./pictoChart-layout/recipe";
import { PictoChartMixedSizes } from "./pictoChart-mixedSizes/pictoChart-mixedSizes";
import { pictoChartMixedSizesDescription } from "./pictoChart-mixedSizes/description";
import { pictoChartMixedSizesRecipe } from "./pictoChart-mixedSizes/recipe";
import { PictoChartPerformance } from "./pictoChart-performance/pictoChart-performance";
import { pictoChartPerformanceDescription } from "./pictoChart-performance/description";
import { pictoChartPerformanceRecipe } from "./pictoChart-performance/recipe";
import { PictoChartSelection } from "./pictoChart-selection/pictoChart-selection";
import { pictoChartSelectionDescription } from "./pictoChart-selection/description";
import { pictoChartSelectionRecipe } from "./pictoChart-selection/recipe";
import { PictoChartShaped } from "./pictoChart-shaped/pictoChart-shaped";
import { pictoChartShapedDescription } from "./pictoChart-shaped/description";
import { pictoChartShapedRecipe } from "./pictoChart-shaped/recipe";
import { PictoChartSingleton } from "./pictoChart-singleton/pictoChart-singleton";
import { pictoChartSingletonDescription } from "./pictoChart-singleton/description";
import { pictoChartSingletonRecipe } from "./pictoChart-singleton/recipe";
import { PictoChartTooltip } from "./pictoChart-tooltip/pictoChart-tooltip";
import { pictoChartTooltipDescription } from "./pictoChart-tooltip/description";
import { pictoChartTooltipRecipe } from "./pictoChart-tooltip/recipe";

const pictoChartLegacyItems: RecipePageItem[] = [
  {
    id: "default",
    name: "Basic",
    description: pictoChartDefaultDescription,
    recipe: pictoChartDefaultRecipe,
    Component: PictoChartDefault,
  },
  {
    id: "animation",
    name: "Animations",
    description: pictoChartAnimationDescription,
    recipe: pictoChartAnimationRecipe,
    Component: PictoChartAnimation,
  },
  {
    id: "fractions",
    name: "Fractions",
    description: pictoChartFractionsDescription,
    recipe: pictoChartFractionsRecipe,
    Component: PictoChartFractions,
  },
  {
    id: "layout",
    name: "Layout",
    description: pictoChartLayoutDescription,
    recipe: pictoChartLayoutRecipe,
    Component: PictoChartLayout,
  },
  {
    id: "custom-images",
    name: "Markers: Custom Images",
    description: pictoChartCustomImagesDescription,
    recipe: pictoChartCustomImagesRecipe,
    Component: PictoChartCustomImages,
  },
  {
    id: "custom-shapes",
    name: "Markers: Custom Shapes",
    description: pictoChartCustomShapesDescription,
    recipe: pictoChartCustomShapesRecipe,
    Component: PictoChartCustomShapes,
  },
   {
    id: "mixed-sizes",
    name: "Mixed Sizes",
    description: pictoChartMixedSizesDescription,
    recipe: pictoChartMixedSizesRecipe,
    Component: PictoChartMixedSizes,
  },
  {
    id: "performance",
    name: "Performance",
    description: pictoChartPerformanceDescription,
    recipe: pictoChartPerformanceRecipe,
    Component: PictoChartPerformance,
  },
  {
    id: "selection",
    name: "Selection & Drilling",
    description: pictoChartSelectionDescription,
    recipe: pictoChartSelectionRecipe,
    Component: PictoChartSelection,
  },
  {
    id: "tooltip",
    name: "Tooltip Customization",
    description: pictoChartTooltipDescription,
    recipe: pictoChartTooltipRecipe,
    Component: PictoChartTooltip,
  },
  {
    id: "dashboard",
    name: "Use Case: Dashboard",
    description: pictoChartDashboardDescription,
    recipe: pictoChartDashboardRecipe,
    Component: PictoChartDashboard,
  },
  
  
 
  {
    id: "shaped",
    name: "Shaped",
    description: pictoChartShapedDescription,
    recipe: pictoChartShapedRecipe,
    Component: PictoChartShaped,
  },
  {
    id: "singleton",
    name: "Singleton",
    description: pictoChartSingletonDescription,
    recipe: pictoChartSingletonRecipe,
    Component: PictoChartSingleton,
  },
  
];

export default function PictoChartLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Picto Chart examples"
      componentType="oj-picto-chart"
      layoutId="pictoChartLegacyNavigationLayout"
      items={pictoChartLegacyItems}
      initialItemId="default"
      navigationTitle="Picto Chart"
    />
  );
}

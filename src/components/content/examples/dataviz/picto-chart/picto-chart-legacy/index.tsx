import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { pictoChartAnimationDescription } from "./pictoChart-animation/description";
import { PictoChartAnimation } from "./pictoChart-animation/pictoChart-animation";
import { pictoChartAnimationRecipe } from "./pictoChart-animation/recipe";
import { pictoChartCustomImagesDescription } from "./pictoChart-customImages/description";
import { PictoChartCustomImages } from "./pictoChart-customImages/pictoChart-customImages";
import { pictoChartCustomImagesRecipe } from "./pictoChart-customImages/recipe";
import { pictoChartCustomShapesDescription } from "./pictoChart-customShapes/description";
import { PictoChartCustomShapes } from "./pictoChart-customShapes/pictoChart-customShapes";
import { pictoChartCustomShapesRecipe } from "./pictoChart-customShapes/recipe";
import { pictoChartDashboardDescription } from "./pictoChart-dashboard/description";
import { PictoChartDashboard } from "./pictoChart-dashboard/pictoChart-dashboard";
import { pictoChartDashboardRecipe } from "./pictoChart-dashboard/recipe";
import { pictoChartDefaultDescription } from "./pictoChart-default/description";
import { PictoChartDefault } from "./pictoChart-default/pictoChart-default";
import { pictoChartDefaultRecipe } from "./pictoChart-default/recipe";
import { pictoChartFractionsDescription } from "./pictoChart-fractions/description";
import { PictoChartFractions } from "./pictoChart-fractions/pictoChart-fractions";
import { pictoChartFractionsRecipe } from "./pictoChart-fractions/recipe";
import { pictoChartLayoutDescription } from "./pictoChart-layout/description";
import { PictoChartLayout } from "./pictoChart-layout/pictoChart-layout";
import { pictoChartLayoutRecipe } from "./pictoChart-layout/recipe";
import { pictoChartMixedSizesDescription } from "./pictoChart-mixedSizes/description";
import { PictoChartMixedSizes } from "./pictoChart-mixedSizes/pictoChart-mixedSizes";
import { pictoChartMixedSizesRecipe } from "./pictoChart-mixedSizes/recipe";
import { pictoChartPerformanceDescription } from "./pictoChart-performance/description";
import { PictoChartPerformance } from "./pictoChart-performance/pictoChart-performance";
import { pictoChartPerformanceRecipe } from "./pictoChart-performance/recipe";
import { pictoChartSelectionDescription } from "./pictoChart-selection/description";
import { PictoChartSelection } from "./pictoChart-selection/pictoChart-selection";
import { pictoChartSelectionRecipe } from "./pictoChart-selection/recipe";
import { pictoChartShapedDescription } from "./pictoChart-shaped/description";
import { PictoChartShaped } from "./pictoChart-shaped/pictoChart-shaped";
import { pictoChartShapedRecipe } from "./pictoChart-shaped/recipe";
import { pictoChartSingletonDescription } from "./pictoChart-singleton/description";
import { PictoChartSingleton } from "./pictoChart-singleton/pictoChart-singleton";
import { pictoChartSingletonRecipe } from "./pictoChart-singleton/recipe";
import { pictoChartTooltipDescription } from "./pictoChart-tooltip/description";
import { PictoChartTooltip } from "./pictoChart-tooltip/pictoChart-tooltip";
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

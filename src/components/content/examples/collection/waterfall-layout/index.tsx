import 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { waterfallLayoutBasicWaterfallLayoutDescription } from "./waterfallLayout-basicWaterfallLayout/description";
import { waterfallLayoutBasicWaterfallLayoutRecipe } from "./waterfallLayout-basicWaterfallLayout/recipe";
import { WaterfallLayoutBasicWaterfallLayout } from "./waterfallLayout-basicWaterfallLayout/waterfallLayout-basicWaterfallLayout";
import { waterfallLayoutFilteringWaterfallLayoutDescription } from "./waterfallLayout-filteringWaterfallLayout/description";
import { waterfallLayoutFilteringWaterfallLayoutRecipe } from "./waterfallLayout-filteringWaterfallLayout/recipe";
import { WaterfallLayoutFilteringWaterfallLayout } from "./waterfallLayout-filteringWaterfallLayout/waterfallLayout-filteringWaterfallLayout";
import { waterfallLayoutPerformanceWaterfallLayoutDescription } from "./waterfallLayout-performanceWaterfallLayout/description";
import { waterfallLayoutPerformanceWaterfallLayoutRecipe } from "./waterfallLayout-performanceWaterfallLayout/recipe";
import { WaterfallLayoutPerformanceWaterfallLayout } from "./waterfallLayout-performanceWaterfallLayout/waterfallLayout-performanceWaterfallLayout";
import { waterfallLayoutProgressiveLoadWaterfallLayoutDescription } from "./waterfallLayout-progressiveLoadWaterfallLayout/description";
import { waterfallLayoutProgressiveLoadWaterfallLayoutRecipe } from "./waterfallLayout-progressiveLoadWaterfallLayout/recipe";
import { WaterfallLayoutProgressiveLoadWaterfallLayout } from "./waterfallLayout-progressiveLoadWaterfallLayout/waterfallLayout-progressiveLoadWaterfallLayout";

const waterfallLayoutItems = [
  {
    id: "basic-waterfall-layout",
    name: "Overview",
    description: waterfallLayoutBasicWaterfallLayoutDescription,
    recipe: waterfallLayoutBasicWaterfallLayoutRecipe,
    Component: WaterfallLayoutBasicWaterfallLayout,
  },
  {
    id: "filtering",
    name: "Filtering",
    description: waterfallLayoutFilteringWaterfallLayoutDescription,
    recipe: waterfallLayoutFilteringWaterfallLayoutRecipe,
    Component: WaterfallLayoutFilteringWaterfallLayout,
  },
  {
    id: "progressive-load",
    name: "Progressive Loading",
    description: waterfallLayoutProgressiveLoadWaterfallLayoutDescription,
    recipe: waterfallLayoutProgressiveLoadWaterfallLayoutRecipe,
    Component: WaterfallLayoutProgressiveLoadWaterfallLayout,
  },
  {
    id: "performance",
    name: "Performance",
    description: waterfallLayoutPerformanceWaterfallLayoutDescription,
    recipe: waterfallLayoutPerformanceWaterfallLayoutRecipe,
    Component: WaterfallLayoutPerformanceWaterfallLayout,
  },
];

export default function WaterfallLayoutRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Waterfall Layout examples"
      componentType="oj-waterfall-layout"
      items={waterfallLayoutItems}
      initialItemId="basic-waterfall-layout"
      navigationTitle="Waterfall Layout"
    />
  );
}

import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { StreamListMutations } from "./streamList-mutations/streamList-mutations";
import { streamListMutationsDescription } from "./streamList-mutations/description";
import { streamListMutationsRecipe } from "./streamList-mutations/recipe";
import { StreamListPerformance } from "./streamList-performance/streamList-performance";
import { streamListPerformanceDescription } from "./streamList-performance/description";
import { streamListPerformanceRecipe } from "./streamList-performance/recipe";
import { StreamListProgressiveLoad } from "./streamList-progressiveLoad/streamList-progressiveLoad";
import { streamListProgressiveLoadDescription } from "./streamList-progressiveLoad/description";
import { streamListProgressiveLoadRecipe } from "./streamList-progressiveLoad/recipe";
import { StreamListScrollPosition } from "./streamList-scrollPosition/streamList-scrollPosition";
import { streamListScrollPositionDescription } from "./streamList-scrollPosition/description";
import { streamListScrollPositionRecipe } from "./streamList-scrollPosition/recipe";
import { StreamListStreamlist } from "./streamList-streamlist/streamList-streamlist";
import { streamListStreamlistDescription } from "./streamList-streamlist/description";
import { streamListStreamlistRecipe } from "./streamList-streamlist/recipe";

const streamListItems = [
  {
    id: "stream-list",
    name: "Overview",
    description: streamListStreamlistDescription,
    recipe: streamListStreamlistRecipe,
    Component: StreamListStreamlist,
  },
  {
    id: "mutations",
    name: "Mutations",
    description: streamListMutationsDescription,
    recipe: streamListMutationsRecipe,
    Component: StreamListMutations,
  },
  
  {
    id: "progressive-load",
    name: "Progressive Loading",
    description: streamListProgressiveLoadDescription,
    recipe: streamListProgressiveLoadRecipe,
    Component: StreamListProgressiveLoad,
  },
  {
    id: "scroll-position",
    name: "Scroll Position",
    description: streamListScrollPositionDescription,
    recipe: streamListScrollPositionRecipe,
    Component: StreamListScrollPosition,
  },
  {
    id: "performance",
    name: "Performance:DataSet Size",
    description: streamListPerformanceDescription,
    recipe: streamListPerformanceRecipe,
    Component: StreamListPerformance,
  },
  
];

export default function StreamListRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Stream List examples"
      componentType="oj-stream-list"
      items={streamListItems}
      initialItemId="stream-list"
      navigationTitle="Stream List"
    />
  );
}

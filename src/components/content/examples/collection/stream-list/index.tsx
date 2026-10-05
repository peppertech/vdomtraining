import 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { streamListPlaygrounds } from "./playgrounds";
import { streamListMutationsDescription } from "./streamList-mutations/description";
import { streamListMutationsRecipe } from "./streamList-mutations/recipe";
import { StreamListMutations } from "./streamList-mutations/streamList-mutations";
import { streamListPerformanceDescription } from "./streamList-performance/description";
import { streamListPerformanceRecipe } from "./streamList-performance/recipe";
import { StreamListPerformance } from "./streamList-performance/streamList-performance";
import { streamListProgressiveLoadDescription } from "./streamList-progressiveLoad/description";
import { streamListProgressiveLoadRecipe } from "./streamList-progressiveLoad/recipe";
import { StreamListProgressiveLoad } from "./streamList-progressiveLoad/streamList-progressiveLoad";
import { streamListScrollPositionDescription } from "./streamList-scrollPosition/description";
import { streamListScrollPositionRecipe } from "./streamList-scrollPosition/recipe";
import { StreamListScrollPosition } from "./streamList-scrollPosition/streamList-scrollPosition";
import { streamListStreamlistDescription } from "./streamList-streamlist/description";
import { streamListStreamlistRecipe } from "./streamList-streamlist/recipe";
import { StreamListStreamlist } from "./streamList-streamlist/streamList-streamlist";

const streamListItems = [
  {
    id: "stream-list",
    name: "Overview",
    description: streamListStreamlistDescription,
    recipe: streamListStreamlistRecipe,
    Component: StreamListStreamlist,
    playground: streamListPlaygrounds["streamList-streamlist"],
  },
  {
    id: "mutations",
    name: "Mutations",
    description: streamListMutationsDescription,
    recipe: streamListMutationsRecipe,
    Component: StreamListMutations,
    playground: streamListPlaygrounds["streamList-mutations"],
  },
  
  {
    id: "progressive-load",
    name: "Progressive Loading",
    description: streamListProgressiveLoadDescription,
    recipe: streamListProgressiveLoadRecipe,
    Component: StreamListProgressiveLoad,
    playground: streamListPlaygrounds["streamList-progressiveLoad"],
  },
  {
    id: "scroll-position",
    name: "Scroll Position",
    description: streamListScrollPositionDescription,
    recipe: streamListScrollPositionRecipe,
    Component: StreamListScrollPosition,
    playground: streamListPlaygrounds["streamList-scrollPosition"],
  },
  {
    id: "performance",
    name: "Performance:DataSet Size",
    description: streamListPerformanceDescription,
    recipe: streamListPerformanceRecipe,
    Component: StreamListPerformance,
    playground: streamListPlaygrounds["streamList-performance"],
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

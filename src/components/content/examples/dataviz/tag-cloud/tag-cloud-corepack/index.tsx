import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TagCloudBasiccorepack } from "./tagCloud-basiccorepack/tagCloud-basiccorepack";
import { tagCloudBasiccorepackDescription } from "./tagCloud-basiccorepack/description";
import { tagCloudBasiccorepackRecipe } from "./tagCloud-basiccorepack/recipe";
import { TagCloudShapedDatacorepack } from "./tagCloud-shapedDatacorepack/tagCloud-shapedDatacorepack";
import { tagCloudShapedDatacorepackDescription } from "./tagCloud-shapedDatacorepack/description";
import { tagCloudShapedDatacorepackRecipe } from "./tagCloud-shapedDatacorepack/recipe";
import { TagCloudSelectioncorepack } from "./tagCloud-selectioncorepack/tagCloud-selectioncorepack";
import { tagCloudSelectioncorepackDescription } from "./tagCloud-selectioncorepack/description";
import { tagCloudSelectioncorepackRecipe } from "./tagCloud-selectioncorepack/recipe";
import { TagCloudLegendcorepack } from "./tagCloud-legendcorepack/tagCloud-legendcorepack";
import { tagCloudLegendcorepackDescription } from "./tagCloud-legendcorepack/description";
import { tagCloudLegendcorepackRecipe } from "./tagCloud-legendcorepack/recipe";
import { TagCloudLinkscorepack } from "./tagCloud-linkscorepack/tagCloud-linkscorepack";
import { tagCloudLinkscorepackDescription } from "./tagCloud-linkscorepack/description";
import { tagCloudLinkscorepackRecipe } from "./tagCloud-linkscorepack/recipe";
import { TagCloudDatatipcorepack } from "./tagCloud-datatipcorepack/tagCloud-datatipcorepack";
import { tagCloudDatatipcorepackDescription } from "./tagCloud-datatipcorepack/description";
import { tagCloudDatatipcorepackRecipe } from "./tagCloud-datatipcorepack/recipe";
import { TagCloudContextMenucorepack } from "./tagCloud-contextMenucorepack/tagCloud-contextMenucorepack";
import { tagCloudContextMenucorepackDescription } from "./tagCloud-contextMenucorepack/description";
import { tagCloudContextMenucorepackRecipe } from "./tagCloud-contextMenucorepack/recipe";
import { TagCloudPerformancecorepack } from "./tagCloud-performancecorepack/tagCloud-performancecorepack";
import { tagCloudPerformancecorepackDescription } from "./tagCloud-performancecorepack/description";
import { tagCloudPerformancecorepackRecipe } from "./tagCloud-performancecorepack/recipe";

const tagCloudCorePackItems: RecipePageItem[] = [
  {
    id: "basic",
    name: "Basic",
    description: tagCloudBasiccorepackDescription,
    recipe: tagCloudBasiccorepackRecipe,
    Component: TagCloudBasiccorepack,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: tagCloudShapedDatacorepackDescription,
    recipe: tagCloudShapedDatacorepackRecipe,
    Component: TagCloudShapedDatacorepack,
  },
  {
    id: "selection",
    name: "Selection",
    description: tagCloudSelectioncorepackDescription,
    recipe: tagCloudSelectioncorepackRecipe,
    Component: TagCloudSelectioncorepack,
  },
  {
    id: "legend",
    name: "Legend",
    description: tagCloudLegendcorepackDescription,
    recipe: tagCloudLegendcorepackRecipe,
    Component: TagCloudLegendcorepack,
  },
  {
    id: "links",
    name: "Links",
    description: tagCloudLinkscorepackDescription,
    recipe: tagCloudLinkscorepackRecipe,
    Component: TagCloudLinkscorepack,
  },
  {
    id: "datatip",
    name: "Datatip",
    description: tagCloudDatatipcorepackDescription,
    recipe: tagCloudDatatipcorepackRecipe,
    Component: TagCloudDatatipcorepack,
  },
  {
    id: "context-menu",
    name: "Context Menu",
    description: tagCloudContextMenucorepackDescription,
    recipe: tagCloudContextMenucorepackRecipe,
    Component: TagCloudContextMenucorepack,
  },
  {
    id: "performance",
    name: "Performance",
    description: tagCloudPerformancecorepackDescription,
    recipe: tagCloudPerformancecorepackRecipe,
    Component: TagCloudPerformancecorepack,
  },
];

export default function TagCloudCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Tag Cloud Core Pack examples"
      componentType="oj-c-tag-cloud"
      packLabel="Core Pack"
      layoutId="tagCloudCorePackNavigationLayout"
      items={tagCloudCorePackItems}
      initialItemId="basic"
      navigationTitle="Tag Cloud"
    />
  );
}

import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { listItemLayoutActioncorepackDescription } from "./listItemLayout-actioncorepack/description";
import { ListItemLayoutActioncorepack } from "./listItemLayout-actioncorepack/listItemLayout-actioncorepack";
import { listItemLayoutActioncorepackRecipe } from "./listItemLayout-actioncorepack/recipe";
import { listItemLayoutLeadingSlotcorepackDescription } from "./listItemLayout-leadingSlotcorepack/description";
import { ListItemLayoutLeadingSlotcorepack } from "./listItemLayout-leadingSlotcorepack/listItemLayout-leadingSlotcorepack";
import { listItemLayoutLeadingSlotcorepackRecipe } from "./listItemLayout-leadingSlotcorepack/recipe";
import { listItemLayoutMultiColumncorepackDescription } from "./listItemLayout-multiColumncorepack/description";
import { ListItemLayoutMultiColumncorepack } from "./listItemLayout-multiColumncorepack/listItemLayout-multiColumncorepack";
import { listItemLayoutMultiColumncorepackRecipe } from "./listItemLayout-multiColumncorepack/recipe";
import { listItemLayoutOneLinecorepackDescription } from "./listItemLayout-oneLinecorepack/description";
import { ListItemLayoutOneLinecorepack } from "./listItemLayout-oneLinecorepack/listItemLayout-oneLinecorepack";
import { listItemLayoutOneLinecorepackRecipe } from "./listItemLayout-oneLinecorepack/recipe";
import { listItemLayoutOverlineSlotcorepackDescription } from "./listItemLayout-overlineSlotcorepack/description";
import { ListItemLayoutOverlineSlotcorepack } from "./listItemLayout-overlineSlotcorepack/listItemLayout-overlineSlotcorepack";
import { listItemLayoutOverlineSlotcorepackRecipe } from "./listItemLayout-overlineSlotcorepack/recipe";
import { listItemLayoutOverviewcorepackDescription } from "./listItemLayout-overviewcorepack/description";
import { ListItemLayoutOverviewcorepack } from "./listItemLayout-overviewcorepack/listItemLayout-overviewcorepack";
import { listItemLayoutOverviewcorepackRecipe } from "./listItemLayout-overviewcorepack/recipe";
import { listItemLayoutPaddingcorepackDescription } from "./listItemLayout-paddingcorepack/description";
import { ListItemLayoutPaddingcorepack } from "./listItemLayout-paddingcorepack/listItemLayout-paddingcorepack";
import { listItemLayoutPaddingcorepackRecipe } from "./listItemLayout-paddingcorepack/recipe";
import { listItemLayoutQuaternarySlotcorepackDescription } from "./listItemLayout-quaternarySlotcorepack/description";
import { ListItemLayoutQuaternarySlotcorepack } from "./listItemLayout-quaternarySlotcorepack/listItemLayout-quaternarySlotcorepack";
import { listItemLayoutQuaternarySlotcorepackRecipe } from "./listItemLayout-quaternarySlotcorepack/recipe";
import { listItemLayoutTablecorepackDescription } from "./listItemLayout-tablecorepack/description";
import { ListItemLayoutTablecorepack } from "./listItemLayout-tablecorepack/listItemLayout-tablecorepack";
import { listItemLayoutTablecorepackRecipe } from "./listItemLayout-tablecorepack/recipe";
import { listItemLayoutThreeLinecorepackDescription } from "./listItemLayout-threeLinecorepack/description";
import { ListItemLayoutThreeLinecorepack } from "./listItemLayout-threeLinecorepack/listItemLayout-threeLinecorepack";
import { listItemLayoutThreeLinecorepackRecipe } from "./listItemLayout-threeLinecorepack/recipe";
import { listItemLayoutTrailingSlotcorepackDescription } from "./listItemLayout-trailingSlotcorepack/description";
import { ListItemLayoutTrailingSlotcorepack } from "./listItemLayout-trailingSlotcorepack/listItemLayout-trailingSlotcorepack";
import { listItemLayoutTrailingSlotcorepackRecipe } from "./listItemLayout-trailingSlotcorepack/recipe";
import { listItemLayoutTwoLinecorepackDescription } from "./listItemLayout-twoLinecorepack/description";
import { ListItemLayoutTwoLinecorepack } from "./listItemLayout-twoLinecorepack/listItemLayout-twoLinecorepack";
import { listItemLayoutTwoLinecorepackRecipe } from "./listItemLayout-twoLinecorepack/recipe";
import { listItemLayoutVerticalAlignmentcorepackDescription } from "./listItemLayout-verticalAlignmentcorepack/description";
import { ListItemLayoutVerticalAlignmentcorepack } from "./listItemLayout-verticalAlignmentcorepack/listItemLayout-verticalAlignmentcorepack";
import { listItemLayoutVerticalAlignmentcorepackRecipe } from "./listItemLayout-verticalAlignmentcorepack/recipe";

const listItemLayoutCorePackItems = [
  {
    id: "overview",
    name: "Overview",
    description: listItemLayoutOverviewcorepackDescription,
    recipe: listItemLayoutOverviewcorepackRecipe,
    Component: ListItemLayoutOverviewcorepack,
  },
  {
    id: "three-line",
    name: "Three Line",
    description: listItemLayoutThreeLinecorepackDescription,
    recipe: listItemLayoutThreeLinecorepackRecipe,
    Component: ListItemLayoutThreeLinecorepack,
  },
  {
    id: "two-line",
    name: "Two Line",
    description: listItemLayoutTwoLinecorepackDescription,
    recipe: listItemLayoutTwoLinecorepackRecipe,
    Component: ListItemLayoutTwoLinecorepack,
  },
  {
    id: "one-line",
    name: "One Line",
    description: listItemLayoutOneLinecorepackDescription,
    recipe: listItemLayoutOneLinecorepackRecipe,
    Component: ListItemLayoutOneLinecorepack,
  },
  {
    id: "overline-slot",
    name: "Overline Slot",
    description: listItemLayoutOverlineSlotcorepackDescription,
    recipe: listItemLayoutOverlineSlotcorepackRecipe,
    Component: ListItemLayoutOverlineSlotcorepack,
  },
  {
    id: "quaternary-slot",
    name: "Quaternary and Navigation Slot",
    description: listItemLayoutQuaternarySlotcorepackDescription,
    recipe: listItemLayoutQuaternarySlotcorepackRecipe,
    Component: ListItemLayoutQuaternarySlotcorepack,
  },
  {
    id: "leading-slot",
    name: "Leading Slot",
    description: listItemLayoutLeadingSlotcorepackDescription,
    recipe: listItemLayoutLeadingSlotcorepackRecipe,
    Component: ListItemLayoutLeadingSlotcorepack,
  },
  {
    id: "trailing-slot",
    name: "Trailing Slot",
    description: listItemLayoutTrailingSlotcorepackDescription,
    recipe: listItemLayoutTrailingSlotcorepackRecipe,
    Component: ListItemLayoutTrailingSlotcorepack,
  },
  {
    id: "action-slot",
    name: "Action Slot",
    description: listItemLayoutActioncorepackDescription,
    recipe: listItemLayoutActioncorepackRecipe,
    Component: ListItemLayoutActioncorepack,
  },
  {
    id: "padding",
    name: "No Padding",
    description: listItemLayoutPaddingcorepackDescription,
    recipe: listItemLayoutPaddingcorepackRecipe,
    Component: ListItemLayoutPaddingcorepack,
  },
  {
    id: "multi-column",
    name: "MultiColumn Layout",
    description: listItemLayoutMultiColumncorepackDescription,
    recipe: listItemLayoutMultiColumncorepackRecipe,
    Component: ListItemLayoutMultiColumncorepack,
  },
  {
    id: "table",
    name: "Table",
    description: listItemLayoutTablecorepackDescription,
    recipe: listItemLayoutTablecorepackRecipe,
    Component: ListItemLayoutTablecorepack,
  },
  {
    id: "vertical-alignment",
    name: "Vertical Alignment",
    description: listItemLayoutVerticalAlignmentcorepackDescription,
    recipe: listItemLayoutVerticalAlignmentcorepackRecipe,
    Component: ListItemLayoutVerticalAlignmentcorepack,
  }
];

export default function ListItemLayoutCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="List Item Layout core pack examples"
      componentType="oj-c-list-item-layout"
      packLabel="Core Pack"
      items={listItemLayoutCorePackItems}
      initialItemId="overview"
      navigationTitle="List Item Layout"
    />
  );
}

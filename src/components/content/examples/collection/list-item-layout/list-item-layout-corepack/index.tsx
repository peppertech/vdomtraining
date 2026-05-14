import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ListItemLayoutActioncorepack } from "./listItemLayout-actioncorepack/listItemLayout-actioncorepack";
import { listItemLayoutActioncorepackDescription } from "./listItemLayout-actioncorepack/description";
import { listItemLayoutActioncorepackRecipe } from "./listItemLayout-actioncorepack/recipe";
import { ListItemLayoutLeadingSlotcorepack } from "./listItemLayout-leadingSlotcorepack/listItemLayout-leadingSlotcorepack";
import { listItemLayoutLeadingSlotcorepackDescription } from "./listItemLayout-leadingSlotcorepack/description";
import { listItemLayoutLeadingSlotcorepackRecipe } from "./listItemLayout-leadingSlotcorepack/recipe";
import { ListItemLayoutMultiColumncorepack } from "./listItemLayout-multiColumncorepack/listItemLayout-multiColumncorepack";
import { listItemLayoutMultiColumncorepackDescription } from "./listItemLayout-multiColumncorepack/description";
import { listItemLayoutMultiColumncorepackRecipe } from "./listItemLayout-multiColumncorepack/recipe";
import { ListItemLayoutOneLinecorepack } from "./listItemLayout-oneLinecorepack/listItemLayout-oneLinecorepack";
import { listItemLayoutOneLinecorepackDescription } from "./listItemLayout-oneLinecorepack/description";
import { listItemLayoutOneLinecorepackRecipe } from "./listItemLayout-oneLinecorepack/recipe";
import { ListItemLayoutOverlineSlotcorepack } from "./listItemLayout-overlineSlotcorepack/listItemLayout-overlineSlotcorepack";
import { listItemLayoutOverlineSlotcorepackDescription } from "./listItemLayout-overlineSlotcorepack/description";
import { listItemLayoutOverlineSlotcorepackRecipe } from "./listItemLayout-overlineSlotcorepack/recipe";
import { ListItemLayoutOverviewcorepack } from "./listItemLayout-overviewcorepack/listItemLayout-overviewcorepack";
import { listItemLayoutOverviewcorepackDescription } from "./listItemLayout-overviewcorepack/description";
import { listItemLayoutOverviewcorepackRecipe } from "./listItemLayout-overviewcorepack/recipe";
import { ListItemLayoutPaddingcorepack } from "./listItemLayout-paddingcorepack/listItemLayout-paddingcorepack";
import { listItemLayoutPaddingcorepackDescription } from "./listItemLayout-paddingcorepack/description";
import { listItemLayoutPaddingcorepackRecipe } from "./listItemLayout-paddingcorepack/recipe";
import { ListItemLayoutQuaternarySlotcorepack } from "./listItemLayout-quaternarySlotcorepack/listItemLayout-quaternarySlotcorepack";
import { listItemLayoutQuaternarySlotcorepackDescription } from "./listItemLayout-quaternarySlotcorepack/description";
import { listItemLayoutQuaternarySlotcorepackRecipe } from "./listItemLayout-quaternarySlotcorepack/recipe";
import { ListItemLayoutTablecorepack } from "./listItemLayout-tablecorepack/listItemLayout-tablecorepack";
import { listItemLayoutTablecorepackDescription } from "./listItemLayout-tablecorepack/description";
import { listItemLayoutTablecorepackRecipe } from "./listItemLayout-tablecorepack/recipe";
import { ListItemLayoutThreeLinecorepack } from "./listItemLayout-threeLinecorepack/listItemLayout-threeLinecorepack";
import { listItemLayoutThreeLinecorepackDescription } from "./listItemLayout-threeLinecorepack/description";
import { listItemLayoutThreeLinecorepackRecipe } from "./listItemLayout-threeLinecorepack/recipe";
import { ListItemLayoutTrailingSlotcorepack } from "./listItemLayout-trailingSlotcorepack/listItemLayout-trailingSlotcorepack";
import { listItemLayoutTrailingSlotcorepackDescription } from "./listItemLayout-trailingSlotcorepack/description";
import { listItemLayoutTrailingSlotcorepackRecipe } from "./listItemLayout-trailingSlotcorepack/recipe";
import { ListItemLayoutTwoLinecorepack } from "./listItemLayout-twoLinecorepack/listItemLayout-twoLinecorepack";
import { listItemLayoutTwoLinecorepackDescription } from "./listItemLayout-twoLinecorepack/description";
import { listItemLayoutTwoLinecorepackRecipe } from "./listItemLayout-twoLinecorepack/recipe";
import { ListItemLayoutVerticalAlignmentcorepack } from "./listItemLayout-verticalAlignmentcorepack/listItemLayout-verticalAlignmentcorepack";
import { listItemLayoutVerticalAlignmentcorepackDescription } from "./listItemLayout-verticalAlignmentcorepack/description";
import { listItemLayoutVerticalAlignmentcorepackRecipe } from "./listItemLayout-verticalAlignmentcorepack/recipe";
import { SelectSingleItemTemplatecorepack } from "./selectSingle-itemTemplatecorepack/selectSingle-itemTemplatecorepack";
import { selectSingleItemTemplatecorepackDescription } from "./selectSingle-itemTemplatecorepack/description";
import { selectSingleItemTemplatecorepackRecipe } from "./selectSingle-itemTemplatecorepack/recipe";
import { TimelineCustomRendererTimeline } from "./timeline-customRendererTimelinecorepack/timeline-customRendererTimeline";
import { timelineCustomRendererTimelineDescription } from "./timeline-customRendererTimelinecorepack/description";
import { timelineCustomRendererTimelineRecipe } from "./timeline-customRendererTimelinecorepack/recipe";

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
  },
  
];

export default function ListItemLayoutCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="List Item Layout core pack examples"
      componentType="oj-c-list-item-layout"
      items={listItemLayoutCorePackItems}
      initialItemId="overview"
      navigationTitle="List Item Layout"
    />
  );
}

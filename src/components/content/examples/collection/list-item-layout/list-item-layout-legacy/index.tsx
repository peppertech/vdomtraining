import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ListItemLayoutActionlegacy } from "./listItemLayout-actionlegacy/listItemLayout-actionlegacy";
import { listItemLayoutActionlegacyDescription } from "./listItemLayout-actionlegacy/description";
import { listItemLayoutActionlegacyRecipe } from "./listItemLayout-actionlegacy/recipe";
import { SelectSingleItemTemplate } from "./selectSingle-itemTemplate/selectSingle-itemTemplate";
import { selectSingleItemTemplateDescription } from "./selectSingle-itemTemplate/description";
import { selectSingleItemTemplateRecipe } from "./selectSingle-itemTemplate/recipe";
import { ListItemLayoutLeadingSlotlegacy } from "./listItemLayout-leadingSlotlegacy/listItemLayout-leadingSlotlegacy";
import { listItemLayoutLeadingSlotlegacyDescription } from "./listItemLayout-leadingSlotlegacy/description";
import { listItemLayoutLeadingSlotlegacyRecipe } from "./listItemLayout-leadingSlotlegacy/recipe";
import { ListItemLayoutMultiColumnlegacy } from "./listItemLayout-multiColumnlegacy/listItemLayout-multiColumnlegacy";
import { listItemLayoutMultiColumnlegacyDescription } from "./listItemLayout-multiColumnlegacy/description";
import { listItemLayoutMultiColumnlegacyRecipe } from "./listItemLayout-multiColumnlegacy/recipe";
import { ListItemLayoutOneLinelegacy } from "./listItemLayout-oneLinelegacy/listItemLayout-oneLinelegacy";
import { listItemLayoutOneLinelegacyDescription } from "./listItemLayout-oneLinelegacy/description";
import { listItemLayoutOneLinelegacyRecipe } from "./listItemLayout-oneLinelegacy/recipe";
import { ListItemLayoutOverlineSlotlegacy } from "./listItemLayout-overlineSlotlegacy/listItemLayout-overlineSlotlegacy";
import { listItemLayoutOverlineSlotlegacyDescription } from "./listItemLayout-overlineSlotlegacy/description";
import { listItemLayoutOverlineSlotlegacyRecipe } from "./listItemLayout-overlineSlotlegacy/recipe";
import { ListItemLayoutOverviewlegacy } from "./listItemLayout-overviewlegacy/listItemLayout-overviewlegacy";
import { listItemLayoutOverviewlegacyDescription } from "./listItemLayout-overviewlegacy/description";
import { listItemLayoutOverviewlegacyRecipe } from "./listItemLayout-overviewlegacy/recipe";
import { ListItemLayoutQuaternarySlotlegacy } from "./listItemLayout-quaternarySlotlegacy/listItemLayout-quaternarySlotlegacy";
import { listItemLayoutQuaternarySlotlegacyDescription } from "./listItemLayout-quaternarySlotlegacy/description";
import { listItemLayoutQuaternarySlotlegacyRecipe } from "./listItemLayout-quaternarySlotlegacy/recipe";
import { ListItemLayoutTablelegacy } from "./listItemLayout-tablelegacy/listItemLayout-tablelegacy";
import { listItemLayoutTablelegacyDescription } from "./listItemLayout-tablelegacy/description";
import { listItemLayoutTablelegacyRecipe } from "./listItemLayout-tablelegacy/recipe";
import { TimelineCustomRendererTimeline } from "./timeline-customRendererTimeline/timeline-customRendererTimeline";
import { timelineCustomRendererTimelineDescription } from "./timeline-customRendererTimeline/description";
import { timelineCustomRendererTimelineRecipe } from "./timeline-customRendererTimeline/recipe";
import { ListItemLayoutThreeLinelegacy } from "./listItemLayout-threeLinelegacy/listItemLayout-threeLinelegacy";
import { listItemLayoutThreeLinelegacyDescription } from "./listItemLayout-threeLinelegacy/description";
import { listItemLayoutThreeLinelegacyRecipe } from "./listItemLayout-threeLinelegacy/recipe";
import { ListItemLayoutTrailingSlotlegacy } from "./listItemLayout-trailingSlotlegacy/listItemLayout-trailingSlotlegacy";
import { listItemLayoutTrailingSlotlegacyDescription } from "./listItemLayout-trailingSlotlegacy/description";
import { listItemLayoutTrailingSlotlegacyRecipe } from "./listItemLayout-trailingSlotlegacy/recipe";
import { ListItemLayoutTwoLinelegacy } from "./listItemLayout-twoLinelegacy/listItemLayout-twoLinelegacy";
import { listItemLayoutTwoLinelegacyDescription } from "./listItemLayout-twoLinelegacy/description";
import { listItemLayoutTwoLinelegacyRecipe } from "./listItemLayout-twoLinelegacy/recipe";

const listItemLayoutItems = [
  {
    id: "overview",
    name: "Overview",
    description: listItemLayoutOverviewlegacyDescription,
    recipe: listItemLayoutOverviewlegacyRecipe,
    Component: ListItemLayoutOverviewlegacy,
  },
  {
    id: "three-line",
    name: "Three Line",
    description: listItemLayoutThreeLinelegacyDescription,
    recipe: listItemLayoutThreeLinelegacyRecipe,
    Component: ListItemLayoutThreeLinelegacy,
  },
  {
    id: "two-line",
    name: "Two Line",
    description: listItemLayoutTwoLinelegacyDescription,
    recipe: listItemLayoutTwoLinelegacyRecipe,
    Component: ListItemLayoutTwoLinelegacy,
  },
  {
    id: "one-line",
    name: "One Line",
    description: listItemLayoutOneLinelegacyDescription,
    recipe: listItemLayoutOneLinelegacyRecipe,
    Component: ListItemLayoutOneLinelegacy,
  },
  {
    id: "overline-slot",
    name: "Overline Slot",
    description: listItemLayoutOverlineSlotlegacyDescription,
    recipe: listItemLayoutOverlineSlotlegacyRecipe,
    Component: ListItemLayoutOverlineSlotlegacy,
  },
  {
    id: "quaternary-slot",
    name: "Quaternary and Navigation Slot",
    description: listItemLayoutQuaternarySlotlegacyDescription,
    recipe: listItemLayoutQuaternarySlotlegacyRecipe,
    Component: ListItemLayoutQuaternarySlotlegacy,
  },
  {
    id: "leading-slot",
    name: "Leading Slot",
    description: listItemLayoutLeadingSlotlegacyDescription,
    recipe: listItemLayoutLeadingSlotlegacyRecipe,
    Component: ListItemLayoutLeadingSlotlegacy,
  },
  {
    id: "trailing-slot",
    name: "Trailing Slot",
    description: listItemLayoutTrailingSlotlegacyDescription,
    recipe: listItemLayoutTrailingSlotlegacyRecipe,
    Component: ListItemLayoutTrailingSlotlegacy,
  },
  {
    id: "action-slot",
    name: "Action Slot",
    description: listItemLayoutActionlegacyDescription,
    recipe: listItemLayoutActionlegacyRecipe,
    Component: ListItemLayoutActionlegacy,
  },
  {
    id: "multi-column",
    name: "MultiColumn Layout",
    description: listItemLayoutMultiColumnlegacyDescription,
    recipe: listItemLayoutMultiColumnlegacyRecipe,
    Component: ListItemLayoutMultiColumnlegacy,
  },
  {
    id: "select-single",
    name: "Select Single",
    description: selectSingleItemTemplateDescription,
    recipe: selectSingleItemTemplateRecipe,
    Component: SelectSingleItemTemplate,
  },
  {
    id: "table",
    name: "Table",
    description: listItemLayoutTablelegacyDescription,
    recipe: listItemLayoutTablelegacyRecipe,
    Component: ListItemLayoutTablelegacy,
  },
  {
    id: "timeline",
    name: "Timeline",
    description: timelineCustomRendererTimelineDescription,
    recipe: timelineCustomRendererTimelineRecipe,
    Component: TimelineCustomRendererTimeline,
  }
];

export default function ListItemLayoutLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="List Item Layout examples"
      componentType="oj-list-item-layout"
      items={listItemLayoutItems}
      initialItemId="overview"
      navigationTitle="List Item Layout"
    />
  );
}

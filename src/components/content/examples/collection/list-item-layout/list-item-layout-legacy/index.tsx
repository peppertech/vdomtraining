import 'preact';
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { IntlNumberConverter } from "ojs/ojconverter-number";
import { KeySetImpl } from "ojs/ojkeyset";
import { RecipePageTemplate, type RecipePageItem } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { listItemLayoutActionlegacyDescription } from "./listItemLayout-actionlegacy/description";
import ListItemLayoutActionlegacy from "./listItemLayout-actionlegacy/listItemLayout-actionlegacy";
import listItemLayoutActionlegacySource from "./listItemLayout-actionlegacy/listItemLayout-actionlegacy-source";
import listItemLayoutActionlegacyDemoSource from "./listItemLayout-actionlegacy/demo-source";
import { listItemLayoutActionlegacyRecipe } from "./listItemLayout-actionlegacy/recipe";
import { listItemLayoutLeadingSlotlegacyDescription } from "./listItemLayout-leadingSlotlegacy/description";
import ListItemLayoutLeadingSlotlegacy from "./listItemLayout-leadingSlotlegacy/listItemLayout-leadingSlotlegacy";
import listItemLayoutLeadingSlotlegacySource from "./listItemLayout-leadingSlotlegacy/listItemLayout-leadingSlotlegacy-source";
import listItemLayoutLeadingSlotlegacyDemoSource from "./listItemLayout-leadingSlotlegacy/demo-source";
import { listItemLayoutLeadingSlotlegacyRecipe } from "./listItemLayout-leadingSlotlegacy/recipe";
import { listItemLayoutMultiColumnlegacyDescription } from "./listItemLayout-multiColumnlegacy/description";
import ListItemLayoutMultiColumnlegacy from "./listItemLayout-multiColumnlegacy/listItemLayout-multiColumnlegacy";
import listItemLayoutMultiColumnlegacySource from "./listItemLayout-multiColumnlegacy/listItemLayout-multiColumnlegacy-source";
import listItemLayoutMultiColumnlegacyDemoSource from "./listItemLayout-multiColumnlegacy/demo-source";
import { listItemLayoutMultiColumnlegacyRecipe } from "./listItemLayout-multiColumnlegacy/recipe";
import { listItemLayoutOneLinelegacyDescription } from "./listItemLayout-oneLinelegacy/description";
import ListItemLayoutOneLinelegacy from "./listItemLayout-oneLinelegacy/listItemLayout-oneLinelegacy";
import listItemLayoutOneLinelegacySource from "./listItemLayout-oneLinelegacy/listItemLayout-oneLinelegacy-source";
import listItemLayoutOneLinelegacyDemoSource from "./listItemLayout-oneLinelegacy/demo-source";
import { listItemLayoutOneLinelegacyRecipe } from "./listItemLayout-oneLinelegacy/recipe";
import { listItemLayoutOverlineSlotlegacyDescription } from "./listItemLayout-overlineSlotlegacy/description";
import ListItemLayoutOverlineSlotlegacy from "./listItemLayout-overlineSlotlegacy/listItemLayout-overlineSlotlegacy";
import listItemLayoutOverlineSlotlegacySource from "./listItemLayout-overlineSlotlegacy/listItemLayout-overlineSlotlegacy-source";
import listItemLayoutOverlineSlotlegacyDemoSource from "./listItemLayout-overlineSlotlegacy/demo-source";
import { listItemLayoutOverlineSlotlegacyRecipe } from "./listItemLayout-overlineSlotlegacy/recipe";
import { listItemLayoutOverviewlegacyDescription } from "./listItemLayout-overviewlegacy/description";
import ListItemLayoutOverviewlegacy from "./listItemLayout-overviewlegacy/listItemLayout-overviewlegacy";
import listItemLayoutOverviewlegacySource from "./listItemLayout-overviewlegacy/listItemLayout-overviewlegacy-source";
import listItemLayoutOverviewlegacyDemoSource from "./listItemLayout-overviewlegacy/demo-source";
import { listItemLayoutOverviewlegacyRecipe } from "./listItemLayout-overviewlegacy/recipe";
import { listItemLayoutQuaternarySlotlegacyDescription } from "./listItemLayout-quaternarySlotlegacy/description";
import ListItemLayoutQuaternarySlotlegacy from "./listItemLayout-quaternarySlotlegacy/listItemLayout-quaternarySlotlegacy";
import listItemLayoutQuaternarySlotlegacySource from "./listItemLayout-quaternarySlotlegacy/listItemLayout-quaternarySlotlegacy-source";
import listItemLayoutQuaternarySlotlegacyDemoSource from "./listItemLayout-quaternarySlotlegacy/demo-source";
import { listItemLayoutQuaternarySlotlegacyRecipe } from "./listItemLayout-quaternarySlotlegacy/recipe";
import { listItemLayoutTablelegacyDescription } from "./listItemLayout-tablelegacy/description";
import ListItemLayoutTablelegacy from "./listItemLayout-tablelegacy/listItemLayout-tablelegacy";
import listItemLayoutTablelegacySource from "./listItemLayout-tablelegacy/listItemLayout-tablelegacy-source";
import { listItemLayoutTablelegacyRecipe } from "./listItemLayout-tablelegacy/recipe";
import { listItemLayoutThreeLinelegacyDescription } from "./listItemLayout-threeLinelegacy/description";
import ListItemLayoutThreeLinelegacy from "./listItemLayout-threeLinelegacy/listItemLayout-threeLinelegacy";
import listItemLayoutThreeLinelegacySource from "./listItemLayout-threeLinelegacy/listItemLayout-threeLinelegacy-source";
import listItemLayoutThreeLinelegacyDemoSource from "./listItemLayout-threeLinelegacy/demo-source";
import { listItemLayoutThreeLinelegacyRecipe } from "./listItemLayout-threeLinelegacy/recipe";
import { listItemLayoutTrailingSlotlegacyDescription } from "./listItemLayout-trailingSlotlegacy/description";
import ListItemLayoutTrailingSlotlegacy from "./listItemLayout-trailingSlotlegacy/listItemLayout-trailingSlotlegacy";
import listItemLayoutTrailingSlotlegacySource from "./listItemLayout-trailingSlotlegacy/listItemLayout-trailingSlotlegacy-source";
import listItemLayoutTrailingSlotlegacyDemoSource from "./listItemLayout-trailingSlotlegacy/demo-source";
import { listItemLayoutTrailingSlotlegacyRecipe } from "./listItemLayout-trailingSlotlegacy/recipe";
import { listItemLayoutTwoLinelegacyDescription } from "./listItemLayout-twoLinelegacy/description";
import ListItemLayoutTwoLinelegacy from "./listItemLayout-twoLinelegacy/listItemLayout-twoLinelegacy";
import listItemLayoutTwoLinelegacySource from "./listItemLayout-twoLinelegacy/listItemLayout-twoLinelegacy-source";
import listItemLayoutTwoLinelegacyDemoSource from "./listItemLayout-twoLinelegacy/demo-source";
import { listItemLayoutTwoLinelegacyRecipe } from "./listItemLayout-twoLinelegacy/recipe";
import { selectSingleItemTemplateDescription } from "./selectSingle-itemTemplate/description";
import selectSingleItemTemplateDemoSource from "./selectSingle-itemTemplate/demo-source";
import selectSingleItemTemplateEmployeeDataSource from "./selectSingle-itemTemplate/employeeData-source";
import { selectSingleItemTemplateRecipe } from "./selectSingle-itemTemplate/recipe";
import SelectSingleItemTemplate from "./selectSingle-itemTemplate/selectSingle-itemTemplate";
import selectSingleItemTemplateSource from "./selectSingle-itemTemplate/selectSingle-itemTemplate-source";
import { timelineCustomRendererTimelineDescription } from "./timeline-customRendererTimeline/description";
import timelineCustomRendererTimelineDemoSource from "./timeline-customRendererTimeline/demo-source";
import timelineCustomRendererTimelineEmployeeStartDataSource from "./timeline-customRendererTimeline/employeeStartData-source";
import { timelineCustomRendererTimelineRecipe } from "./timeline-customRendererTimeline/recipe";
import TimelineCustomRendererTimeline from "./timeline-customRendererTimeline/timeline-customRendererTimeline";
import timelineCustomRendererTimelineSource from "./timeline-customRendererTimeline/timeline-customRendererTimeline-source";

const listItemLayoutItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: listItemLayoutOverviewlegacyDescription,
    recipe: listItemLayoutOverviewlegacyRecipe,
    Component: ListItemLayoutOverviewlegacy,
    playground: {
      initialSource: listItemLayoutOverviewlegacySource,
      fileName: "listItemLayout-overviewlegacy.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutOverviewlegacyDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "three-line",
    name: "Three Line",
    description: listItemLayoutThreeLinelegacyDescription,
    recipe: listItemLayoutThreeLinelegacyRecipe,
    Component: ListItemLayoutThreeLinelegacy,
    playground: {
      initialSource: listItemLayoutThreeLinelegacySource,
      fileName: "listItemLayout-threeLinelegacy.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutThreeLinelegacyDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "two-line",
    name: "Two Line",
    description: listItemLayoutTwoLinelegacyDescription,
    recipe: listItemLayoutTwoLinelegacyRecipe,
    Component: ListItemLayoutTwoLinelegacy,
    playground: {
      initialSource: listItemLayoutTwoLinelegacySource,
      fileName: "listItemLayout-twoLinelegacy.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutTwoLinelegacyDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "one-line",
    name: "One Line",
    description: listItemLayoutOneLinelegacyDescription,
    recipe: listItemLayoutOneLinelegacyRecipe,
    Component: ListItemLayoutOneLinelegacy,
    playground: {
      initialSource: listItemLayoutOneLinelegacySource,
      fileName: "listItemLayout-oneLinelegacy.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutOneLinelegacyDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "overline-slot",
    name: "Overline Slot",
    description: listItemLayoutOverlineSlotlegacyDescription,
    recipe: listItemLayoutOverlineSlotlegacyRecipe,
    Component: ListItemLayoutOverlineSlotlegacy,
    playground: {
      initialSource: listItemLayoutOverlineSlotlegacySource,
      fileName: "listItemLayout-overlineSlotlegacy.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutOverlineSlotlegacyDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "quaternary-slot",
    name: "Quaternary and Navigation Slot",
    description: listItemLayoutQuaternarySlotlegacyDescription,
    recipe: listItemLayoutQuaternarySlotlegacyRecipe,
    Component: ListItemLayoutQuaternarySlotlegacy,
    playground: {
      initialSource: listItemLayoutQuaternarySlotlegacySource,
      fileName: "listItemLayout-quaternarySlotlegacy.tsx",
      runtimeBindings: { ArrayDataProvider },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutQuaternarySlotlegacyDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "leading-slot",
    name: "Leading Slot",
    description: listItemLayoutLeadingSlotlegacyDescription,
    recipe: listItemLayoutLeadingSlotlegacyRecipe,
    Component: ListItemLayoutLeadingSlotlegacy,
    playground: {
      initialSource: listItemLayoutLeadingSlotlegacySource,
      fileName: "listItemLayout-leadingSlotlegacy.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutLeadingSlotlegacyDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "trailing-slot",
    name: "Trailing Slot",
    description: listItemLayoutTrailingSlotlegacyDescription,
    recipe: listItemLayoutTrailingSlotlegacyRecipe,
    Component: ListItemLayoutTrailingSlotlegacy,
    playground: {
      initialSource: listItemLayoutTrailingSlotlegacySource,
      fileName: "listItemLayout-trailingSlotlegacy.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutTrailingSlotlegacyDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "action-slot",
    name: "Action Slot",
    description: listItemLayoutActionlegacyDescription,
    recipe: listItemLayoutActionlegacyRecipe,
    Component: ListItemLayoutActionlegacy,
    playground: {
      initialSource: listItemLayoutActionlegacySource,
      fileName: "listItemLayout-actionlegacy.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutActionlegacyDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "multi-column",
    name: "MultiColumn Layout",
    description: listItemLayoutMultiColumnlegacyDescription,
    recipe: listItemLayoutMultiColumnlegacyRecipe,
    Component: ListItemLayoutMultiColumnlegacy,
    playground: {
      initialSource: listItemLayoutMultiColumnlegacySource,
      fileName: "listItemLayout-multiColumnlegacy.tsx",
      runtimeBindings: { ArrayDataProvider },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutMultiColumnlegacyDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "select-single",
    name: "Select Single",
    description: selectSingleItemTemplateDescription,
    recipe: selectSingleItemTemplateRecipe,
    Component: SelectSingleItemTemplate,
    playground: {
      initialSource: selectSingleItemTemplateSource,
      fileName: "selectSingle-itemTemplate.tsx",
      runtimeBindings: { ArrayDataProvider },
      supportingFiles: [
        {
          fileName: "employeeData.json",
          initialSource: selectSingleItemTemplateEmployeeDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/formControls/selectSingle/itemTemplate/employeeData.json",
          bindingName: "employeeDataText",
        },
        {
          fileName: "demo.css",
          initialSource: selectSingleItemTemplateDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "table",
    name: "Table",
    description: listItemLayoutTablelegacyDescription,
    recipe: listItemLayoutTablelegacyRecipe,
    Component: ListItemLayoutTablelegacy,
    playground: {
      initialSource: listItemLayoutTablelegacySource,
      fileName: "listItemLayout-tablelegacy.tsx",
      runtimeBindings: { ArrayDataProvider, IntlNumberConverter },
    },
  },
  {
    id: "timeline",
    name: "Timeline",
    description: timelineCustomRendererTimelineDescription,
    recipe: timelineCustomRendererTimelineRecipe,
    Component: TimelineCustomRendererTimeline,
    playground: {
      initialSource: timelineCustomRendererTimelineSource,
      fileName: "timeline-customRendererTimeline.tsx",
      runtimeBindings: { ArrayDataProvider },
      supportingFiles: [
        {
          fileName: "employeeStartData.json",
          initialSource: timelineCustomRendererTimelineEmployeeStartDataSource,
          language: "json",
          importSpecifier: "text!../../../data/cookbook/dataVisualizations/timeline/customRendererTimeline/employeeStartData.json",
          bindingName: "employeeStartDataText",
        },
        {
          fileName: "demo.css",
          initialSource: timelineCustomRendererTimelineDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
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

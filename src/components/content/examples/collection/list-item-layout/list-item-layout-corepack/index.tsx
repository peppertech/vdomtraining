import 'preact';
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import { IntlNumberConverter } from "ojs/ojconverter-number";
import { KeySetImpl } from "ojs/ojkeyset";
import { RecipePageTemplate, type RecipePageItem } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { listItemLayoutActioncorepackDescription } from "./listItemLayout-actioncorepack/description";
import listItemLayoutActioncorepackDemoSource from "./listItemLayout-actioncorepack/demo-source";
import ListItemLayoutActioncorepack from "./listItemLayout-actioncorepack/listItemLayout-actioncorepack";
import listItemLayoutActioncorepackSource from "./listItemLayout-actioncorepack/listItemLayout-actioncorepack-source";
import { listItemLayoutActioncorepackRecipe } from "./listItemLayout-actioncorepack/recipe";
import { listItemLayoutLeadingSlotcorepackDescription } from "./listItemLayout-leadingSlotcorepack/description";
import listItemLayoutLeadingSlotcorepackDemoSource from "./listItemLayout-leadingSlotcorepack/demo-source";
import ListItemLayoutLeadingSlotcorepack from "./listItemLayout-leadingSlotcorepack/listItemLayout-leadingSlotcorepack";
import listItemLayoutLeadingSlotcorepackSource from "./listItemLayout-leadingSlotcorepack/listItemLayout-leadingSlotcorepack-source";
import { listItemLayoutLeadingSlotcorepackRecipe } from "./listItemLayout-leadingSlotcorepack/recipe";
import { listItemLayoutMultiColumncorepackDescription } from "./listItemLayout-multiColumncorepack/description";
import listItemLayoutMultiColumncorepackDemoSource from "./listItemLayout-multiColumncorepack/demo-source";
import ListItemLayoutMultiColumncorepack from "./listItemLayout-multiColumncorepack/listItemLayout-multiColumncorepack";
import listItemLayoutMultiColumncorepackSource from "./listItemLayout-multiColumncorepack/listItemLayout-multiColumncorepack-source";
import { listItemLayoutMultiColumncorepackRecipe } from "./listItemLayout-multiColumncorepack/recipe";
import { listItemLayoutOneLinecorepackDescription } from "./listItemLayout-oneLinecorepack/description";
import listItemLayoutOneLinecorepackDemoSource from "./listItemLayout-oneLinecorepack/demo-source";
import ListItemLayoutOneLinecorepack from "./listItemLayout-oneLinecorepack/listItemLayout-oneLinecorepack";
import listItemLayoutOneLinecorepackSource from "./listItemLayout-oneLinecorepack/listItemLayout-oneLinecorepack-source";
import { listItemLayoutOneLinecorepackRecipe } from "./listItemLayout-oneLinecorepack/recipe";
import { listItemLayoutOverlineSlotcorepackDescription } from "./listItemLayout-overlineSlotcorepack/description";
import listItemLayoutOverlineSlotcorepackDemoSource from "./listItemLayout-overlineSlotcorepack/demo-source";
import ListItemLayoutOverlineSlotcorepack from "./listItemLayout-overlineSlotcorepack/listItemLayout-overlineSlotcorepack";
import listItemLayoutOverlineSlotcorepackSource from "./listItemLayout-overlineSlotcorepack/listItemLayout-overlineSlotcorepack-source";
import { listItemLayoutOverlineSlotcorepackRecipe } from "./listItemLayout-overlineSlotcorepack/recipe";
import { listItemLayoutOverviewcorepackDescription } from "./listItemLayout-overviewcorepack/description";
import listItemLayoutOverviewcorepackDemoSource from "./listItemLayout-overviewcorepack/demo-source";
import ListItemLayoutOverviewcorepack from "./listItemLayout-overviewcorepack/listItemLayout-overviewcorepack";
import listItemLayoutOverviewcorepackSource from "./listItemLayout-overviewcorepack/listItemLayout-overviewcorepack-source";
import { listItemLayoutOverviewcorepackRecipe } from "./listItemLayout-overviewcorepack/recipe";
import { listItemLayoutPaddingcorepackDescription } from "./listItemLayout-paddingcorepack/description";
import listItemLayoutPaddingcorepackDemoSource from "./listItemLayout-paddingcorepack/demo-source";
import ListItemLayoutPaddingcorepack from "./listItemLayout-paddingcorepack/listItemLayout-paddingcorepack";
import listItemLayoutPaddingcorepackSource from "./listItemLayout-paddingcorepack/listItemLayout-paddingcorepack-source";
import { listItemLayoutPaddingcorepackRecipe } from "./listItemLayout-paddingcorepack/recipe";
import { listItemLayoutQuaternarySlotcorepackDescription } from "./listItemLayout-quaternarySlotcorepack/description";
import listItemLayoutQuaternarySlotcorepackDemoSource from "./listItemLayout-quaternarySlotcorepack/demo-source";
import ListItemLayoutQuaternarySlotcorepack from "./listItemLayout-quaternarySlotcorepack/listItemLayout-quaternarySlotcorepack";
import listItemLayoutQuaternarySlotcorepackSource from "./listItemLayout-quaternarySlotcorepack/listItemLayout-quaternarySlotcorepack-source";
import { listItemLayoutQuaternarySlotcorepackRecipe } from "./listItemLayout-quaternarySlotcorepack/recipe";
import { listItemLayoutTablecorepackDescription } from "./listItemLayout-tablecorepack/description";
import ListItemLayoutTablecorepack from "./listItemLayout-tablecorepack/listItemLayout-tablecorepack";
import listItemLayoutTablecorepackSource from "./listItemLayout-tablecorepack/listItemLayout-tablecorepack-source";
import { listItemLayoutTablecorepackRecipe } from "./listItemLayout-tablecorepack/recipe";
import { listItemLayoutThreeLinecorepackDescription } from "./listItemLayout-threeLinecorepack/description";
import listItemLayoutThreeLinecorepackDemoSource from "./listItemLayout-threeLinecorepack/demo-source";
import ListItemLayoutThreeLinecorepack from "./listItemLayout-threeLinecorepack/listItemLayout-threeLinecorepack";
import listItemLayoutThreeLinecorepackSource from "./listItemLayout-threeLinecorepack/listItemLayout-threeLinecorepack-source";
import { listItemLayoutThreeLinecorepackRecipe } from "./listItemLayout-threeLinecorepack/recipe";
import { listItemLayoutTrailingSlotcorepackDescription } from "./listItemLayout-trailingSlotcorepack/description";
import listItemLayoutTrailingSlotcorepackDemoSource from "./listItemLayout-trailingSlotcorepack/demo-source";
import ListItemLayoutTrailingSlotcorepack from "./listItemLayout-trailingSlotcorepack/listItemLayout-trailingSlotcorepack";
import listItemLayoutTrailingSlotcorepackSource from "./listItemLayout-trailingSlotcorepack/listItemLayout-trailingSlotcorepack-source";
import { listItemLayoutTrailingSlotcorepackRecipe } from "./listItemLayout-trailingSlotcorepack/recipe";
import { listItemLayoutTwoLinecorepackDescription } from "./listItemLayout-twoLinecorepack/description";
import listItemLayoutTwoLinecorepackDemoSource from "./listItemLayout-twoLinecorepack/demo-source";
import ListItemLayoutTwoLinecorepack from "./listItemLayout-twoLinecorepack/listItemLayout-twoLinecorepack";
import listItemLayoutTwoLinecorepackSource from "./listItemLayout-twoLinecorepack/listItemLayout-twoLinecorepack-source";
import { listItemLayoutTwoLinecorepackRecipe } from "./listItemLayout-twoLinecorepack/recipe";
import { listItemLayoutVerticalAlignmentcorepackDescription } from "./listItemLayout-verticalAlignmentcorepack/description";
import listItemLayoutVerticalAlignmentcorepackDemoSource from "./listItemLayout-verticalAlignmentcorepack/demo-source";
import ListItemLayoutVerticalAlignmentcorepack from "./listItemLayout-verticalAlignmentcorepack/listItemLayout-verticalAlignmentcorepack";
import listItemLayoutVerticalAlignmentcorepackSource from "./listItemLayout-verticalAlignmentcorepack/listItemLayout-verticalAlignmentcorepack-source";
import { listItemLayoutVerticalAlignmentcorepackRecipe } from "./listItemLayout-verticalAlignmentcorepack/recipe";

const listItemLayoutCorePackItems: RecipePageItem[] = [
  {
    id: "overview",
    name: "Overview",
    description: listItemLayoutOverviewcorepackDescription,
    recipe: listItemLayoutOverviewcorepackRecipe,
    Component: ListItemLayoutOverviewcorepack,
    playground: {
      initialSource: listItemLayoutOverviewcorepackSource,
      fileName: "listItemLayout-overviewcorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutOverviewcorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "three-line",
    name: "Three Line",
    description: listItemLayoutThreeLinecorepackDescription,
    recipe: listItemLayoutThreeLinecorepackRecipe,
    Component: ListItemLayoutThreeLinecorepack,
    playground: {
      initialSource: listItemLayoutThreeLinecorepackSource,
      fileName: "listItemLayout-threeLinecorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutThreeLinecorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "two-line",
    name: "Two Line",
    description: listItemLayoutTwoLinecorepackDescription,
    recipe: listItemLayoutTwoLinecorepackRecipe,
    Component: ListItemLayoutTwoLinecorepack,
    playground: {
      initialSource: listItemLayoutTwoLinecorepackSource,
      fileName: "listItemLayout-twoLinecorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutTwoLinecorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "one-line",
    name: "One Line",
    description: listItemLayoutOneLinecorepackDescription,
    recipe: listItemLayoutOneLinecorepackRecipe,
    Component: ListItemLayoutOneLinecorepack,
    playground: {
      initialSource: listItemLayoutOneLinecorepackSource,
      fileName: "listItemLayout-oneLinecorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutOneLinecorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "overline-slot",
    name: "Overline Slot",
    description: listItemLayoutOverlineSlotcorepackDescription,
    recipe: listItemLayoutOverlineSlotcorepackRecipe,
    Component: ListItemLayoutOverlineSlotcorepack,
    playground: {
      initialSource: listItemLayoutOverlineSlotcorepackSource,
      fileName: "listItemLayout-overlineSlotcorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutOverlineSlotcorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "quaternary-slot",
    name: "Quaternary and Navigation Slot",
    description: listItemLayoutQuaternarySlotcorepackDescription,
    recipe: listItemLayoutQuaternarySlotcorepackRecipe,
    Component: ListItemLayoutQuaternarySlotcorepack,
    playground: {
      initialSource: listItemLayoutQuaternarySlotcorepackSource,
      fileName: "listItemLayout-quaternarySlotcorepack.tsx",
      runtimeBindings: { ArrayDataProvider },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutQuaternarySlotcorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "leading-slot",
    name: "Leading Slot",
    description: listItemLayoutLeadingSlotcorepackDescription,
    recipe: listItemLayoutLeadingSlotcorepackRecipe,
    Component: ListItemLayoutLeadingSlotcorepack,
    playground: {
      initialSource: listItemLayoutLeadingSlotcorepackSource,
      fileName: "listItemLayout-leadingSlotcorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutLeadingSlotcorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "trailing-slot",
    name: "Trailing Slot",
    description: listItemLayoutTrailingSlotcorepackDescription,
    recipe: listItemLayoutTrailingSlotcorepackRecipe,
    Component: ListItemLayoutTrailingSlotcorepack,
    playground: {
      initialSource: listItemLayoutTrailingSlotcorepackSource,
      fileName: "listItemLayout-trailingSlotcorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutTrailingSlotcorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "action-slot",
    name: "Action Slot",
    description: listItemLayoutActioncorepackDescription,
    recipe: listItemLayoutActioncorepackRecipe,
    Component: ListItemLayoutActioncorepack,
    playground: {
      initialSource: listItemLayoutActioncorepackSource,
      fileName: "listItemLayout-actioncorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutActioncorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "padding",
    name: "No Padding",
    description: listItemLayoutPaddingcorepackDescription,
    recipe: listItemLayoutPaddingcorepackRecipe,
    Component: ListItemLayoutPaddingcorepack,
    playground: {
      initialSource: listItemLayoutPaddingcorepackSource,
      fileName: "listItemLayout-paddingcorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutPaddingcorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "multi-column",
    name: "MultiColumn Layout",
    description: listItemLayoutMultiColumncorepackDescription,
    recipe: listItemLayoutMultiColumncorepackRecipe,
    Component: ListItemLayoutMultiColumncorepack,
    playground: {
      initialSource: listItemLayoutMultiColumncorepackSource,
      fileName: "listItemLayout-multiColumncorepack.tsx",
      runtimeBindings: { ArrayDataProvider },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutMultiColumncorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "table",
    name: "Table",
    description: listItemLayoutTablecorepackDescription,
    recipe: listItemLayoutTablecorepackRecipe,
    Component: ListItemLayoutTablecorepack,
    playground: {
      initialSource: listItemLayoutTablecorepackSource,
      fileName: "listItemLayout-tablecorepack.tsx",
      runtimeBindings: { ArrayDataProvider, IntlNumberConverter },
    },
  },
  {
    id: "vertical-alignment",
    name: "Vertical Alignment",
    description: listItemLayoutVerticalAlignmentcorepackDescription,
    recipe: listItemLayoutVerticalAlignmentcorepackRecipe,
    Component: ListItemLayoutVerticalAlignmentcorepack,
    playground: {
      initialSource: listItemLayoutVerticalAlignmentcorepackSource,
      fileName: "listItemLayout-verticalAlignmentcorepack.tsx",
      runtimeBindings: { ArrayDataProvider, KeySetImpl },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: listItemLayoutVerticalAlignmentcorepackDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
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

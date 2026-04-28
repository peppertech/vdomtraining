import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { LegendDefault } from "./legend-default/legend-default";
import { legendDefaultDescription } from "./legend-default/description";
import { legendDefaultRecipe } from "./legend-default/recipe";
import { LegendItems } from "./legend-items/legend-items";
import { legendItemsDescription } from "./legend-items/description";
import { legendItemsRecipe } from "./legend-items/recipe";
import { LegendLayout } from "./legend-layout/legend-layout";
import { legendLayoutDescription } from "./legend-layout/description";
import { legendLayoutRecipe } from "./legend-layout/recipe";
import { LegendSections } from "./legend-sections/legend-sections";
import { legendSectionsDescription } from "./legend-sections/description";
import { legendSectionsRecipe } from "./legend-sections/recipe";
import { LegendShapedData } from "./legend-shapedData/legend-shapedData";
import { legendShapedDataDescription } from "./legend-shapedData/description";
import { legendShapedDataRecipe } from "./legend-shapedData/recipe";
import { LegendStyles } from "./legend-styles/legend-styles";
import { legendStylesDescription } from "./legend-styles/description";
import { legendStylesRecipe } from "./legend-styles/recipe";

const legendLegacyItems: RecipePageItem[] = [
  {
    id: "default",
    name: "Basic",
    description: legendDefaultDescription,
    recipe: legendDefaultRecipe,
    Component: LegendDefault,
  },
  {
    id: "items",
    name: "Icons",
    description: legendItemsDescription,
    recipe: legendItemsRecipe,
    Component: LegendItems,
  },
  {
    id: "sections",
    name: "Sections",
    description: legendSectionsDescription,
    recipe: legendSectionsRecipe,
    Component: LegendSections,
  },
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: legendShapedDataDescription,
    recipe: legendShapedDataRecipe,
    Component: LegendShapedData,
  },
  {
    id: "layout",
    name: "Layout",
    description: legendLayoutDescription,
    recipe: legendLayoutRecipe,
    Component: LegendLayout,
  },
  {
    id: "styles",
    name: "Styles",
    description: legendStylesDescription,
    recipe: legendStylesRecipe,
    Component: LegendStyles,
  },
];

export default function LegendLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Legend legacy examples"
      componentType="oj-legend"
      layoutId="legendLegacyNavigationLayout"
      items={legendLegacyItems}
      initialItemId="default"
      navigationTitle="Legend"
    />
  );
}

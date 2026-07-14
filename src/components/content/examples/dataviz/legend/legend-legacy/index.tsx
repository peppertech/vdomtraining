import 'preact';
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../../shared/demo-page-layout/recipe-page-template";
import { legendDefaultDescription } from "./legend-default/description";
import { LegendDefault } from "./legend-default/legend-default";
import { legendDefaultRecipe } from "./legend-default/recipe";
import { legendItemsDescription } from "./legend-items/description";
import { LegendItems } from "./legend-items/legend-items";
import { legendItemsRecipe } from "./legend-items/recipe";
import { legendLayoutDescription } from "./legend-layout/description";
import { LegendLayout } from "./legend-layout/legend-layout";
import { legendLayoutRecipe } from "./legend-layout/recipe";
import { legendSectionsDescription } from "./legend-sections/description";
import { LegendSections } from "./legend-sections/legend-sections";
import { legendSectionsRecipe } from "./legend-sections/recipe";
import { legendShapedDataDescription } from "./legend-shapedData/description";
import { LegendShapedData } from "./legend-shapedData/legend-shapedData";
import { legendShapedDataRecipe } from "./legend-shapedData/recipe";
import { legendStylesDescription } from "./legend-styles/description";
import { LegendStyles } from "./legend-styles/legend-styles";
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

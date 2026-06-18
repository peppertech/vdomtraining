import { h } from "preact";
import {
  RecipePageTemplate,
  type RecipePageItem,
} from "../../../../shared/demo-page-layout/recipe-page-template";
import { ThematicMapDefault } from "./thematicMap-default/thematicMap-default";
import { thematicMapDefaultDescription } from "./thematicMap-default/description";
import { thematicMapDefaultRecipe } from "./thematicMap-default/recipe";
import { ThematicMapShapedData } from "./thematicMap-shapedData/thematicMap-shapedData";
import { thematicMapShapedDataDescription } from "./thematicMap-shapedData/description";
import { thematicMapShapedDataRecipe } from "./thematicMap-shapedData/recipe";
import { ThematicMapBasemaps } from "./thematicMap-basemaps/thematicMap-basemaps";
import { thematicMapBasemapsDescription } from "./thematicMap-basemaps/description";
import { thematicMapBasemapsRecipe } from "./thematicMap-basemaps/recipe";
import { ThematicMapBasemapsEndpoints } from "./thematicMap-basemapsEndpoints/thematicMap-basemapsEndpoints";
import { thematicMapBasemapsEndpointsDescription } from "./thematicMap-basemapsEndpoints/description";
import { thematicMapBasemapsEndpointsRecipe } from "./thematicMap-basemapsEndpoints/recipe";
import { ThematicMapCoordinates } from "./thematicMap-coordinates/thematicMap-coordinates";
import { thematicMapCoordinatesDescription } from "./thematicMap-coordinates/description";
import { thematicMapCoordinatesRecipe } from "./thematicMap-coordinates/recipe";
import { ThematicMapMarkerSizing } from "./thematicMap-markerSizing/thematicMap-markerSizing";
import { thematicMapMarkerSizingDescription } from "./thematicMap-markerSizing/description";
import { thematicMapMarkerSizingRecipe } from "./thematicMap-markerSizing/recipe";
import { ThematicMapLinks } from "./thematicMap-links/thematicMap-links";
import { thematicMapLinksDescription } from "./thematicMap-links/description";
import { thematicMapLinksRecipe } from "./thematicMap-links/recipe";
import { ThematicMapSelection } from "./thematicMap-selection/thematicMap-selection";
import { thematicMapSelectionDescription } from "./thematicMap-selection/description";
import { thematicMapSelectionRecipe } from "./thematicMap-selection/recipe";
import { ThematicMapTooltip } from "./thematicMap-tooltip/thematicMap-tooltip";
import { thematicMapTooltipDescription } from "./thematicMap-tooltip/description";
import { thematicMapTooltipRecipe } from "./thematicMap-tooltip/recipe";
import { ThematicMapPopup } from "./thematicMap-popup/thematicMap-popup";
import { thematicMapPopupDescription } from "./thematicMap-popup/description";
import { thematicMapPopupRecipe } from "./thematicMap-popup/recipe";
import { ThematicMapContextMenu } from "./thematicMap-contextMenu/thematicMap-contextMenu";
import { thematicMapContextMenuDescription } from "./thematicMap-contextMenu/description";
import { thematicMapContextMenuRecipe } from "./thematicMap-contextMenu/recipe";
import { ThematicMapRenderer } from "./thematicMap-renderer/thematicMap-renderer";
import { thematicMapRendererDescription } from "./thematicMap-renderer/description";
import { thematicMapRendererRecipe } from "./thematicMap-renderer/recipe";
import { ThematicMapInlineTemplates } from "./thematicMap-inlineTemplates/thematicMap-inlineTemplates";
import { thematicMapInlineTemplatesDescription } from "./thematicMap-inlineTemplates/description";
import { thematicMapInlineTemplatesRecipe } from "./thematicMap-inlineTemplates/recipe";
import { ThematicMapStyles } from "./thematicMap-styles/thematicMap-styles";
import { thematicMapStylesDescription } from "./thematicMap-styles/description";
import { thematicMapStylesRecipe } from "./thematicMap-styles/recipe";
import { ThematicMapSmallFormFactor } from "./thematicMap-smallFormFactor/thematicMap-smallFormFactor";
import { thematicMapSmallFormFactorDescription } from "./thematicMap-smallFormFactor/description";
import { thematicMapSmallFormFactorRecipe } from "./thematicMap-smallFormFactor/recipe";

const thematicMapItems: RecipePageItem[] = [
  {
    id: "default",
    name: "Basic",
    description: thematicMapDefaultDescription,
    recipe: thematicMapDefaultRecipe,
    Component: ThematicMapDefault,
  },
  
  {
    id: "basemaps",
    name: "Generating Maps",
    description: thematicMapBasemapsDescription,
    recipe: thematicMapBasemapsRecipe,
    Component: ThematicMapBasemaps,
  },
  {
    id: "basemaps-endpoints",
    name: "Generating Maps (Oracle Internal)",
    description: thematicMapBasemapsEndpointsDescription,
    recipe: thematicMapBasemapsEndpointsRecipe,
    Component: ThematicMapBasemapsEndpoints,
  },
  {
    id: "context-menu",
    name: "Context Menus",
    description: thematicMapContextMenuDescription,
    recipe: thematicMapContextMenuRecipe,
    Component: ThematicMapContextMenu,
  },
  {
    id: "coordinates",
    name: "Projecting Coordinates",
    description: thematicMapCoordinatesDescription,
    recipe: thematicMapCoordinatesRecipe,
    Component: ThematicMapCoordinates,
  },
  {
    id: "renderer",
    name: "Custom Data Renderer",
    description: thematicMapRendererDescription,
    recipe: thematicMapRendererRecipe,
    Component: ThematicMapRenderer,
  },
  {
    id: "inline-templates",
    name: "Inline Templates",
    description: thematicMapInlineTemplatesDescription,
    recipe: thematicMapInlineTemplatesRecipe,
    Component: ThematicMapInlineTemplates,
  },
  {
    id: "links",
    name: "Links",
    description: thematicMapLinksDescription,
    recipe: thematicMapLinksRecipe,
    Component: ThematicMapLinks,
  },
  {
    id: "marker-sizing",
    name: "Marker Sizing",
    description: thematicMapMarkerSizingDescription,
    recipe: thematicMapMarkerSizingRecipe,
    Component: ThematicMapMarkerSizing,
  },
  {
    id: "popup",
    name: "Popups",
    description: thematicMapPopupDescription,
    recipe: thematicMapPopupRecipe,
    Component: ThematicMapPopup,
  },
  {
    id: "selection",
    name: "Selection",
    description: thematicMapSelectionDescription,
    recipe: thematicMapSelectionRecipe,
    Component: ThematicMapSelection,
  },
  
  {
    id: "shaped-data",
    name: "Shaped Data",
    description: thematicMapShapedDataDescription,
    recipe: thematicMapShapedDataRecipe,
    Component: ThematicMapShapedData,
  },
  {
    id: "small-form-factor",
    name: "Small Form Factor",
    description: thematicMapSmallFormFactorDescription,
    recipe: thematicMapSmallFormFactorRecipe,
    Component: ThematicMapSmallFormFactor,
  },
  
  {
    id: "styles",
    name: "Styles",
    description: thematicMapStylesDescription,
    recipe: thematicMapStylesRecipe,
    Component: ThematicMapStyles,
  },
  {
    id: "tooltip",
    name: "Tooltip Customiztion",
    description: thematicMapTooltipDescription,
    recipe: thematicMapTooltipRecipe,
    Component: ThematicMapTooltip,
  },
];

export default function ThematicMapRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Thematic Map examples"
      componentType="oj-thematic-map"
      layoutId="thematicMapNavigationLayout"
      items={thematicMapItems}
      initialItemId="default"
      navigationTitle="Thematic Map"
    />
  );
}

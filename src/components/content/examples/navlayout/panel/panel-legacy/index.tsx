import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { panelPanelbasicsDescription } from "./panel-panelbasics/description";
import { PanelPanelbasics } from "./panel-panelbasics/panel-panelbasics";
import { panelPanelbasicsRecipe } from "./panel-panelbasics/recipe";
import { panelPanelcolorsDescription } from "./panel-panelcolors/description";
import { PanelPanelcolors } from "./panel-panelcolors/panel-panelcolors";
import { panelPanelcolorsRecipe } from "./panel-panelcolors/recipe";
import { panelPaneloverviewDescription } from "./panel-paneloverview/description";
import { PanelPaneloverview } from "./panel-paneloverview/panel-paneloverview";
import { panelPaneloverviewRecipe } from "./panel-paneloverview/recipe";
import { panelPanelshadowDescription } from "./panel-panelshadow/description";
import { PanelPanelshadow } from "./panel-panelshadow/panel-panelshadow";
import { panelPanelshadowRecipe } from "./panel-panelshadow/recipe";

const panelLegacyItems = [
  {
    id: "overview",
    name: "Overview",
    description: panelPaneloverviewDescription,
    recipe: panelPaneloverviewRecipe,
    Component: PanelPaneloverview,
  },
  {
    id: "colors",
    name: "Colors",
    description: panelPanelcolorsDescription,
    recipe: panelPanelcolorsRecipe,
    Component: PanelPanelcolors,
  },
  {
    id: "shadow",
    name: "Shadow",
    description: panelPanelshadowDescription,
    recipe: panelPanelshadowRecipe,
    Component: PanelPanelshadow,
  },
  {
    id: "basics",
    name: "Flex Panel",
    description: panelPanelbasicsDescription,
    recipe: panelPanelbasicsRecipe,
    Component: PanelPanelbasics,
  }
];

export default function PanelLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Panel examples"
      componentType="oj-panel"
      items={panelLegacyItems}
      initialItemId="overview"
      navigationTitle="Panel"
    />
  );
}

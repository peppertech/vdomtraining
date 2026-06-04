import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { PanelPaneloverview } from "./panel-paneloverview/panel-paneloverview";
import { panelPaneloverviewDescription } from "./panel-paneloverview/description";
import { panelPaneloverviewRecipe } from "./panel-paneloverview/recipe";
import { PanelPanelbasics } from "./panel-panelbasics/panel-panelbasics";
import { panelPanelbasicsDescription } from "./panel-panelbasics/description";
import { panelPanelbasicsRecipe } from "./panel-panelbasics/recipe";
import { PanelPanelcolors } from "./panel-panelcolors/panel-panelcolors";
import { panelPanelcolorsDescription } from "./panel-panelcolors/description";
import { panelPanelcolorsRecipe } from "./panel-panelcolors/recipe";
import { PanelPanelshadow } from "./panel-panelshadow/panel-panelshadow";
import { panelPanelshadowDescription } from "./panel-panelshadow/description";
import { panelPanelshadowRecipe } from "./panel-panelshadow/recipe";
import { PanelPanelselected } from "./panel-panelselected/panel-panelselected";
import { panelPanelselectedDescription } from "./panel-panelselected/description";
import { panelPanelselectedRecipe } from "./panel-panelselected/recipe";
import { PanelPaneldrag } from "./panel-paneldrag/panel-paneldrag";
import { panelPaneldragDescription } from "./panel-paneldrag/description";
import { panelPaneldragRecipe } from "./panel-paneldrag/recipe";

const panelLegacyItems = [
  {
    id: "overview",
    name: "Overview",
    description: panelPaneloverviewDescription,
    recipe: panelPaneloverviewRecipe,
    Component: PanelPaneloverview,
  },
  {
    id: "basics",
    name: "Basics",
    description: panelPanelbasicsDescription,
    recipe: panelPanelbasicsRecipe,
    Component: PanelPanelbasics,
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
    id: "selected",
    name: "Selected",
    description: panelPanelselectedDescription,
    recipe: panelPanelselectedRecipe,
    Component: PanelPanelselected,
  },
  {
    id: "drag",
    name: "Drag",
    description: panelPaneldragDescription,
    recipe: panelPaneldragRecipe,
    Component: PanelPaneldrag,
  },
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

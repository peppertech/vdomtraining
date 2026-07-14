import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { dialogCancelBehaviorcorepackDescription } from "./dialog-cancelBehaviorcorepack/description";
import { DialogCancelBehaviorcorepack } from "./dialog-cancelBehaviorcorepack/dialog-cancelBehaviorcorepack";
import { dialogCancelBehaviorcorepackRecipe } from "./dialog-cancelBehaviorcorepack/recipe";
import { dialogDefercorepackDescription } from "./dialog-defercorepack/description";
import { DialogDefercorepack } from "./dialog-defercorepack/dialog-defercorepack";
import { dialogDefercorepackRecipe } from "./dialog-defercorepack/recipe";
import { dialogDimensionscorepackDescription } from "./dialog-dimensionscorepack/description";
import { DialogDimensionscorepack } from "./dialog-dimensionscorepack/dialog-dimensionscorepack";
import { dialogDimensionscorepackRecipe } from "./dialog-dimensionscorepack/recipe";
import { dialogDragAffordancecorepackDescription } from "./dialog-dragAffordancecorepack/description";
import { DialogDragAffordancecorepack } from "./dialog-dragAffordancecorepack/dialog-dragAffordancecorepack";
import { dialogDragAffordancecorepackRecipe } from "./dialog-dragAffordancecorepack/recipe";
import { dialogHeaderDecorationcorepackDescription } from "./dialog-headerDecorationcorepack/description";
import { DialogHeaderDecorationcorepack } from "./dialog-headerDecorationcorepack/dialog-headerDecorationcorepack";
import { dialogHeaderDecorationcorepackRecipe } from "./dialog-headerDecorationcorepack/recipe";
import { dialogModalcorepackDescription } from "./dialog-modalcorepack/description";
import { DialogModalcorepack } from "./dialog-modalcorepack/dialog-modalcorepack";
import { dialogModalcorepackRecipe } from "./dialog-modalcorepack/recipe";
import { dialogModelesscorepackDescription } from "./dialog-modelesscorepack/description";
import { DialogModelesscorepack } from "./dialog-modelesscorepack/dialog-modelesscorepack";
import { dialogModelesscorepackRecipe } from "./dialog-modelesscorepack/recipe";
import { dialogNestedcorepackDescription } from "./dialog-nestedcorepack/description";
import { DialogNestedcorepack } from "./dialog-nestedcorepack/dialog-nestedcorepack";
import { dialogNestedcorepackRecipe } from "./dialog-nestedcorepack/recipe";
import { dialogPercentcorepackDescription } from "./dialog-percentcorepack/description";
import { DialogPercentcorepack } from "./dialog-percentcorepack/dialog-percentcorepack";
import { dialogPercentcorepackRecipe } from "./dialog-percentcorepack/recipe";
import { dialogResizeBehaviorcorepackDescription } from "./dialog-resizeBehaviorcorepack/description";
import { DialogResizeBehaviorcorepack } from "./dialog-resizeBehaviorcorepack/dialog-resizeBehaviorcorepack";
import { dialogResizeBehaviorcorepackRecipe } from "./dialog-resizeBehaviorcorepack/recipe";
import { dialogScrollingcorepackDescription } from "./dialog-scrollingcorepack/description";
import { DialogScrollingcorepack } from "./dialog-scrollingcorepack/dialog-scrollingcorepack";
import { dialogScrollingcorepackRecipe } from "./dialog-scrollingcorepack/recipe";
import { dialogUserDefinedHeadercorepackDescription } from "./dialog-userDefinedHeadercorepack/description";
import { DialogUserDefinedHeadercorepack } from "./dialog-userDefinedHeadercorepack/dialog-userDefinedHeadercorepack";
import { dialogUserDefinedHeadercorepackRecipe } from "./dialog-userDefinedHeadercorepack/recipe";

const dialogCorePackItems = [
  {
    id: "modal",
    name: "Modal",
    description: dialogModalcorepackDescription,
    recipe: dialogModalcorepackRecipe,
    Component: DialogModalcorepack,
  },
  {
    id: "modeless",
    name: "Modeless",
    description: dialogModelesscorepackDescription,
    recipe: dialogModelesscorepackRecipe,
    Component: DialogModelesscorepack,
  },
  {
    id: "cancel-behavior",
    name: "Cancel Behavior",
    description: dialogCancelBehaviorcorepackDescription,
    recipe: dialogCancelBehaviorcorepackRecipe,
    Component: DialogCancelBehaviorcorepack,
  },
  {
    id: "drag-affordance",
    name: "Drag Affordance",
    description: dialogDragAffordancecorepackDescription,
    recipe: dialogDragAffordancecorepackRecipe,
    Component: DialogDragAffordancecorepack,
  },
  {
    id: "header-decoration",
    name: "Header Decoration",
    description: dialogHeaderDecorationcorepackDescription,
    recipe: dialogHeaderDecorationcorepackRecipe,
    Component: DialogHeaderDecorationcorepack,
  },
  {
    id: "resize-behavior",
    name: "Resize Behavior",
    description: dialogResizeBehaviorcorepackDescription,
    recipe: dialogResizeBehaviorcorepackRecipe,
    Component: DialogResizeBehaviorcorepack,
  },
  {
    id: "dimensions",
    name: "Dimensions",
    description: dialogDimensionscorepackDescription,
    recipe: dialogDimensionscorepackRecipe,
    Component: DialogDimensionscorepack,
  },
  {
    id: "nested",
    name: "Nested Dialog",
    description: dialogNestedcorepackDescription,
    recipe: dialogNestedcorepackRecipe,
    Component: DialogNestedcorepack,
  },
  {
    id: "percent",
    name: "Percent Dimensions",
    description: dialogPercentcorepackDescription,
    recipe: dialogPercentcorepackRecipe,
    Component: DialogPercentcorepack,
  },
  {
    id: "user-defined-header",
    name: "User Defined Header",
    description: dialogUserDefinedHeadercorepackDescription,
    recipe: dialogUserDefinedHeadercorepackRecipe,
    Component: DialogUserDefinedHeadercorepack,
  },
  {
    id: "scrolling",
    name: "With Scrolled Content",
    description: dialogScrollingcorepackDescription,
    recipe: dialogScrollingcorepackRecipe,
    Component: DialogScrollingcorepack,
  },
  {
    id: "defer",
    name: "Deferred Rendering",
    description: dialogDefercorepackDescription,
    recipe: dialogDefercorepackRecipe,
    Component: DialogDefercorepack,
  }
];

export default function DialogCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Dialog Core Pack examples"
      componentType="oj-c-dialog"
      packLabel="Core Pack"
      items={dialogCorePackItems}
      initialItemId="modal"
      navigationTitle="Dialog Core Pack"
    />
  );
}

import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { DialogCancelBehavior } from "./dialog-cancelBehavior/dialog-cancelBehavior";
import { dialogCancelBehaviorDescription } from "./dialog-cancelBehavior/description";
import { dialogCancelBehaviorRecipe } from "./dialog-cancelBehavior/recipe";
import { DialogDefer } from "./dialog-defer/dialog-defer";
import { dialogDeferDescription } from "./dialog-defer/description";
import { dialogDeferRecipe } from "./dialog-defer/recipe";
import { DialogDimensions } from "./dialog-dimensions/dialog-dimensions";
import { dialogDimensionsDescription } from "./dialog-dimensions/description";
import { dialogDimensionsRecipe } from "./dialog-dimensions/recipe";
import { DialogDragAffordance } from "./dialog-dragAffordance/dialog-dragAffordance";
import { dialogDragAffordanceDescription } from "./dialog-dragAffordance/description";
import { dialogDragAffordanceRecipe } from "./dialog-dragAffordance/recipe";
import { DialogFooter } from "./dialog-footer/dialog-footer";
import { dialogFooterDescription } from "./dialog-footer/description";
import { dialogFooterRecipe } from "./dialog-footer/recipe";
import { DialogHeaderDecoration } from "./dialog-headerDecoration/dialog-headerDecoration";
import { dialogHeaderDecorationDescription } from "./dialog-headerDecoration/description";
import { dialogHeaderDecorationRecipe } from "./dialog-headerDecoration/recipe";
import { DialogModal } from "./dialog-modal/dialog-modal";
import { dialogModalDescription } from "./dialog-modal/description";
import { dialogModalRecipe } from "./dialog-modal/recipe";
import { DialogModeless } from "./dialog-modeless/dialog-modeless";
import { dialogModelessDescription } from "./dialog-modeless/description";
import { dialogModelessRecipe } from "./dialog-modeless/recipe";
import { DialogNested } from "./dialog-nested/dialog-nested";
import { dialogNestedDescription } from "./dialog-nested/description";
import { dialogNestedRecipe } from "./dialog-nested/recipe";
import { DialogPercent } from "./dialog-percent/dialog-percent";
import { dialogPercentDescription } from "./dialog-percent/description";
import { dialogPercentRecipe } from "./dialog-percent/recipe";
import { DialogPosition } from "./dialog-position/dialog-position";
import { dialogPositionDescription } from "./dialog-position/description";
import { dialogPositionRecipe } from "./dialog-position/recipe";
import { DialogResizeBehavior } from "./dialog-resizeBehavior/dialog-resizeBehavior";
import { dialogResizeBehaviorDescription } from "./dialog-resizeBehavior/description";
import { dialogResizeBehaviorRecipe } from "./dialog-resizeBehavior/recipe";
import { DialogScrolling } from "./dialog-scrolling/dialog-scrolling";
import { dialogScrollingDescription } from "./dialog-scrolling/description";
import { dialogScrollingRecipe } from "./dialog-scrolling/recipe";
import { DialogUserDefinedHeader } from "./dialog-userDefinedHeader/dialog-userDefinedHeader";
import { dialogUserDefinedHeaderDescription } from "./dialog-userDefinedHeader/description";
import { dialogUserDefinedHeaderRecipe } from "./dialog-userDefinedHeader/recipe";

const dialogLegacyItems = [
  {
    id: "modal",
    name: "Modal",
    description: dialogModalDescription,
    recipe: dialogModalRecipe,
    Component: DialogModal,
  },
  {
    id: "modeless",
    name: "Modeless",
    description: dialogModelessDescription,
    recipe: dialogModelessRecipe,
    Component: DialogModeless,
  },
  {
    id: "position",
    name: "Position",
    description: dialogPositionDescription,
    recipe: dialogPositionRecipe,
    Component: DialogPosition,
  },
  {
    id: "cancel-behavior",
    name: "Cancel Behavior",
    description: dialogCancelBehaviorDescription,
    recipe: dialogCancelBehaviorRecipe,
    Component: DialogCancelBehavior,
  },
  {
    id: "drag-affordance",
    name: "Drag Affordance",
    description: dialogDragAffordanceDescription,
    recipe: dialogDragAffordanceRecipe,
    Component: DialogDragAffordance,
  },
  {
    id: "header-decoration",
    name: "Header Decoration",
    description: dialogHeaderDecorationDescription,
    recipe: dialogHeaderDecorationRecipe,
    Component: DialogHeaderDecoration,
  },
  {
    id: "resize-behavior",
    name: "Resize Behavior",
    description: dialogResizeBehaviorDescription,
    recipe: dialogResizeBehaviorRecipe,
    Component: DialogResizeBehavior,
  },
  {
    id: "dimensions",
    name: "Dimensions",
    description: dialogDimensionsDescription,
    recipe: dialogDimensionsRecipe,
    Component: DialogDimensions,
  },
  {
    id: "footer",
    name: "Footer",
    description: dialogFooterDescription,
    recipe: dialogFooterRecipe,
    Component: DialogFooter,
  },
  {
    id: "nested",
    name: "Nested Dialog",
    description: dialogNestedDescription,
    recipe: dialogNestedRecipe,
    Component: DialogNested,
  },
  {
    id: "percent",
    name: "Percent Dimensions",
    description: dialogPercentDescription,
    recipe: dialogPercentRecipe,
    Component: DialogPercent,
  },
  {
    id: "user-defined-header",
    name: "User Defined Header",
    description: dialogUserDefinedHeaderDescription,
    recipe: dialogUserDefinedHeaderRecipe,
    Component: DialogUserDefinedHeader,
  },
   {
    id: "scrolling",
    name: "With Scrolled Content",
    description: dialogScrollingDescription,
    recipe: dialogScrollingRecipe,
    Component: DialogScrolling,
  },
  {
    id: "defer",
    name: "Deferred Rendering",
    description: dialogDeferDescription,
    recipe: dialogDeferRecipe,
    Component: DialogDefer,
  },
];

export default function DialogLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Dialog examples"
      componentType="oj-dialog"
      items={dialogLegacyItems}
      initialItemId="modal"
      navigationTitle="Dialog"
    />
  );
}

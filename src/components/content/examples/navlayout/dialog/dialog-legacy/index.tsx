import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { dialogCancelBehaviorDescription } from "./dialog-cancelBehavior/description";
import { DialogCancelBehavior } from "./dialog-cancelBehavior/dialog-cancelBehavior";
import { dialogCancelBehaviorRecipe } from "./dialog-cancelBehavior/recipe";
import { dialogDeferDescription } from "./dialog-defer/description";
import { DialogDefer } from "./dialog-defer/dialog-defer";
import { dialogDeferRecipe } from "./dialog-defer/recipe";
import { dialogDimensionsDescription } from "./dialog-dimensions/description";
import { DialogDimensions } from "./dialog-dimensions/dialog-dimensions";
import { dialogDimensionsRecipe } from "./dialog-dimensions/recipe";
import { dialogDragAffordanceDescription } from "./dialog-dragAffordance/description";
import { DialogDragAffordance } from "./dialog-dragAffordance/dialog-dragAffordance";
import { dialogDragAffordanceRecipe } from "./dialog-dragAffordance/recipe";
import { dialogFooterDescription } from "./dialog-footer/description";
import { DialogFooter } from "./dialog-footer/dialog-footer";
import { dialogFooterRecipe } from "./dialog-footer/recipe";
import { dialogHeaderDecorationDescription } from "./dialog-headerDecoration/description";
import { DialogHeaderDecoration } from "./dialog-headerDecoration/dialog-headerDecoration";
import { dialogHeaderDecorationRecipe } from "./dialog-headerDecoration/recipe";
import { dialogModalDescription } from "./dialog-modal/description";
import { DialogModal } from "./dialog-modal/dialog-modal";
import { dialogModalRecipe } from "./dialog-modal/recipe";
import { dialogModelessDescription } from "./dialog-modeless/description";
import { DialogModeless } from "./dialog-modeless/dialog-modeless";
import { dialogModelessRecipe } from "./dialog-modeless/recipe";
import { dialogNestedDescription } from "./dialog-nested/description";
import { DialogNested } from "./dialog-nested/dialog-nested";
import { dialogNestedRecipe } from "./dialog-nested/recipe";
import { dialogPercentDescription } from "./dialog-percent/description";
import { DialogPercent } from "./dialog-percent/dialog-percent";
import { dialogPercentRecipe } from "./dialog-percent/recipe";
import { dialogPositionDescription } from "./dialog-position/description";
import { DialogPosition } from "./dialog-position/dialog-position";
import { dialogPositionRecipe } from "./dialog-position/recipe";
import { dialogResizeBehaviorDescription } from "./dialog-resizeBehavior/description";
import { DialogResizeBehavior } from "./dialog-resizeBehavior/dialog-resizeBehavior";
import { dialogResizeBehaviorRecipe } from "./dialog-resizeBehavior/recipe";
import { dialogScrollingDescription } from "./dialog-scrolling/description";
import { DialogScrolling } from "./dialog-scrolling/dialog-scrolling";
import { dialogScrollingRecipe } from "./dialog-scrolling/recipe";
import { dialogUserDefinedHeaderDescription } from "./dialog-userDefinedHeader/description";
import { DialogUserDefinedHeader } from "./dialog-userDefinedHeader/dialog-userDefinedHeader";
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

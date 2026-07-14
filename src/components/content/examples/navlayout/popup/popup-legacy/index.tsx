import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { popupDeferDescription } from "./popup-defer/description";
import { PopupDefer } from "./popup-defer/popup-defer";
import { popupDeferRecipe } from "./popup-defer/recipe";
import { popupModalDescription } from "./popup-modal/description";
import { PopupModal } from "./popup-modal/popup-modal";
import { popupModalRecipe } from "./popup-modal/recipe";
import { popupPopupDescription } from "./popup-popup/description";
import { PopupPopup } from "./popup-popup/popup-popup";
import { popupPopupRecipe } from "./popup-popup/recipe";
import { popupTailAdjustPositionDescription } from "./popup-tailAdjustPosition/description";
import { PopupTailAdjustPosition } from "./popup-tailAdjustPosition/popup-tailAdjustPosition";
import { popupTailAdjustPositionRecipe } from "./popup-tailAdjustPosition/recipe";
import { popupTailCommonPositionsDescription } from "./popup-tailCommonPositions/description";
import { PopupTailCommonPositions } from "./popup-tailCommonPositions/popup-tailCommonPositions";
import { popupTailCommonPositionsRecipe } from "./popup-tailCommonPositions/recipe";
import { popupTooltipDescription } from "./popup-tooltip/description";
import { PopupTooltip } from "./popup-tooltip/popup-tooltip";
import { popupTooltipRecipe } from "./popup-tooltip/recipe";

const popupLegacyItems = [
  {
    id: "popup",
    name: "Basic",
    description: popupPopupDescription,
    recipe: popupPopupRecipe,
    Component: PopupPopup,
  },
  {
    id: "tail-common-positions",
    name: "Tail & Common Positions",
    description: popupTailCommonPositionsDescription,
    recipe: popupTailCommonPositionsRecipe,
    Component: PopupTailCommonPositions,
  },
   {
    id: "tail-adjust-position",
    name: "Tail & Adjust Position",
    description: popupTailAdjustPositionDescription,
    recipe: popupTailAdjustPositionRecipe,
    Component: PopupTailAdjustPosition,
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: popupTooltipDescription,
    recipe: popupTooltipRecipe,
    Component: PopupTooltip,
  },
  {
    id: "modal",
    name: "Modal",
    description: popupModalDescription,
    recipe: popupModalRecipe,
    Component: PopupModal,
  },
  {
    id: "defer",
    name: "Deferred Rendering",
    description: popupDeferDescription,
    recipe: popupDeferRecipe,
    Component: PopupDefer,
  }
];

export default function PopupLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Popup examples"
      componentType="oj-popup"
      items={popupLegacyItems}
      initialItemId="popup"
      navigationTitle="Popup"
    />
  );
}

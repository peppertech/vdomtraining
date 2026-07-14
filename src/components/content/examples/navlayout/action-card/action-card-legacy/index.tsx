import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { ActioncardBasic } from "./actioncard-basic/actioncard-basic";
import { actioncardBasicDescription } from "./actioncard-basic/description";
import { actioncardBasicRecipe } from "./actioncard-basic/recipe";
import { ActioncardProfiledept } from "./actioncard-profiledept/actioncard-profiledept";
import { actioncardProfiledeptDescription } from "./actioncard-profiledept/description";
import { actioncardProfiledeptRecipe } from "./actioncard-profiledept/recipe";
import { listViewCardLayoutListViewDescription } from "./listView-cardLayoutListView/description";
import { ListViewCardLayoutListView } from "./listView-cardLayoutListView/listView-cardLayoutListView";
import { listViewCardLayoutListViewRecipe } from "./listView-cardLayoutListView/recipe";
import { waterfallLayoutBasicWaterfallLayoutDescription } from "./waterfallLayout-basicWaterfallLayout/description";
import { waterfallLayoutBasicWaterfallLayoutRecipe } from "./waterfallLayout-basicWaterfallLayout/recipe";
import { WaterfallLayoutBasicWaterfallLayout } from "./waterfallLayout-basicWaterfallLayout/waterfallLayout-basicWaterfallLayout";

const actionCardLegacyItems = [
  {
    id: "basic",
    name: "Basic",
    description: actioncardBasicDescription,
    recipe: actioncardBasicRecipe,
    Component: ActioncardBasic,
  },
  {
    id: "profile-department",
    name: "Card Content",
    description: actioncardProfiledeptDescription,
    recipe: actioncardProfiledeptRecipe,
    Component: ActioncardProfiledept,
  },
  {
    id: "list-view",
    name: "List View",
    description: listViewCardLayoutListViewDescription,
    recipe: listViewCardLayoutListViewRecipe,
    Component: ListViewCardLayoutListView,
  },
  {
    id: "waterfall-layout",
    name: "Waterfall Layout",
    description: waterfallLayoutBasicWaterfallLayoutDescription,
    recipe: waterfallLayoutBasicWaterfallLayoutRecipe,
    Component: WaterfallLayoutBasicWaterfallLayout,
  },
];

export default function ActionCardLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Action Card examples"
      componentType="oj-action-card"
      items={actionCardLegacyItems}
      initialItemId="basic"
      navigationTitle="Action Card"
    />
  );
}

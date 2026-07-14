import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { navigationlistBadgeDescription } from "./navigationlist-badge/description";
import { NavigationlistBadge } from "./navigationlist-badge/navigationlist-badge";
import { navigationlistBadgeRecipe } from "./navigationlist-badge/recipe";
import { navigationlistBasicDescription } from "./navigationlist-basic/description";
import { NavigationlistBasic } from "./navigationlist-basic/navigationlist-basic";
import { navigationlistBasicRecipe } from "./navigationlist-basic/recipe";
import { navigationlistCategoryHeaderDescription } from "./navigationlist-categoryHeader/description";
import { NavigationlistCategoryHeader } from "./navigationlist-categoryHeader/navigationlist-categoryHeader";
import { navigationlistCategoryHeaderRecipe } from "./navigationlist-categoryHeader/recipe";
import { navigationlistCollapsibleWithIconsDescription } from "./navigationlist-collapsibleWithIcons/description";
import { NavigationlistCollapsibleWithIcons } from "./navigationlist-collapsibleWithIcons/navigationlist-collapsibleWithIcons";
import { navigationlistCollapsibleWithIconsRecipe } from "./navigationlist-collapsibleWithIcons/recipe";
import { navigationlistExpandedWithIconsDescription } from "./navigationlist-expandedWithIcons/description";
import { NavigationlistExpandedWithIcons } from "./navigationlist-expandedWithIcons/navigationlist-expandedWithIcons";
import { navigationlistExpandedWithIconsRecipe } from "./navigationlist-expandedWithIcons/recipe";
import { navigationlistNavroutingDescription } from "./navigationlist-navrouting/description";
import { NavigationlistNavrouting } from "./navigationlist-navrouting/navigationlist-navrouting";
import { navigationlistNavroutingRecipe } from "./navigationlist-navrouting/recipe";
import { navigationlistResponsiveDescription } from "./navigationlist-responsive/description";
import { NavigationlistResponsive } from "./navigationlist-responsive/navigationlist-responsive";
import { navigationlistResponsiveRecipe } from "./navigationlist-responsive/recipe";
import { navigationlistSelectionDescription } from "./navigationlist-selection/description";
import { NavigationlistSelection } from "./navigationlist-selection/navigationlist-selection";
import { navigationlistSelectionRecipe } from "./navigationlist-selection/recipe";
import { navigationlistSlidingNavlistComponentDescription } from "./navigationlist-slidingNavlistComponent/description";
import { NavigationlistSlidingNavlistComponent } from "./navigationlist-slidingNavlistComponent/navigationlist-slidingNavlistComponent";
import { navigationlistSlidingNavlistComponentRecipe } from "./navigationlist-slidingNavlistComponent/recipe";
import { navigationlistTextwrapDescription } from "./navigationlist-textwrap/description";
import { NavigationlistTextwrap } from "./navigationlist-textwrap/navigationlist-textwrap";
import { navigationlistTextwrapRecipe } from "./navigationlist-textwrap/recipe";

const navigationListLegacyItems = [
  {
    id: "basic",
    name: "Basic",
    description: navigationlistBasicDescription,
    recipe: navigationlistBasicRecipe,
    Component: NavigationlistBasic,
  },
  {
    id: "text-wrap",
    name: "Text Wrap",
    description: navigationlistTextwrapDescription,
    recipe: navigationlistTextwrapRecipe,
    Component: NavigationlistTextwrap,
  },
  {
    id: "responsive",
    name: "Responsive",
    description: navigationlistResponsiveDescription,
    recipe: navigationlistResponsiveRecipe,
    Component: NavigationlistResponsive,
  },
   {
    id: "expanded-with-icons",
    name: "Expanded",
    description: navigationlistExpandedWithIconsDescription,
    recipe: navigationlistExpandedWithIconsRecipe,
    Component: NavigationlistExpandedWithIcons,
  },
  {
    id: "collapsible-with-icons",
    name: "Collapsible",
    description: navigationlistCollapsibleWithIconsDescription,
    recipe: navigationlistCollapsibleWithIconsRecipe,
    Component: NavigationlistCollapsibleWithIcons,
  },
  {
    id: "sliding-navigation-list",
    name: "Sliding",
    description: navigationlistSlidingNavlistComponentDescription,
    recipe: navigationlistSlidingNavlistComponentRecipe,
    Component: NavigationlistSlidingNavlistComponent,
  },
  {
    id: "selection",
    name: "Monitor Selection",
    description: navigationlistSelectionDescription,
    recipe: navigationlistSelectionRecipe,
    Component: NavigationlistSelection,
  },
  {
    id: "category-header",
    name: "Category Header",
    description: navigationlistCategoryHeaderDescription,
    recipe: navigationlistCategoryHeaderRecipe,
    Component: NavigationlistCategoryHeader,
  },
  {
    id: "badge",
    name: "Badge",
    description: navigationlistBadgeDescription,
    recipe: navigationlistBadgeRecipe,
    Component: NavigationlistBadge,
  },
  {
    id: "navigation-routing",
    name: "Routing",
    description: navigationlistNavroutingDescription,
    recipe: navigationlistNavroutingRecipe,
    Component: NavigationlistNavrouting,
  },
  
];

export default function NavigationListLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Navigation List examples"
      componentType="oj-navigation-list"
      items={navigationListLegacyItems}
      initialItemId="basic"
      navigationTitle="Navigation List"
    />
  );
}

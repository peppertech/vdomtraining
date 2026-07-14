import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { filmStripFilmStripActionCardsDescription } from "./filmStrip-filmStripActionCards/description";
import { FilmStripFilmStripActionCards } from "./filmStrip-filmStripActionCards/filmStrip-filmStripActionCards";
import { filmStripFilmStripActionCardsRecipe } from "./filmStrip-filmStripActionCards/recipe";
import { filmStripFilmStripDeferredRenderingDescription } from "./filmStrip-filmStripDeferredRendering/description";
import { FilmStripFilmStripDeferredRendering } from "./filmStrip-filmStripDeferredRendering/filmStrip-filmStripDeferredRendering";
import { filmStripFilmStripDeferredRenderingRecipe } from "./filmStrip-filmStripDeferredRendering/recipe";
import { filmStripFilmStripLazyRenderingDescription } from "./filmStrip-filmStripLazyRendering/description";
import { FilmStripFilmStripLazyRendering } from "./filmStrip-filmStripLazyRendering/filmStrip-filmStripLazyRendering";
import { filmStripFilmStripLazyRenderingRecipe } from "./filmStrip-filmStripLazyRendering/recipe";
import { filmStripFilmStripLoopingDescription } from "./filmStrip-filmStripLooping/description";
import { FilmStripFilmStripLooping } from "./filmStrip-filmStripLooping/filmStrip-filmStripLooping";
import { filmStripFilmStripLoopingRecipe } from "./filmStrip-filmStripLooping/recipe";
import { filmStripFilmStripNavArrowsDescription } from "./filmStrip-filmStripNavArrows/description";
import { FilmStripFilmStripNavArrows } from "./filmStrip-filmStripNavArrows/filmStrip-filmStripNavArrows";
import { filmStripFilmStripNavArrowsRecipe } from "./filmStrip-filmStripNavArrows/recipe";
import { filmStripFilmStripNavDotsDescription } from "./filmStrip-filmStripNavDots/description";
import { FilmStripFilmStripNavDots } from "./filmStrip-filmStripNavDots/filmStrip-filmStripNavDots";
import { filmStripFilmStripNavDotsRecipe } from "./filmStrip-filmStripNavDots/recipe";
import { filmStripFilmStripOverlaidNavDotsDescription } from "./filmStrip-filmStripOverlaidNavDots/description";
import { FilmStripFilmStripOverlaidNavDots } from "./filmStrip-filmStripOverlaidNavDots/filmStrip-filmStripOverlaidNavDots";
import { filmStripFilmStripOverlaidNavDotsRecipe } from "./filmStrip-filmStripOverlaidNavDots/recipe";
import { filmStripFilmStripPagingTextDescription } from "./filmStrip-filmStripPagingText/description";
import { FilmStripFilmStripPagingText } from "./filmStrip-filmStripPagingText/filmStrip-filmStripPagingText";
import { filmStripFilmStripPagingTextRecipe } from "./filmStrip-filmStripPagingText/recipe";
import { filmStripFilmStripStretchItemsDescription } from "./filmStrip-filmStripStretchItems/description";
import { FilmStripFilmStripStretchItems } from "./filmStrip-filmStripStretchItems/filmStrip-filmStripStretchItems";
import { filmStripFilmStripStretchItemsRecipe } from "./filmStrip-filmStripStretchItems/recipe";
import { filmStripMasterDetailFilmStripDescription } from "./filmStrip-masterDetailFilmStrip/description";
import { FilmStripMasterDetailFilmStrip } from "./filmStrip-masterDetailFilmStrip/filmStrip-masterDetailFilmStrip";
import { filmStripMasterDetailFilmStripRecipe } from "./filmStrip-masterDetailFilmStrip/recipe";
import { filmStripVerticalFilmStripNavArrowsDescription } from "./filmStrip-verticalFilmStripNavArrows/description";
import { FilmStripVerticalFilmStripNavArrows } from "./filmStrip-verticalFilmStripNavArrows/filmStrip-verticalFilmStripNavArrows";
import { filmStripVerticalFilmStripNavArrowsRecipe } from "./filmStrip-verticalFilmStripNavArrows/recipe";
import { filmStripVerticalFilmStripNavDotsDescription } from "./filmStrip-verticalFilmStripNavDots/description";
import { FilmStripVerticalFilmStripNavDots } from "./filmStrip-verticalFilmStripNavDots/filmStrip-verticalFilmStripNavDots";
import { filmStripVerticalFilmStripNavDotsRecipe } from "./filmStrip-verticalFilmStripNavDots/recipe";

const filmStripLegacyItems = [
  {
    id: "nav-arrows",
    name: "Navigation Arrows",
    description: filmStripFilmStripNavArrowsDescription,
    recipe: filmStripFilmStripNavArrowsRecipe,
    Component: FilmStripFilmStripNavArrows,
  },
  {
    id: "vertical-nav-arrows",
    name: "Vertical with Navigation Arrows",
    description: filmStripVerticalFilmStripNavArrowsDescription,
    recipe: filmStripVerticalFilmStripNavArrowsRecipe,
    Component: FilmStripVerticalFilmStripNavArrows,
  },
  {
    id: "nav-dots",
    name: "Paging control",
    description: filmStripFilmStripNavDotsDescription,
    recipe: filmStripFilmStripNavDotsRecipe,
    Component: FilmStripFilmStripNavDots,
  },
  {
    id: "vertical-nav-dots",
    name: "Vertical with Paging control",
    description: filmStripVerticalFilmStripNavDotsDescription,
    recipe: filmStripVerticalFilmStripNavDotsRecipe,
    Component: FilmStripVerticalFilmStripNavDots,
  },
  {
    id: "overlaid-nav-dots",
    name: "Overlaid Paging control",
    description: filmStripFilmStripOverlaidNavDotsDescription,
    recipe: filmStripFilmStripOverlaidNavDotsRecipe,
    Component: FilmStripFilmStripOverlaidNavDots,
  },
  {
    id: "paging-text",
    name: "Display Paging Information",
    description: filmStripFilmStripPagingTextDescription,
    recipe: filmStripFilmStripPagingTextRecipe,
    Component: FilmStripFilmStripPagingText,
  },
  {
    id: "master-detail",
    name: "Master Detail",
    description: filmStripMasterDetailFilmStripDescription,
    recipe: filmStripMasterDetailFilmStripRecipe,
    Component: FilmStripMasterDetailFilmStrip,
  },
  {
    id: "lazy-rendering",
    name: "Lazy Rendering",
    description: filmStripFilmStripLazyRenderingDescription,
    recipe: filmStripFilmStripLazyRenderingRecipe,
    Component: FilmStripFilmStripLazyRendering,
  },
  {
    id: "deferred-rendering",
    name: "Deferred Rendering",
    description: filmStripFilmStripDeferredRenderingDescription,
    recipe: filmStripFilmStripDeferredRenderingRecipe,
    Component: FilmStripFilmStripDeferredRendering,
  },
  {
    id: "looping",
    name: "Looping",
    description: filmStripFilmStripLoopingDescription,
    recipe: filmStripFilmStripLoopingRecipe,
    Component: FilmStripFilmStripLooping,
  },
  {
    id: "stretch-items",
    name: "Stretching Items",
    description: filmStripFilmStripStretchItemsDescription,
    recipe: filmStripFilmStripStretchItemsRecipe,
    Component: FilmStripFilmStripStretchItems,
  },
   {
    id: "action-cards",
    name: "Action Cards",
    description: filmStripFilmStripActionCardsDescription,
    recipe: filmStripFilmStripActionCardsRecipe,
    Component: FilmStripFilmStripActionCards,
  }
];

export default function FilmStripLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Film Strip examples"
      componentType="oj-film-strip"
      items={filmStripLegacyItems}
      initialItemId="nav-arrows"
      navigationTitle="Film Strip"
    />
  );
}

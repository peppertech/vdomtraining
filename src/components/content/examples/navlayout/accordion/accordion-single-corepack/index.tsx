import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { AccordionItemSingleBasiccorepack } from "./accordionItemSingle-basiccorepack/accordionItemSingle-basiccorepack";
import { accordionItemSingleBasiccorepackDescription } from "./accordionItemSingle-basiccorepack/description";
import { accordionItemSingleBasiccorepackRecipe } from "./accordionItemSingle-basiccorepack/recipe";
import { AccordionItemSingleEventscorepack } from "./accordionItemSingle-eventscorepack/accordionItemSingle-eventscorepack";
import { accordionItemSingleEventscorepackDescription } from "./accordionItemSingle-eventscorepack/description";
import { accordionItemSingleEventscorepackRecipe } from "./accordionItemSingle-eventscorepack/recipe";

const accordionSingleCorePackItems = [
  {
    id: "basic",
    name: "Basic",
    description: accordionItemSingleBasiccorepackDescription,
    recipe: accordionItemSingleBasiccorepackRecipe,
    Component: AccordionItemSingleBasiccorepack,
  },
  {
    id: "events",
    name: "Events",
    description: accordionItemSingleEventscorepackDescription,
    recipe: accordionItemSingleEventscorepackRecipe,
    Component: AccordionItemSingleEventscorepack,
  },
];

export default function AccordionSingleCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Accordion Item Single examples"
      componentType="oj-c-accordion-item-single"
      packLabel="Core Pack"
      items={accordionSingleCorePackItems}
      initialItemId="basic"
      navigationTitle="Accordion Item Single"
    />
  );
}

import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { AccordionItemMultipleBasiccorepack } from "./accordionItemMultiple-basiccorepack/accordionItemMultiple-basiccorepack";
import { accordionItemMultipleBasiccorepackDescription } from "./accordionItemMultiple-basiccorepack/description";
import { accordionItemMultipleBasiccorepackRecipe } from "./accordionItemMultiple-basiccorepack/recipe";
import { AccordionItemMultipleEventscorepack } from "./accordionItemMultiple-eventscorepack/accordionItemMultiple-eventscorepack";
import { accordionItemMultipleEventscorepackDescription } from "./accordionItemMultiple-eventscorepack/description";
import { accordionItemMultipleEventscorepackRecipe } from "./accordionItemMultiple-eventscorepack/recipe";

const accordionMultipleCorePackItems = [
  {
    id: "basic",
    name: "Basic",
    description: accordionItemMultipleBasiccorepackDescription,
    recipe: accordionItemMultipleBasiccorepackRecipe,
    Component: AccordionItemMultipleBasiccorepack,
  },
  {
    id: "events",
    name: "Events",
    description: accordionItemMultipleEventscorepackDescription,
    recipe: accordionItemMultipleEventscorepackRecipe,
    Component: AccordionItemMultipleEventscorepack,
  },
];

export default function AccordionMultipleCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Accordion Item Multiple examples"
      componentType="oj-c-accordion-item-multiple"
      packLabel="Core Pack"
      items={accordionMultipleCorePackItems}
      initialItemId="basic"
      navigationTitle="Accordion Item Multiple"
    />
  );
}

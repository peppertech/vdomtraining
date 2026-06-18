import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { AccordionBasicAccordion } from "./accordion-basicAccordion/accordion-basicAccordion";
import { accordionBasicAccordionDescription } from "./accordion-basicAccordion/description";
import { accordionBasicAccordionRecipe } from "./accordion-basicAccordion/recipe";
import { AccordionEvents } from "./accordion-events/accordion-events";
import { accordionEventsDescription } from "./accordion-events/description";
import { accordionEventsRecipe } from "./accordion-events/recipe";
import { AccordionMultiExpandAccordion } from "./accordion-multiExpandAccordion/accordion-multiExpandAccordion";
import { accordionMultiExpandAccordionDescription } from "./accordion-multiExpandAccordion/description";
import { accordionMultiExpandAccordionRecipe } from "./accordion-multiExpandAccordion/recipe";

const accordionLegacyItems = [
  {
    id: "basic",
    name: "Basic",
    description: accordionBasicAccordionDescription,
    recipe: accordionBasicAccordionRecipe,
    Component: AccordionBasicAccordion,
  },
  {
    id: "multi-expand",
    name: "Multi Expansion",
    description: accordionMultiExpandAccordionDescription,
    recipe: accordionMultiExpandAccordionRecipe,
    Component: AccordionMultiExpandAccordion,
  },
  {
    id: "events",
    name: "Events",
    description: accordionEventsDescription,
    recipe: accordionEventsRecipe,
    Component: AccordionEvents,
  },
];

export default function AccordionLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Accordion examples"
      componentType="oj-accordion"
      items={accordionLegacyItems}
      initialItemId="basic"
      navigationTitle="Accordion"
    />
  );
}

import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import RichRadioSetBasicExample from "./richRadioSet-basic";
import {
  richRadioSetDocs,
  type RichRadioSetDemoId,
} from "./richRadioSet-docs";
import RichRadioSetLayoutExample from "./richRadioSet-layout";
import RichRadioSetOverviewExample from "./richRadioSet-overview";
import RichRadioSetUserAssistanceExample from "./richRadioSet-userAssistance";

const richRadioSetItems: {
  id: RichRadioSetDemoId;
  name: string;
  description: (typeof richRadioSetDocs)[RichRadioSetDemoId]["description"];
  recipe: (typeof richRadioSetDocs)[RichRadioSetDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: richRadioSetDocs.overview.description,
    recipe: richRadioSetDocs.overview.recipe,
    Component: RichRadioSetOverviewExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: richRadioSetDocs.basic.description,
    recipe: richRadioSetDocs.basic.recipe,
    Component: RichRadioSetBasicExample,
  },
  {
    id: "user-assistance",
    name: "User Assistance",
    description: richRadioSetDocs["user-assistance"].description,
    recipe: richRadioSetDocs["user-assistance"].recipe,
    Component: RichRadioSetUserAssistanceExample,
  },
  {
    id: "layout",
    name: "Layout and Media",
    description: richRadioSetDocs.layout.description,
    recipe: richRadioSetDocs.layout.recipe,
    Component: RichRadioSetLayoutExample,
  },
];

export default function RichRadioSetRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Rich Radioset examples"
      componentType="oj-c-rich-radioset"
      packLabel="Core Pack"
      layoutId="richRadioSetNavigationLayout"
      items={richRadioSetItems}
      initialItemId="overview"
    />
  );
}

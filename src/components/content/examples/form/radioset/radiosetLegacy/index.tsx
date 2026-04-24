import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import RadiosetBasicExample from "./radioset-basic";
import RadiosetDataProviderExample from "./radioset-dataProvider";
import {
  radiosetDocs,
  type RadiosetDemoId,
} from "./radioset-docs";
import RadiosetOverviewExample from "./radioset-overview";
import RadiosetReadonlyExample from "./radioset-readonly";
import RadiosetValidationExample from "./radioset-validation";

const radiosetItems: {
  id: RadiosetDemoId;
  name: string;
  description: (typeof radiosetDocs)[RadiosetDemoId]["description"];
  recipe: (typeof radiosetDocs)[RadiosetDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: radiosetDocs.overview.description,
    recipe: radiosetDocs.overview.recipe,
    Component: RadiosetOverviewExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: radiosetDocs.basic.description,
    recipe: radiosetDocs.basic.recipe,
    Component: RadiosetBasicExample,
  },
  {
    id: "readonly",
    name: "Readonly",
    description: radiosetDocs.readonly.description,
    recipe: radiosetDocs.readonly.recipe,
    Component: RadiosetReadonlyExample,
  },
  {
    id: "validation",
    name: "Validation",
    description: radiosetDocs.validation.description,
    recipe: radiosetDocs.validation.recipe,
    Component: RadiosetValidationExample,
  },
  {
    id: "data-provider",
    name: "Data Provider Options",
    description: radiosetDocs["data-provider"].description,
    recipe: radiosetDocs["data-provider"].recipe,
    Component: RadiosetDataProviderExample,
  },
];

export default function RadiosetRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Radioset examples"
      componentType="oj-radioset"
      layoutId="radiosetLegacyNavigationLayout"
      items={radiosetItems}
      initialItemId="overview"
    />
  );
}

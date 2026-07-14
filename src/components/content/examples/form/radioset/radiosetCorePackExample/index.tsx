import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import RadiosetCorePackBasicExample from "./radiosetCorePack-basic";
import RadiosetCorePackDataProviderExample from "./radiosetCorePack-dataProvider";
import RadiosetCorePackOverviewExample from "./radiosetCorePack-overview";
import RadiosetCorePackUserAssistanceExample from "./radiosetCorePack-userAssistance";
import RadiosetCorePackValidationExample from "./radiosetCorePack-validation";
import {
  radiosetCorePackDocs,
  type RadiosetCorePackDemoId,
} from "./radiosetCorePackExample-docs";

const radiosetCorePackItems: {
  id: RadiosetCorePackDemoId;
  name: string;
  description: (typeof radiosetCorePackDocs)[RadiosetCorePackDemoId]["description"];
  recipe: (typeof radiosetCorePackDocs)[RadiosetCorePackDemoId]["recipe"];
  Component: () => preact.JSX.Element;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: radiosetCorePackDocs.overview.description,
    recipe: radiosetCorePackDocs.overview.recipe,
    Component: RadiosetCorePackOverviewExample,
  },
  {
    id: "basic",
    name: "Basic",
    description: radiosetCorePackDocs.basic.description,
    recipe: radiosetCorePackDocs.basic.recipe,
    Component: RadiosetCorePackBasicExample,
  },
  {
    id: "user-assistance",
    name: "User Assistance",
    description: radiosetCorePackDocs["user-assistance"].description,
    recipe: radiosetCorePackDocs["user-assistance"].recipe,
    Component: RadiosetCorePackUserAssistanceExample,
  },
  {
    id: "validation",
    name: "Validation",
    description: radiosetCorePackDocs.validation.description,
    recipe: radiosetCorePackDocs.validation.recipe,
    Component: RadiosetCorePackValidationExample,
  },
  {
    id: "data-provider",
    name: "Using Data Provider",
    description: radiosetCorePackDocs["data-provider"].description,
    recipe: radiosetCorePackDocs["data-provider"].recipe,
    Component: RadiosetCorePackDataProviderExample,
  },
];

export default function RadiosetCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Radioset core pack examples"
      componentType="oj-c-radioset"
      packLabel="Core Pack"
      layoutId="radiosetCorePackNavigationLayout"
      items={radiosetCorePackItems}
      initialItemId="overview"
    />
  );
}

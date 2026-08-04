import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";
import RichRadioSetBasicExample from "./richRadioSet-basic";
import {
  richRadioSetDocs,
  type RichRadioSetDemoId,
} from "./richRadioSet-docs";
import RichRadioSetLayoutExample from "./richRadioSet-layout";
import RichRadioSetOverviewExample from "./richRadioSet-overview";
import RichRadioSetUserAssistanceExample from "./richRadioSet-userAssistance";
import richRadioSetBasicPlaygroundSource from "./richRadioSet-basic-source";
import richRadioSetLayoutPlaygroundSource from "./richRadioSet-layout-source";
import richRadioSetOverviewPlaygroundSource from "./richRadioSet-overview-source";
import richRadioSetUserAssistancePlaygroundSource from "./richRadioSet-userAssistance-source";
import {
  controlStateOptions,
  employeeOptions,
  extendedIndustryOptions,
  iconOptions,
  industryOptions,
  messageSets,
  noMediaOptions,
} from "./richRadioSet-shared";

const richRadioSetItems: {
  id: RichRadioSetDemoId;
  name: string;
  description: (typeof richRadioSetDocs)[RichRadioSetDemoId]["description"];
  recipe: (typeof richRadioSetDocs)[RichRadioSetDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "overview",
    name: "Overview",
    description: richRadioSetDocs.overview.description,
    recipe: richRadioSetDocs.overview.recipe,
    Component: RichRadioSetOverviewExample,
    playground: {
      initialSource: richRadioSetOverviewPlaygroundSource,
      fileName: "richRadioSet-overview.tsx",
      runtimeBindings: {
        extendedIndustryOptions,
        industryOptions,
        messageSets,
      },
    },
  },
  {
    id: "basic",
    name: "Basic",
    description: richRadioSetDocs.basic.description,
    recipe: richRadioSetDocs.basic.recipe,
    Component: RichRadioSetBasicExample,
    playground: {
      initialSource: richRadioSetBasicPlaygroundSource,
      fileName: "richRadioSet-basic.tsx",
      runtimeBindings: {
        extendedIndustryOptions,
      },
    },
  },
  {
    id: "user-assistance",
    name: "User Assistance",
    description: richRadioSetDocs["user-assistance"].description,
    recipe: richRadioSetDocs["user-assistance"].recipe,
    Component: RichRadioSetUserAssistanceExample,
    playground: {
      initialSource: richRadioSetUserAssistancePlaygroundSource,
      fileName: "richRadioSet-userAssistance.tsx",
      runtimeBindings: {
        controlStateOptions,
        employeeOptions,
      },
    },
  },
  {
    id: "layout",
    name: "Layout and Media",
    description: richRadioSetDocs.layout.description,
    recipe: richRadioSetDocs.layout.recipe,
    Component: RichRadioSetLayoutExample,
    playground: {
      initialSource: richRadioSetLayoutPlaygroundSource,
      fileName: "richRadioSet-layout.tsx",
      runtimeBindings: {
        employeeOptions,
        extendedIndustryOptions,
        iconOptions,
        noMediaOptions,
      },
    },
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

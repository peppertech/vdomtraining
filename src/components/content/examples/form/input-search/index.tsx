import "css!./input-search.css";
import * as preact from 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import type { PlaygroundConfig } from "../../../../shared/code-playground/tsx-playground";
import InputSearchBasicExample from "./input-search-basic";
import inputSearchBasicPlaygroundSource from "./input-search-basic-source";
import inputSearchCssPlaygroundSource from "./input-search-css-source";
import {
  inputSearchDocs,
  type InputSearchDemoId,
} from "./input-search-docs";
import InputSearchHeroExample from "./input-search-hero";
import inputSearchHeroPlaygroundSource from "./input-search-hero-source";
import InputSearchSuggestionItemTemplateExample from "./input-search-suggestionItemTemplate";
import inputSearchSuggestionItemTemplatePlaygroundSource from "./input-search-suggestionItemTemplate-source";
import InputSearchSuggestionItemTextExample from "./input-search-suggestionItemText";
import inputSearchSuggestionItemTextPlaygroundSource from "./input-search-suggestionItemText-source";
import InputSearchSuggestionsExample from "./input-search-suggestions";
import inputSearchSuggestionsPlaygroundSource from "./input-search-suggestions-source";
import {
  createBrowserSuggestionsDataProvider,
  createEmployeeLastNameDataProvider,
  createEmployeeTemplateDataProvider,
  DelayingDataProvider,
  InputSearchDiagnostics,
  renderEmployeeSuggestionItem,
  useInputSearchExampleState,
} from "./input-search-shared";

const inputSearchCssSupportingFiles = [{
  fileName: "input-search.css",
  initialSource: inputSearchCssPlaygroundSource,
  language: "css",
  importSpecifier: "css!./input-search.css",
}] satisfies NonNullable<PlaygroundConfig["supportingFiles"]>;

const inputSearchItems: {
  id: InputSearchDemoId;
  name: string;
  description: (typeof inputSearchDocs)[InputSearchDemoId]["description"];
  recipe: (typeof inputSearchDocs)[InputSearchDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "basic",
    name: "Basic",
    description: inputSearchDocs.basic.description,
    recipe: inputSearchDocs.basic.recipe,
    Component: InputSearchBasicExample,
    playground: {
      initialSource: inputSearchBasicPlaygroundSource,
      fileName: "input-search-basic.tsx",
      runtimeBindings: { InputSearchDiagnostics, useInputSearchExampleState },
      supportingFiles: inputSearchCssSupportingFiles,
    },
  },
  {
    id: "suggestions",
    name: "Suggestions",
    description: inputSearchDocs.suggestions.description,
    recipe: inputSearchDocs.suggestions.recipe,
    Component: InputSearchSuggestionsExample,
    playground: {
      initialSource: inputSearchSuggestionsPlaygroundSource,
      fileName: "input-search-suggestions.tsx",
      runtimeBindings: {
        createBrowserSuggestionsDataProvider,
        DelayingDataProvider,
        InputSearchDiagnostics,
        useInputSearchExampleState,
      },
      supportingFiles: inputSearchCssSupportingFiles,
    },
  },
  {
    id: "suggestion-item-text",
    name: "Suggestion Item Text",
    description: inputSearchDocs["suggestion-item-text"].description,
    recipe: inputSearchDocs["suggestion-item-text"].recipe,
    Component: InputSearchSuggestionItemTextExample,
    playground: {
      initialSource: inputSearchSuggestionItemTextPlaygroundSource,
      fileName: "input-search-suggestionItemText.tsx",
      runtimeBindings: {
        createEmployeeLastNameDataProvider,
        InputSearchDiagnostics,
        useInputSearchExampleState,
      },
      supportingFiles: inputSearchCssSupportingFiles,
    },
  },
  {
    id: "suggestion-item-template",
    name: "Suggestion Item Template",
    description: inputSearchDocs["suggestion-item-template"].description,
    recipe: inputSearchDocs["suggestion-item-template"].recipe,
    Component: InputSearchSuggestionItemTemplateExample,
    playground: {
      initialSource: inputSearchSuggestionItemTemplatePlaygroundSource,
      fileName: "input-search-suggestionItemTemplate.tsx",
      runtimeBindings: {
        createEmployeeTemplateDataProvider,
        InputSearchDiagnostics,
        renderEmployeeSuggestionItem,
        useInputSearchExampleState,
      },
      supportingFiles: inputSearchCssSupportingFiles,
    },
  },
  {
    id: "hero",
    name: "Hero",
    description: inputSearchDocs.hero.description,
    recipe: inputSearchDocs.hero.recipe,
    Component: InputSearchHeroExample,
    playground: {
      initialSource: inputSearchHeroPlaygroundSource,
      fileName: "input-search-hero.tsx",
      runtimeBindings: { createBrowserSuggestionsDataProvider },
      supportingFiles: inputSearchCssSupportingFiles,
    },
  },
];

export default function InputSearchRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Search examples"
      componentType="oj-input-search"
      layoutId="inputSearchNavigationLayout"
      items={inputSearchItems}
      initialItemId="basic"
      navigationTitle="Input Search"
    />
  );
}

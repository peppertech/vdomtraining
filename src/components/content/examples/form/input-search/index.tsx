import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import InputSearchBasicExample from "./input-search-basic";
import {
  inputSearchDocs,
  type InputSearchDemoId,
} from "./input-search-docs";
import InputSearchHeroExample from "./input-search-hero";
import InputSearchSuggestionItemTemplateExample from "./input-search-suggestionItemTemplate";
import InputSearchSuggestionItemTextExample from "./input-search-suggestionItemText";
import InputSearchSuggestionsExample from "./input-search-suggestions";
import "css!./input-search.css";

const inputSearchItems: {
  id: InputSearchDemoId;
  name: string;
  description: (typeof inputSearchDocs)[InputSearchDemoId]["description"];
  recipe: (typeof inputSearchDocs)[InputSearchDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "basic",
    name: "Basic",
    description: inputSearchDocs.basic.description,
    recipe: inputSearchDocs.basic.recipe,
    Component: InputSearchBasicExample,
  },
  {
    id: "suggestions",
    name: "Suggestions",
    description: inputSearchDocs.suggestions.description,
    recipe: inputSearchDocs.suggestions.recipe,
    Component: InputSearchSuggestionsExample,
  },
  {
    id: "suggestion-item-text",
    name: "Suggestion Item Text",
    description: inputSearchDocs["suggestion-item-text"].description,
    recipe: inputSearchDocs["suggestion-item-text"].recipe,
    Component: InputSearchSuggestionItemTextExample,
  },
  {
    id: "suggestion-item-template",
    name: "Suggestion Item Template",
    description: inputSearchDocs["suggestion-item-template"].description,
    recipe: inputSearchDocs["suggestion-item-template"].recipe,
    Component: InputSearchSuggestionItemTemplateExample,
  },
  {
    id: "hero",
    name: "Hero",
    description: inputSearchDocs.hero.description,
    recipe: inputSearchDocs.hero.recipe,
    Component: InputSearchHeroExample,
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

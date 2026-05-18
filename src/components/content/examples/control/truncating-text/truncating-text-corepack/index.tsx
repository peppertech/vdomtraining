import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { TruncatingTextHyphenscorepack } from "./truncatingText-hyphenscorepack/truncatingText-hyphenscorepack";
import { truncatingTextHyphenscorepackDescription } from "./truncatingText-hyphenscorepack/description";
import { truncatingTextHyphenscorepackRecipe } from "./truncatingText-hyphenscorepack/recipe";
import { TruncatingTextOverflowWrapcorepack } from "./truncatingText-overflowWrapcorepack/truncatingText-overflowWrapcorepack";
import { truncatingTextOverflowWrapcorepackDescription } from "./truncatingText-overflowWrapcorepack/description";
import { truncatingTextOverflowWrapcorepackRecipe } from "./truncatingText-overflowWrapcorepack/recipe";
import { TruncatingTextTextColorscorepack } from "./truncatingText-textColorscorepack/truncatingText-textColorscorepack";
import { truncatingTextTextColorscorepackDescription } from "./truncatingText-textColorscorepack/description";
import { truncatingTextTextColorscorepackRecipe } from "./truncatingText-textColorscorepack/recipe";
import { TruncatingTextTextSizescorepack } from "./truncatingText-textSizescorepack/truncatingText-textSizescorepack";
import { truncatingTextTextSizescorepackDescription } from "./truncatingText-textSizescorepack/description";
import { truncatingTextTextSizescorepackRecipe } from "./truncatingText-textSizescorepack/recipe";
import { TruncatingTextTruncationAndLineClampcorepack } from "./truncatingText-truncationAndLineClampcorepack/truncatingText-truncationAndLineClampcorepack";
import { truncatingTextTruncationAndLineClampcorepackDescription } from "./truncatingText-truncationAndLineClampcorepack/description";
import { truncatingTextTruncationAndLineClampcorepackRecipe } from "./truncatingText-truncationAndLineClampcorepack/recipe";

const truncatingTextCorePackItems = [
  {
    id: "truncation-and-line-clamp",
    name: "Truncation and Line Clamp",
    description: truncatingTextTruncationAndLineClampcorepackDescription,
    recipe: truncatingTextTruncationAndLineClampcorepackRecipe,
    Component: TruncatingTextTruncationAndLineClampcorepack,
  },
  {
    id: "text-colors",
    name: "Text Colors",
    description: truncatingTextTextColorscorepackDescription,
    recipe: truncatingTextTextColorscorepackRecipe,
    Component: TruncatingTextTextColorscorepack,
  },
   {
    id: "text-sizes",
    name: "Text Sizes",
    description: truncatingTextTextSizescorepackDescription,
    recipe: truncatingTextTextSizescorepackRecipe,
    Component: TruncatingTextTextSizescorepack,
  },
  {
    id: "hyphens",
    name: "Hyphens",
    description: truncatingTextHyphenscorepackDescription,
    recipe: truncatingTextHyphenscorepackRecipe,
    Component: TruncatingTextHyphenscorepack,
  },
  {
    id: "overflow-wrap",
    name: "Overflow Wrap",
    description: truncatingTextOverflowWrapcorepackDescription,
    recipe: truncatingTextOverflowWrapcorepackRecipe,
    Component: TruncatingTextOverflowWrapcorepack,
  }
];

export default function TruncatingTextCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Truncating Text Core Pack examples"
      componentType="oj-c-truncating-text"
      packLabel="Core Pack"
      items={truncatingTextCorePackItems}
      initialItemId="hyphens"
      navigationTitle="Truncating Text"
    />
  );
}

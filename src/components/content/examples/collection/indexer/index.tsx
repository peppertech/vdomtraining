import { h } from "preact";
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { IndexerCharacterIndexer } from "./indexer-characterIndexer/indexer-characterIndexer";
import { indexerCharacterIndexerDescription } from "./indexer-characterIndexer/description";
import { indexerCharacterIndexerRecipe } from "./indexer-characterIndexer/recipe";

const indexerItems = [
  {
    id: "character-indexer",
    name: "Indexer",
    description: indexerCharacterIndexerDescription,
    recipe: indexerCharacterIndexerRecipe,
    Component: IndexerCharacterIndexer,
  },
];

export default function IndexerRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Indexer examples"
      componentType="oj-indexer"
      items={indexerItems}
      initialItemId="character-indexer"
      navigationTitle="Indexer"
    />
  );
}

import 'preact';
import { RecipePageTemplate } from "../../../../shared/demo-page-layout/recipe-page-template";
import { indexerCharacterIndexerDescription } from "./indexer-characterIndexer/description";
import { IndexerCharacterIndexer } from "./indexer-characterIndexer/indexer-characterIndexer";
import { indexerCharacterIndexerRecipe } from "./indexer-characterIndexer/recipe";

const indexerItems = [
  {
    id: "basic",
    name: "Basic",
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
      initialItemId="basic"
      navigationTitle="Indexer"
      showNavigationForSingleItem
    />
  );
}

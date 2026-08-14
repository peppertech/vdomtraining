import 'preact';
import IndexerModelTreeDataProvider = require("ojs/ojindexermodeltreedataprovider");
import { RecipePageTemplate, type RecipePageItem } from "../../../../shared/demo-page-layout/recipe-page-template";
import indexerCharacterIndexerContactsSource from "./indexer-characterIndexer/contacts-source";
import indexerCharacterIndexerDemoSource from "./indexer-characterIndexer/demo-source";
import { indexerCharacterIndexerDescription } from "./indexer-characterIndexer/description";
import IndexerCharacterIndexer from "./indexer-characterIndexer/indexer-characterIndexer";
import indexerCharacterIndexerSource from "./indexer-characterIndexer/indexer-characterIndexer-source";
import { indexerCharacterIndexerRecipe } from "./indexer-characterIndexer/recipe";

const indexerItems: RecipePageItem[] = [
  {
    id: "basic",
    name: "Basic",
    description: indexerCharacterIndexerDescription,
    recipe: indexerCharacterIndexerRecipe,
    Component: IndexerCharacterIndexer,
    playground: {
      initialSource: indexerCharacterIndexerSource,
      fileName: "indexer-characterIndexer.tsx",
      runtimeBindings: { IndexerModelTreeDataProvider },
      supportingFiles: [
        {
          fileName: "contacts.json",
          initialSource: indexerCharacterIndexerContactsSource,
          language: "json",
          importSpecifier: "text!./contacts.json",
          bindingName: "contactsText",
        },
        {
          fileName: "demo.css",
          initialSource: indexerCharacterIndexerDemoSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
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

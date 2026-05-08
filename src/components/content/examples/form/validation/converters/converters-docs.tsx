import type { ComponentChildren } from "preact";
import { convertersBigDecimalConverterDescription } from "./converters-bigDecimalConverter/description";
import { convertersBigDecimalConverterRecipe } from "./converters-bigDecimalConverter/recipe";
import { convertersColorConvertersDescription } from "./converters-colorConverters/description";
import { convertersColorConvertersRecipe } from "./converters-colorConverters/recipe";
import { convertersConverterFactoryDescription } from "./converters-converterFactory/description";
import { convertersConverterFactoryRecipe } from "./converters-converterFactory/recipe";
import { convertersDateTimeConverterDescription } from "./converters-dateTimeConverter/description";
import { convertersDateTimeConverterRecipe } from "./converters-dateTimeConverter/recipe";
import { convertersDefaultConverterMessagesDescription } from "./converters-defaultConverterMessages/description";
import { convertersDefaultConverterMessagesRecipe } from "./converters-defaultConverterMessages/recipe";
import { convertersNativeNumberConverterDescription } from "./converters-nativeNumberConverter/description";
import { convertersNativeNumberConverterRecipe } from "./converters-nativeNumberConverter/recipe";
import { convertersNumberConverterDescription } from "./converters-numberConverter/description";
import { convertersNumberConverterRecipe } from "./converters-numberConverter/recipe";

export type ConvertersDemoId =
  | "native-number-converter"
  | "number-converter"
  | "big-decimal-converter"
  | "date-time-converter"
  | "color-converters"
  | "converter-factory"
  | "default-converter-messages";

type DocsEntry = {
  description: ComponentChildren;
  recipe: ComponentChildren;
};

export const convertersDocs: Record<ConvertersDemoId, DocsEntry> = {
  "native-number-converter": {
    description: convertersNativeNumberConverterDescription,
    recipe: convertersNativeNumberConverterRecipe,
  },
  "number-converter": {
    description: convertersNumberConverterDescription,
    recipe: convertersNumberConverterRecipe,
  },
  "big-decimal-converter": {
    description: convertersBigDecimalConverterDescription,
    recipe: convertersBigDecimalConverterRecipe,
  },
  "date-time-converter": {
    description: convertersDateTimeConverterDescription,
    recipe: convertersDateTimeConverterRecipe,
  },
  "color-converters": {
    description: convertersColorConvertersDescription,
    recipe: convertersColorConvertersRecipe,
  },
  "converter-factory": {
    description: convertersConverterFactoryDescription,
    recipe: convertersConverterFactoryRecipe,
  },
  "default-converter-messages": {
    description: convertersDefaultConverterMessagesDescription,
    recipe: convertersDefaultConverterMessagesRecipe,
  },
};

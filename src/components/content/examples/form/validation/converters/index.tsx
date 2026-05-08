import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import ConvertersBigDecimalConverterExample from "./converters-bigDecimalConverter/converters-bigDecimalConverter";
import ConvertersColorConvertersExample from "./converters-colorConverters/converters-colorConverters";
import ConvertersConverterFactoryExample from "./converters-converterFactory/converters-converterFactory";
import ConvertersDateTimeConverterExample from "./converters-dateTimeConverter/converters-dateTimeConverter";
import ConvertersDefaultConverterMessagesExample from "./converters-defaultConverterMessages/converters-defaultConverterMessages";
import ConvertersNativeNumberConverterExample from "./converters-nativeNumberConverter/converters-nativeNumberConverter";
import ConvertersNumberConverterExample from "./converters-numberConverter/converters-numberConverter";
import { convertersDocs, type ConvertersDemoId } from "./converters-docs";

const convertersItems: {
  id: ConvertersDemoId;
  name: string;
  description: (typeof convertersDocs)[ConvertersDemoId]["description"];
  recipe: (typeof convertersDocs)[ConvertersDemoId]["recipe"];
  Component: () => h.JSX.Element;
}[] = [
  {
    id: "date-time-converter",
    name: "DateTime Converter",
    description: convertersDocs["date-time-converter"].description,
    recipe: convertersDocs["date-time-converter"].recipe,
    Component: ConvertersDateTimeConverterExample,
  },
  {
    id: "number-converter",
    name: "Number Converter",
    description: convertersDocs["number-converter"].description,
    recipe: convertersDocs["number-converter"].recipe,
    Component: ConvertersNumberConverterExample,
  },
  {
    id: "native-number-converter",
    name: "Native Number Converter",
    description: convertersDocs["native-number-converter"].description,
    recipe: convertersDocs["native-number-converter"].recipe,
    Component: ConvertersNativeNumberConverterExample,
  },
  
  {
    id: "big-decimal-converter",
    name: "Big Decimal Converter",
    description: convertersDocs["big-decimal-converter"].description,
    recipe: convertersDocs["big-decimal-converter"].recipe,
    Component: ConvertersBigDecimalConverterExample,
  },
  {
    id: "converter-factory",
    name: "Create Converter",
    description: convertersDocs["converter-factory"].description,
    recipe: convertersDocs["converter-factory"].recipe,
    Component: ConvertersConverterFactoryExample,
  },
  {
    id: "color-converters",
    name: "Color Converters",
    description: convertersDocs["color-converters"].description,
    recipe: convertersDocs["color-converters"].recipe,
    Component: ConvertersColorConvertersExample,
  },
  {
    id: "default-converter-messages",
    name: "Default Converter Messages",
    description: convertersDocs["default-converter-messages"].description,
    recipe: convertersDocs["default-converter-messages"].recipe,
    Component: ConvertersDefaultConverterMessagesExample,
  },
];

export default function ConvertersRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Converters examples"
      componentType="Converters"
      layoutId="convertersNavigationLayout"
      items={convertersItems}
      initialItemId="native-number-converter"
    />
  );
}

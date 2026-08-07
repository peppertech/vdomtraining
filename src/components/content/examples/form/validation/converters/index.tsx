import * as preact from 'preact';
import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import { BigDecimalStringConverter, NumberConverter } from "ojs/ojconverter-nativenumber";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import Color = require("ojs/ojcolor");
import ColorConverter = require("ojs/ojconverter-color");
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import ConvertersBigDecimalConverterExample from "./converters-bigDecimalConverter/converters-bigDecimalConverter";
import convertersBigDecimalConverterPlaygroundSource from "./converters-bigDecimalConverter/converters-bigDecimalConverter-source";
import ConvertersColorConvertersExample from "./converters-colorConverters/converters-colorConverters";
import convertersColorConvertersPlaygroundSource from "./converters-colorConverters/converters-colorConverters-source";
import convertersColorConvertersCssSource from "./converters-colorConverters/demo-source";
import ConvertersConverterFactoryExample from "./converters-converterFactory/converters-converterFactory";
import convertersConverterFactoryPlaygroundSource from "./converters-converterFactory/converters-converterFactory-source";
import ConvertersDateTimeConverterExample from "./converters-dateTimeConverter/converters-dateTimeConverter";
import convertersDateTimeConverterPlaygroundSource from "./converters-dateTimeConverter/converters-dateTimeConverter-source";
import ConvertersDefaultConverterMessagesExample from "./converters-defaultConverterMessages/converters-defaultConverterMessages";
import convertersDefaultConverterMessagesPlaygroundSource from "./converters-defaultConverterMessages/converters-defaultConverterMessages-source";
import { convertersDocs,type ConvertersDemoId } from "./converters-docs";
import ConvertersNativeNumberConverterExample from "./converters-nativeNumberConverter/converters-nativeNumberConverter";
import convertersNativeNumberConverterPlaygroundSource from "./converters-nativeNumberConverter/converters-nativeNumberConverter-source";
import ConvertersNumberConverterExample from "./converters-numberConverter/converters-numberConverter";
import convertersNumberConverterPlaygroundSource from "./converters-numberConverter/converters-numberConverter-source";
import type { PlaygroundConfig } from "../../../../../shared/code-playground/tsx-playground";

const convertersItems: {
  id: ConvertersDemoId;
  name: string;
  description: (typeof convertersDocs)[ConvertersDemoId]["description"];
  recipe: (typeof convertersDocs)[ConvertersDemoId]["recipe"];
  Component: () => preact.JSX.Element;
  playground?: PlaygroundConfig;
}[] = [
  {
    id: "date-time-converter",
    name: "DateTime Converter",
    description: convertersDocs["date-time-converter"].description,
    recipe: convertersDocs["date-time-converter"].recipe,
    Component: ConvertersDateTimeConverterExample,
    playground: {
      initialSource: convertersDateTimeConverterPlaygroundSource,
      fileName: "converters-dateTimeConverter.tsx",
      runtimeBindings: { IntlDateTimeConverter, IntlConverterUtils },
    },
  },
  {
    id: "number-converter",
    name: "Number Converter",
    description: convertersDocs["number-converter"].description,
    recipe: convertersDocs["number-converter"].recipe,
    Component: ConvertersNumberConverterExample,
    playground: {
      initialSource: convertersNumberConverterPlaygroundSource,
      fileName: "converters-numberConverter.tsx",
      runtimeBindings: { IntlNumberConverter },
    },
  },
  {
    id: "native-number-converter",
    name: "Native Number Converter",
    description: convertersDocs["native-number-converter"].description,
    recipe: convertersDocs["native-number-converter"].recipe,
    Component: ConvertersNativeNumberConverterExample,
    playground: {
      initialSource: convertersNativeNumberConverterPlaygroundSource,
      fileName: "converters-nativeNumberConverter.tsx",
      runtimeBindings: { NumberConverter },
    },
  },
  
  {
    id: "big-decimal-converter",
    name: "Big Decimal Converter",
    description: convertersDocs["big-decimal-converter"].description,
    recipe: convertersDocs["big-decimal-converter"].recipe,
    Component: ConvertersBigDecimalConverterExample,
    playground: {
      initialSource: convertersBigDecimalConverterPlaygroundSource,
      fileName: "converters-bigDecimalConverter.tsx",
      runtimeBindings: { BigDecimalStringConverter },
    },
  },
  {
    id: "converter-factory",
    name: "Create Converter",
    description: convertersDocs["converter-factory"].description,
    recipe: convertersDocs["converter-factory"].recipe,
    Component: ConvertersConverterFactoryExample,
    playground: {
      initialSource: convertersConverterFactoryPlaygroundSource,
      fileName: "converters-converterFactory.tsx",
      runtimeBindings: { IntlDateTimeConverter, IntlNumberConverter },
    },
  },
  {
    id: "color-converters",
    name: "Color Converters",
    description: convertersDocs["color-converters"].description,
    recipe: convertersDocs["color-converters"].recipe,
    Component: ConvertersColorConvertersExample,
    playground: {
      initialSource: convertersColorConvertersPlaygroundSource,
      fileName: "converters-colorConverters.tsx",
      runtimeBindings: { Color, ColorConverter },
      supportingFiles: [
        {
          fileName: "demo.css",
          initialSource: convertersColorConvertersCssSource,
          language: "css",
          importSpecifier: "css!./demo.css",
        },
      ],
    },
  },
  {
    id: "default-converter-messages",
    name: "Default Converter Messages",
    description: convertersDocs["default-converter-messages"].description,
    recipe: convertersDocs["default-converter-messages"].recipe,
    Component: ConvertersDefaultConverterMessagesExample,
    playground: {
      initialSource: convertersDefaultConverterMessagesPlaygroundSource,
      fileName: "converters-defaultConverterMessages.tsx",
      runtimeBindings: { IntlNumberConverter, ColorConverter },
    },
  },
];

export default function ConvertersRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Converters examples"
      componentType="Converters"
      layoutId="convertersNavigationLayout"
      items={convertersItems}
      initialItemId="date-time-converter"
    />
  );
}

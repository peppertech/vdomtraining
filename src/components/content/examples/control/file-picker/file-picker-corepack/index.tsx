import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { FilePickerButtoncorepack } from "./filePicker-buttoncorepack/filePicker-buttoncorepack";
import { filePickerButtoncorepackDescription } from "./filePicker-buttoncorepack/description";
import { filePickerButtoncorepackRecipe } from "./filePicker-buttoncorepack/recipe";
import { FilePickerCapturecorepack } from "./filePicker-capturecorepack/filePicker-capturecorepack";
import { filePickerCapturecorepackDescription } from "./filePicker-capturecorepack/description";
import { filePickerCapturecorepackRecipe } from "./filePicker-capturecorepack/recipe";
import { FilePickerCustomContentcorepack } from "./filePicker-customContentcorepack/filePicker-customContentcorepack";
import { filePickerCustomContentcorepackDescription } from "./filePicker-customContentcorepack/description";
import { filePickerCustomContentcorepackRecipe } from "./filePicker-customContentcorepack/recipe";
import { FilePickerCustomSizecorepack } from "./filePicker-customSizecorepack/filePicker-customSizecorepack";
import { filePickerCustomSizecorepackDescription } from "./filePicker-customSizecorepack/description";
import { filePickerCustomSizecorepackRecipe } from "./filePicker-customSizecorepack/recipe";
import { FilePickerCustomTextcorepack } from "./filePicker-customTextcorepack/filePicker-customTextcorepack";
import { filePickerCustomTextcorepackDescription } from "./filePicker-customTextcorepack/description";
import { filePickerCustomTextcorepackRecipe } from "./filePicker-customTextcorepack/recipe";
import { FilePickerRestrictFileSizecorepack } from "./filePicker-restrictFileSizecorepack/filePicker-restrictFileSizecorepack";
import { filePickerRestrictFileSizecorepackDescription } from "./filePicker-restrictFileSizecorepack/description";
import { filePickerRestrictFileSizecorepackRecipe } from "./filePicker-restrictFileSizecorepack/recipe";
import { FilePickerRestrictFileTypescorepack } from "./filePicker-restrictFileTypescorepack/filePicker-restrictFileTypescorepack";
import { filePickerRestrictFileTypescorepackDescription } from "./filePicker-restrictFileTypescorepack/description";
import { filePickerRestrictFileTypescorepackRecipe } from "./filePicker-restrictFileTypescorepack/recipe";

const filePickerCorePackItems = [
  {
    id: "button",
    name: "Button",
    description: filePickerButtoncorepackDescription,
    recipe: filePickerButtoncorepackRecipe,
    Component: FilePickerButtoncorepack,
  },
  {
    id: "capture",
    name: "Capture",
    description: filePickerCapturecorepackDescription,
    recipe: filePickerCapturecorepackRecipe,
    Component: FilePickerCapturecorepack,
  },
  {
    id: "custom-content",
    name: "Custom Content",
    description: filePickerCustomContentcorepackDescription,
    recipe: filePickerCustomContentcorepackRecipe,
    Component: FilePickerCustomContentcorepack,
  },
  {
    id: "custom-size",
    name: "Custom Size",
    description: filePickerCustomSizecorepackDescription,
    recipe: filePickerCustomSizecorepackRecipe,
    Component: FilePickerCustomSizecorepack,
  },
  {
    id: "custom-text",
    name: "Custom Text",
    description: filePickerCustomTextcorepackDescription,
    recipe: filePickerCustomTextcorepackRecipe,
    Component: FilePickerCustomTextcorepack,
  },
  {
    id: "restrict-file-size",
    name: "Restrict File Size",
    description: filePickerRestrictFileSizecorepackDescription,
    recipe: filePickerRestrictFileSizecorepackRecipe,
    Component: FilePickerRestrictFileSizecorepack,
  },
  {
    id: "restrict-file-types",
    name: "Restrict File Types",
    description: filePickerRestrictFileTypescorepackDescription,
    recipe: filePickerRestrictFileTypescorepackRecipe,
    Component: FilePickerRestrictFileTypescorepack,
  },
];

export default function FilePickerCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="File Picker Core Pack examples"
      componentType="oj-c-file-picker"
      packLabel="Core Pack"
      items={filePickerCorePackItems}
      initialItemId="button"
      navigationTitle="File Picker"
    />
  );
}

import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { filePickerButtoncorepackDescription } from "./filePicker-buttoncorepack/description";
import { FilePickerButtoncorepack } from "./filePicker-buttoncorepack/filePicker-buttoncorepack";
import { filePickerButtoncorepackRecipe } from "./filePicker-buttoncorepack/recipe";
import { filePickerCapturecorepackDescription } from "./filePicker-capturecorepack/description";
import { FilePickerCapturecorepack } from "./filePicker-capturecorepack/filePicker-capturecorepack";
import { filePickerCapturecorepackRecipe } from "./filePicker-capturecorepack/recipe";
import { filePickerCustomContentcorepackDescription } from "./filePicker-customContentcorepack/description";
import { FilePickerCustomContentcorepack } from "./filePicker-customContentcorepack/filePicker-customContentcorepack";
import { filePickerCustomContentcorepackRecipe } from "./filePicker-customContentcorepack/recipe";
import { filePickerCustomSizecorepackDescription } from "./filePicker-customSizecorepack/description";
import { FilePickerCustomSizecorepack } from "./filePicker-customSizecorepack/filePicker-customSizecorepack";
import { filePickerCustomSizecorepackRecipe } from "./filePicker-customSizecorepack/recipe";
import { filePickerCustomTextcorepackDescription } from "./filePicker-customTextcorepack/description";
import { FilePickerCustomTextcorepack } from "./filePicker-customTextcorepack/filePicker-customTextcorepack";
import { filePickerCustomTextcorepackRecipe } from "./filePicker-customTextcorepack/recipe";
import { filePickerRestrictFileSizecorepackDescription } from "./filePicker-restrictFileSizecorepack/description";
import { FilePickerRestrictFileSizecorepack } from "./filePicker-restrictFileSizecorepack/filePicker-restrictFileSizecorepack";
import { filePickerRestrictFileSizecorepackRecipe } from "./filePicker-restrictFileSizecorepack/recipe";
import { filePickerRestrictFileTypescorepackDescription } from "./filePicker-restrictFileTypescorepack/description";
import { FilePickerRestrictFileTypescorepack } from "./filePicker-restrictFileTypescorepack/filePicker-restrictFileTypescorepack";
import { filePickerRestrictFileTypescorepackRecipe } from "./filePicker-restrictFileTypescorepack/recipe";

const filePickerCorePackItems = [
    {
    id: "restrict-file-types",
    name: "Restrict File Types",
    description: filePickerRestrictFileTypescorepackDescription,
    recipe: filePickerRestrictFileTypescorepackRecipe,
    Component: FilePickerRestrictFileTypescorepack,
  },
  {
    id: "restrict-file-size",
    name: "Restrict File Size",
    description: filePickerRestrictFileSizecorepackDescription,
    recipe: filePickerRestrictFileSizecorepackRecipe,
    Component: FilePickerRestrictFileSizecorepack,
  },
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
    id: "custom-content",
    name: "Custom Content",
    description: filePickerCustomContentcorepackDescription,
    recipe: filePickerCustomContentcorepackRecipe,
    Component: FilePickerCustomContentcorepack,
  }
];

export default function FilePickerCorePackRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="File Picker Core Pack examples"
      componentType="oj-c-file-picker"
      packLabel="Core Pack"
      items={filePickerCorePackItems}
      initialItemId="restrict-file-types"
      navigationTitle="File Picker"
    />
  );
}

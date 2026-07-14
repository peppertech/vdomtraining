import 'preact';
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { filePickerBasicDescription } from "./filePicker-basic/description";
import { FilePickerBasic } from "./filePicker-basic/filePicker-basic";
import { filePickerBasicRecipe } from "./filePicker-basic/recipe";
import { filePickerButtonDescription } from "./filePicker-button/description";
import { FilePickerButton } from "./filePicker-button/filePicker-button";
import { filePickerButtonRecipe } from "./filePicker-button/recipe";
import { filePickerCaptureDescription } from "./filePicker-capture/description";
import { FilePickerCapture } from "./filePicker-capture/filePicker-capture";
import { filePickerCaptureRecipe } from "./filePicker-capture/recipe";
import { filePickerCustomDescription } from "./filePicker-custom/description";
import { FilePickerCustom } from "./filePicker-custom/filePicker-custom";
import { filePickerCustomRecipe } from "./filePicker-custom/recipe";
import { filePickerCustomTextDescription } from "./filePicker-customText/description";
import { FilePickerCustomText } from "./filePicker-customText/filePicker-customText";
import { filePickerCustomTextRecipe } from "./filePicker-customText/recipe";
import { filePickerSizeDescription } from "./filePicker-size/description";
import { FilePickerSize } from "./filePicker-size/filePicker-size";
import { filePickerSizeRecipe } from "./filePicker-size/recipe";

const filePickerLegacyItems = [
  {
    id: "basic",
    name: "Basic",
    description: filePickerBasicDescription,
    recipe: filePickerBasicRecipe,
    Component: FilePickerBasic,
  },
  {
    id: "custom",
    name: "Custom Validation",
    description: filePickerCustomDescription,
    recipe: filePickerCustomRecipe,
    Component: FilePickerCustom,
  },
  {
    id: "button",
    name: "Button",
    description: filePickerButtonDescription,
    recipe: filePickerButtonRecipe,
    Component: FilePickerButton,
  },
  {
    id: "capture",
    name: "Capture",
    description: filePickerCaptureDescription,
    recipe: filePickerCaptureRecipe,
    Component: FilePickerCapture,
  },
  {
    id: "size",
    name: "Custom Size",
    description: filePickerSizeDescription,
    recipe: filePickerSizeRecipe,
    Component: FilePickerSize,
  },
  {
    id: "custom-text",
    name: "Custom Text",
    description: filePickerCustomTextDescription,
    recipe: filePickerCustomTextRecipe,
    Component: FilePickerCustomText,
  },
];

export default function FilePickerLegacyRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="File Picker examples"
      componentType="oj-file-picker"
      items={filePickerLegacyItems}
      initialItemId="basic"
      navigationTitle="File Picker"
    />
  );
}

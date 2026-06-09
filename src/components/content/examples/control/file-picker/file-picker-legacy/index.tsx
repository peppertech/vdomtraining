import { h } from "preact";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";
import { FilePickerBasic } from "./filePicker-basic/filePicker-basic";
import { filePickerBasicDescription } from "./filePicker-basic/description";
import { filePickerBasicRecipe } from "./filePicker-basic/recipe";
import { FilePickerButton } from "./filePicker-button/filePicker-button";
import { filePickerButtonDescription } from "./filePicker-button/description";
import { filePickerButtonRecipe } from "./filePicker-button/recipe";
import { FilePickerCapture } from "./filePicker-capture/filePicker-capture";
import { filePickerCaptureDescription } from "./filePicker-capture/description";
import { filePickerCaptureRecipe } from "./filePicker-capture/recipe";
import { FilePickerCustom } from "./filePicker-custom/filePicker-custom";
import { filePickerCustomDescription } from "./filePicker-custom/description";
import { filePickerCustomRecipe } from "./filePicker-custom/recipe";
import { FilePickerCustomText } from "./filePicker-customText/filePicker-customText";
import { filePickerCustomTextDescription } from "./filePicker-customText/description";
import { filePickerCustomTextRecipe } from "./filePicker-customText/recipe";
import { FilePickerSize } from "./filePicker-size/filePicker-size";
import { filePickerSizeDescription } from "./filePicker-size/description";
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

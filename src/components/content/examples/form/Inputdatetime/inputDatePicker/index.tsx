import { h } from "preact";
import InputDatePicker from "./inputDatePicker";
import {
  inputDatePickerDescription,
  inputDatePickerRecipe,
} from "./inputDatePicker-docs";
import { RecipePageTemplate } from "../../../../../shared/demo-page-layout/recipe-page-template";

export default function InputDatePickerRecipePage() {
  return (
    <RecipePageTemplate
      ariaLabel="Input Date Picker examples"
      componentType="oj-date-picker"
      packLabel="Core Pack"
      items={[
        {
          id: "overview",
          name: "Overview",
          description: inputDatePickerDescription,
          recipe: inputDatePickerRecipe,
          Component: InputDatePicker,
        },
      ]}
    />
  );
}

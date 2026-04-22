import { h } from "preact";

export const inputDatePickerDescription = (
  <>
    <p>
      This recipe presents the date picker example in the recipe layout with a
      compact description, live demo, and implementation notes.
    </p>
    <p>
      It takes cues from the cookbook date picker examples for simple
      selection, restricted ranges, week display, and day customization.
    </p>
  </>
);

export const inputDatePickerRecipe = (
  <ol>
    <li>Add a date picker component to the page.</li>
    <li>
      Configure the date picker object for month count, week display, or range
      restrictions as needed.
    </li>
    <li>
      Pair the picker with messages or converter settings when you need guided
      date selection.
    </li>
  </ol>
);

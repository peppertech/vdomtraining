// @ts-nocheck
import 'preact';

export const tableComputedFieldRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider using the observableArray as shown. Make sure to specify the "keyAttributes" property of the "options" parameter.</li>
      <li>Set the edit-mode attribute to 'rowEdit'.</li>
      <li>Define one or more inline cell templates and set the slot attribute to the names of your choosing.</li>
      <li>Add valueChange listener to input controls.</li>
      <li>Use the cell.mode value within your cell templates to render either your read-only or editable content based on the mode the row is in.</li>
      <li>When specifying 'navigation mode' content, references made to cell.data can be used.</li>
      <li>In beforeRowEdit listener, clone the current row data and assign it to rowData variable. When specifying 'edit mode' content, references to rowData.[propName] should be used.</li>
      <li>In beforeRowEditEnd listener, push the changes to dataprovider only if edit was not cancelled.</li>
      <li>In the columns attribute set the 'template' value to reference the slot names for the inline cell templates you defined. If you are using the same default cell template for all cells then you can specify it in the columnDefault attribute.</li>
      <li>When validating any JET input controls, applications should call 'validate()' on the input controls themselves to ensure new values are captured. Otherwise if the same gesture triggers the submit of an input control's value along with the table's row edit, that input control's value may be lost.</li>
    </ol>
  </>
);

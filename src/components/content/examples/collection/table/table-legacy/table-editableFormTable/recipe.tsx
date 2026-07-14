// @ts-nocheck
import 'preact';

export const tableEditableFormTableRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider using the observableArray as shown. Make sure to specify the "keyAttributes" property of the "options" parameter.</li>
      <li>Wrap the ArrayDataProvider with a BufferingDataProvider.</li>
      <li>Create an editable Table.</li>
      <li>
        To disable certain editable items use the:
        {" "}
        <code>row.editable</code>
        {" "}
        API and bind that to a function in your ViewModel.
      </li>
      <li>Using rowTemplate customize the row to have form-layout in edit mode.</li>
      <li>
        Add
        {" "}
        <code>oj-form-control-default</code>
        {" "}
        class to the cell containing oj-form-layout.
      </li>
      <li>Bind BufferingDataProvider to the "data" attribute of the Table.</li>
      <li>In beforeRowEditEnd listener, push the changes to observableArray only if edit was not cancelled.</li>
      <li>If asynchronous editing is desired, pass a Promise to the "accept" method of the beforeRowEdit and beforeRowEditEnd events' detail. The Table will display a loading indicator while waiting for the Promise to resolve or be rejected.</li>
      <li>When validating any JET input controls, applications should call 'validate()' on the input controls themselves to ensure new values are captured. Otherwise if the same gesture triggers the submit of an input control's value along with the table's row edit, that input control's value may be lost.</li>
    </ol>
  </>
);

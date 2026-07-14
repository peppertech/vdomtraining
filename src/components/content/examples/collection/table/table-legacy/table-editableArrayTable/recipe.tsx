// @ts-nocheck
import 'preact';

export const tableEditableArrayTableRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider using the observableArray as shown. Make sure to specify the "keyAttributes" property of the "options" parameter.</li>
      <li>Wrap the ArrayDataProvider with a BufferingDataProvider.</li>
      <li>Create a Table and add form controls to cell templates as shown in the demo.</li>
      <li>Specify appropriate aria-label values on any tabbable form controls when rendered in edit mode.</li>
      <li>Bind BufferingDataProvider to the "data" attribute of the Table.</li>
      <li>In beforeRowEditEnd listener, update the observableArray only if edit was not cancelled.</li>
      <li>If asynchronous editing is desired, pass a Promise to the "accept" method of the beforeRowEdit and beforeRowEditEnd events' detail. The Table will display a loading indicator while waiting for the Promise to resolve or be rejected.</li>
      <li>When validating any JET input controls, applications should call 'validate()' on the input controls themselves to ensure new values are captured. Otherwise if the same gesture triggers the submit of an input control's value along with the table's row edit, that input control's value may be lost.</li>
    </ol>
  </>
);

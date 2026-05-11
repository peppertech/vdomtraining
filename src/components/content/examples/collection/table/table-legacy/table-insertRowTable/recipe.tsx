// @ts-nocheck
import { h } from 'preact';

export const tableInsertRowTableRecipe = (
  <>
    <ol>
      <li>Construct a MutableArrayDataProvider using an array of data. Make sure to specify the "keyAttributes" property of the "options" parameter.</li>
      <li>Wrap the MutableArrayDataProvider with a BufferingDataProvider.</li>
      <li>Create a Table.</li>
      <li>Use addRowTemplate slot (or addRowCellTemplate slot) to customize the placeholder row.</li>
      <li>Bind BufferingDataProvider to the "data" attribute of the Table.</li>
      <li>Enable the insert row functionality by binding the Table's "insert-row-display" attribute to an observable that specifies the position and anchor row key for the insert row location.</li>
      <li>
        <b>Note</b>
        : Class
        <code>oj-bg-body</code>
        is added to set the table background color. See the
        <a href={"#"}>background demo</a>
        for more info.
      </li>
      <li>If asynchronous edit, add, or insert row functionality is desired, pass a Promise to the "accept" method of the beforeRowEdit, beforeRowEditEnd, and beforeAddRow events' detail. The Table will display a loading indicator while waiting for the Promise to resolve or be rejected.</li>
      <li>When validating any JET input controls, applications should call 'validate()' on the input controls themselves to ensure new values are captured. Otherwise if the same gesture triggers the submit of an input control's value along with the table's row edit, that input control's value may be lost.</li>
    </ol>
  </>
);

// @ts-nocheck
import { h } from 'preact';

export const tableRowTemplateRecipe = (
  <>
    <ol>
      <li>Construct an ArrayDataProvider with the array data.</li>
      <li>Use the oj-table tag to create a JET Table.</li>
      <li>Use the data attribute to bind an ArrayDataProvider you created previously as data for Table.</li>
      <li>Create a row template by using default 'rowTemplate' slot.</li>
      <li>Set the 'data-oj-as' attribute on the template element to set the alias for the row context.</li>
    </ol>
  </>
);

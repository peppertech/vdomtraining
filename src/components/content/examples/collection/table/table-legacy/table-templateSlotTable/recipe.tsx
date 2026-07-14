// @ts-nocheck
import 'preact';

export const tableTemplateSlotTableRecipe = (
  <>
    <ol>
      <li>Define one or more inline cell templates and set the slot attribute to the names of your choosing. If you are using the same default cell template for all cells, use the default 'cellTemplate' slot.</li>
      <li>In the columns attribute set the 'template' value to reference the slot names for the inline cell templates you defined. This is not required when using the default 'cellTemplate' slot.</li>
      <li>Define one or more inline header templates and set the slot attribute to the names of your choosing. If you are using the same default header template for all headers, use the default 'headerTemplate' slot.</li>
      <li>In the columns attribute set the 'headerTemplate' value to reference the slot names for the inline header templates you defined. This is not required when using the default 'headerTemplate' slot.</li>
      <li>Set the 'data-oj-as' attribute on the template element to set the alias for the cell context for individual templates.</li>
    </ol>
  </>
);

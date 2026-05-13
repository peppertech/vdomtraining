// @ts-nocheck
import { h } from 'preact';

export const selectorListviewCheckboxCardRecipe = (
  <>
    <ul>
      <li>Add a oj-list-view for a list of employees</li>
      <li>Use itemTemplate slot to define the content of the employee cards.</li>
      <li>Place the selector in the position desired in the itemTemplate.</li>
      <li>
        Match the selector 'selected-keys' property to the selected property in ListView using an
        observable.
      </li>
      <li>
        Match the selector 'key' property to the current item data key value from the itemTemplate
        context data.
      </li>
      <li>Set the selector selection mode to 'single' or 'multiple'</li>
    </ul>
  </>
);

// @ts-nocheck
import 'preact';

export const dataGridAdvancedEditableGridRecipe = (
  <>
    <ol>
      <li>
        Define an oj-data-grid element in your HTML file and assign a meaningful id, width, and height.
      </li>
      <li>Specify the appropriate attributes on the oj-data-grid elements.</li>
      <li>
        For cells
        <ul>
          <li>Set the edit-mode attribute to a valid value.</li>
          <li>
            Specify a navigation and edit template with validators used to render content in either
            mode. Use the oj.KnockoutTemplateUtils.getRenderer to convert templates to renderers.
          </li>
          <li>
            Pass in validity option to RowDataGridProvider which expects a callback function that
            supplies validity metadata for the databody cells.
          </li>
          <li>
            Specify before edit and before edit end events to use validation or make specific cells read
            only.
          </li>
          <li>
            In the before edit end event handler, store the metadata values that is required for
            template rendering and validity mapping.
          </li>
          <li>
            Note that if you pre-stamp a component such as the oj-checkboxset here and allow interaction
            without being being editable the oj-data-grid will not fire the beforeEdit and beforeEditEnd
            events.
          </li>
        </ul>
      </li>
      <li>
        For headers
        <ul>
          <li>
            Define an oj-menu element as a child of oj-data-grid and assign it with contextMenu slot
            attribute.
          </li>
          <li>
            Add menu options and in your JavaScript, define necessary functions for before and on action
          </li>
          <li>
            Define oj-dialog element as a sibling of oj-datagrid and define necessary functions for
            on-action in your JavaScript
          </li>
        </ul>
      </li>
    </ol>
  </>
);

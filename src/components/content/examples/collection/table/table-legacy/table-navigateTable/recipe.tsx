// @ts-nocheck
import { h } from 'preact';

export const tableNavigateTableRecipe = (
  <>
    <ol>
      <li>In the markup, place oj-module with its configuration bound to adapter.koObservableConfig and its animation bound to adapter.animation.</li>
      <li>
        In the viewModel:
        <br />
        <ul>
          <li>Add one router state for table and one more for content and 'table' is the default state</li>
          <li>Create the ModuleRouterAdapter instance, passing the CoreRouter instance to it.</li>
        </ul>
      </li>
      <li>
        Define the table and content module:
        <br />
        <ul>
          <li>In table module, configure oj-table element to display the department data.</li>
          <li>Use the scroll-position property to capture and restore table's scroll-position.</li>
          <li>The content module display an individual row detail using the data passed from the parent module.</li>
        </ul>
      </li>
    </ol>
  </>
);

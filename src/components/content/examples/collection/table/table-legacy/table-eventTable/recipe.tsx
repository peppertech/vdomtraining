// @ts-nocheck
import { h } from 'preact';

export const tableEventTableRecipe = (
  <>
    <ol>
      <li>
        In view, create table using
        <code>oj-table</code>
        element and add
        <code>oj-text-area</code>
        to print the details of the events.
      </li>
      <li>In view model, define event handlers for events which you are interested in.</li>
      <li>Register handlers to appropriate events using addEventListener method of table element.</li>
      <li>Event listeners can also be registered using DOM attributes like on-selected-changed, on-oj-sort etc.</li>
    </ol>
  </>
);

import 'preact';

export const listViewCardLayoutListViewRecipe = (
  <ol>
    <li>Construct an ArrayDataProvider using the data shown.</li>
    <li>Use oj-list-view with the display attribute set to card or list.</li>
    <li>Render each card item with an oj-action-card inside the itemTemplate slot.</li>
    <li>Use a buttonset to switch between card and list layouts on larger screens.</li>
  </ol>
);

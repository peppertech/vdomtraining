import 'preact';

const recipeHtmlText = String.raw`<ol>
  <li>JET Menu Buttons can have a child JET Menu specified in the items property.</li>
  <li>
    Submenus can be used to avoid cluttered top-level menu, but use them sparingly. Large, unwieldy,
    deeply nested menus can be a usability issue.
  </li>
  <li>To create submenus, add a menu item of type submenu, and specify the submenu in the items 
    property as an array.</li>
</ol>`;

export const menuButtonsMenuButtoncorepackRecipe = (
  <div dangerouslySetInnerHTML={{ __html: recipeHtmlText }} />
);

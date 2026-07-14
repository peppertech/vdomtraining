// @ts-nocheck
import 'preact';

export const menuButtonsMenuButtonRecipe = (
  <>
    <ol>
      <li>JET Menu Buttons can have a child JET Menu specified using the menu slot.</li>
      <li>
        Submenus can be used to avoid cluttered top-level menu, but use them sparingly. Large, unwieldy,
        deeply nested menus can be a usability issue.
      </li>
      <li>To create submenus, add nested oj-menu elements under the desired oj-option elements.</li>
      <li>
        A menu having submenus is always shown as a dropDown menu, not a sheet menu, regardless of the
        {" "}
        <a href={"jsdocs/oj.ojMenu.html#openOptions.display"}>openOptions.display</a>
        {" "}
        option.
      </li>
    </ol>
  </>
);

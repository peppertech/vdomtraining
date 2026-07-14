// @ts-nocheck
import 'preact';

export const drawerPopupSizingDescription = (
  <>
    <p>A Drawer Popup is a panel that slides into the viewport.</p><p>This demo shows how to set the width of a side drawer or the height of a bottom drawer.</p>
    <p>
      Side drawers always stretch to viewport's height and the bottom one to its width. The other axis
      dimension is not predefined. This dimension's size is determined by its content. If you want to
      set a custom size you can use units like px, rem, etc. However because there is no fixed-size
      parent percentages (%) won’t work, but you can use vw (viewport width) or vh (viewport height)
      units to achieve a similar effect.
    </p>
    <ul>
      <li>Note the built-in minimal and maximal width of side drawers.</li>
      <li>
        Note that DrawerPopup animates opening and closing. However, it is app developer's
        responsibility to add animations for custom runtime changes to a drawer size. See bottom
        drawer's css style for an example.
      </li>
    </ul>
  </>
);

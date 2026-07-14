import 'preact';

const descriptionHtmlText = String.raw`<p>A Drawer Layout adds expandable side contents (drawers) alongside some primary content.</p><p>This demo shows how to set the width of a side drawer or the height of a bottom drawer.</p>
<p>
  Side drawers stretch to Drawer Layout container's height and the bottom one to its width. The
  other axis dimension is not predefined. This dimension's size is determined by its content.
  If you want to set a custom size you can use units like px, rem, etc.
  However because there is no fixed-size parent percentages (%) won’t work,
  but you can use vw (viewport width) or vh (viewport height) units to achieve a similar effect.
</p>
<ul>
  <li>Note the side drawer's built-in minimal width limit in the 'Overlay' mode.</li>
  <li>
    Note that DrawerLayout animates opening and closing of its drawers. However, it is app
    developer's responsibility to add animations for custom runtime changes to a drawer size. See
    bottom drawer's css style for an example.
  </li>
</ul>`;

export const drawerLayoutSizingcorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

import 'preact';

const descriptionHtmlText = String.raw`<p>A Drawer Layout adds expandable side contents (drawers) alongside some primary content.</p><p>Drawer Layout supports three display modes.</p>
<p>
  The default display mode is 'auto'. It automatically swaps 'reflow' and 'overlay' display mode
  when crossing 1024px viewport width.
</p>`;

export const drawerLayoutDisplayModecorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

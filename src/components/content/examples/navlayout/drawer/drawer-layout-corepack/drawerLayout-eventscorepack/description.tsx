import 'preact';

const descriptionHtmlText = String.raw`<p>A Drawer Layout adds expandable side contents (drawers) alongside some primary content.</p><p>Drawer Layout supports 'openedChanged', 'ojBeforeClose' and 'ojClose' events.</p>
<p>
  This demo shows how to listen for drawer's events:
  <code class="prettyprint">startOpenedChanged</code>,
  <code class="prettyprint">endOpenedChanged</code>,
  <code class="prettyprint">ojBeforeClose</code>
  (supported only in overlay mode using 'implicit' close with the 'ESC' key),
  <code class="prettyprint">ojClose</code>.
</p>`;

export const drawerLayoutEventscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);

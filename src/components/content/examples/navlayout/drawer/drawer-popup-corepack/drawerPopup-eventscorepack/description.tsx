import { h } from "preact";

const descriptionHtmlText = String.raw`<p>A Drawer Popup is a panel that slides into the viewport.</p><p>Drawer Popup supports 'openedChanged', 'ojBeforeClose' and 'ojClose' events.</p>
<p>
  This demo shows how to listen for drawer's events:
  <code class="prettyprint">openedChanged</code>
  ,
  <code class="prettyprint">ojBeforeClose</code>
  (supported only when using 'implicit' close with the 'ESC' key or a click outside),
  <code class="prettyprint">ojClose</code>.
</p>`;

export const drawerPopupEventscorepackDescription = (
  <div dangerouslySetInnerHTML={{ __html: descriptionHtmlText }} />
);
